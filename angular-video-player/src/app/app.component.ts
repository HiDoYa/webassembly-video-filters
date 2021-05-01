import { Component, ElementRef, Injectable, ViewChild, Renderer2, RendererFactory2, Input } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { finalize } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

class ScopeDescriptor {
  name: string = '';
  func: any;

  constructor(name: string, func: any) {
    this.name = name;
    this.func= func;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @ViewChild('files') files: any | undefined;
  @ViewChild('scopecanvas') scopecanvas: ElementRef | undefined;
  @ViewChild('vidcanvas') vidcanvas: ElementRef | undefined;
  @ViewChild('video') video: ElementRef | undefined;

  scopes: any = null;
  currentScope: ScopeDescriptor = new ScopeDescriptor('', null);

  scopecanvasCtx: CanvasRenderingContext2D | undefined;
  vidcanvasCtx: CanvasRenderingContext2D | undefined;
  backendUrl: SafeResourceUrl = 'http://localhost:4201/';
  currentVidSrc:  SafeResourceUrl | String = '';
  gModule: any;

  requiredFileType: string | undefined;
  fileName = '';
  uploadProgress: number | undefined;
  uploadSub: Subscription ;

  data: any;
  inputArray: any;
  inputPointer: any;
  outputArray: any;
  outputPointer: any;

  // Time for each computeFrame in ms
  computeTimes: Array<number> = [];

  constructor(private http: HttpClient, public sanitizer: DomSanitizer, private renderer: Renderer2) {
    this.uploadSub = new Subscription;
    this.uploadProgress = 0;
  }

  ngAfterViewInit() {
    this.loadWasm();
    this.doLoad();
    this.http.get(this.backendUrl + 'download', {responseType:'json'}).subscribe(response => {
      let videos = Object.values(response);
      videos.forEach ((element: any) => {
        this.addItem(element);
      });
    });
  }

  getFileToPlay(element: any) {
    this.computeTimes = [];
    this.http.get(this.backendUrl + 'playFile?name=' + element.target.textContent, {responseType:'blob'}).subscribe(response => {
      this.fileName = element.target.textContent;
      let videoSrc = window.URL.createObjectURL(response);
      this.currentVidSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(videoSrc);

      this.allocateMemory();
    });
  }

  invokePlay(data: any) {
    this.data = data;
    this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.evokeVideo.bind(this));
  }

  evokeVideo() {
    this.data.play();
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadSub = new Subscription;
  }

  addItem(element: any){
    const container = this.renderer.createElement('span');
    this.renderer.addClass(container, 'mat-button-focus-overlay');
    this.renderer.addClass(container, 'mat-ripple')
    this.renderer.addClass(container, 'mat-button-ripple');
    
    const recaptchaContainer = this.renderer.createElement('a');
    recaptchaContainer.textContent = element;
    this.renderer.appendChild(recaptchaContainer, container);
    this.renderer.addClass(recaptchaContainer, 'mat-button');
    this.renderer.addClass(recaptchaContainer, 'mat-focus-indicator');
    this.renderer.addClass(recaptchaContainer, 'mat-button-base');
    this.renderer.addClass(recaptchaContainer, 'cdk-focused');
    this.renderer.addClass(recaptchaContainer, 'cdk-mouse-focused')
    this.renderer.addClass(recaptchaContainer, 'mat-button');
    this.renderer.addClass(recaptchaContainer, 'mat-button-wrapper');
    
    this.renderer.listen(recaptchaContainer, 'click', this.getFileToPlay.bind(this) );
    this.renderer.appendChild(this.files?.nativeElement, recaptchaContainer);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (!file) {
      return;
    }

    this.fileName = file.name;
    const formData = new FormData();
    formData.append("thumbnail", file);

    const upload = this.http.post(this.backendUrl + "upload", formData, {
        reportProgress: true,
        observe: 'events'
    }).pipe(finalize(() => this.reset()));
  
    this.uploadSub = upload.subscribe(event => {
      if (event.type == HttpEventType.UploadProgress) {
        const total: number = (event.total == undefined) ? 0 : event.total;
        this.uploadProgress = Math.round(100 * (event.loaded / total));

        if(this.uploadProgress == 100){
          this.addItem(this.fileName);
        }
      }
    })
  }

  async loadWasm() {
    const imports = {
      wasi_snapshot_preview1: { 
        proc_exit: () => { },
        fd_write: () => { }, 
        fd_prestat_get: () => { },
        fd_prestat_dir_name: () => { },
        clock_time_get: () => { },
        poll_oneoff: () => { },
        sched_yield: () => { },
        environ_sizes_get: () => { },
        environ_get: () => { },
        path_filestat_get: () => { },
        fd_fdstat_get: () => { },
        path_open: () => { },
        path_readlink: () => { },
        path_filestat_set_times: () => { },
        path_unlink_file: () => { },
        path_remove_directory: () => { },
        path_create_directory: () => { },
        fd_readdir: () => { },
        fd_close: () => { },
        path_symlink: () => { },
        path_link: () => { },
        path_rename: () => { },
        fd_fdstat_set_flags: () => { },
        fd_seek: () => { },	
        fd_read: () => { }
      },
      env: {
        __memory_base: 0,
        __table_base: 0,
        __indirect_function_table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
        __stack_pointer: new WebAssembly.Global({value:'i32', mutable:true}, 0),
        memory: new WebAssembly.Memory({initial: 65536}),
        STACKTOP: 0
      }
    };

    await WebAssembly.instantiateStreaming(fetch('assets/zmo.wasm'), imports).then((obj: any) => {
      this.gModule = obj;
      this.gModule.instance.exports.memory.grow(15);

      // Get scopes
      this.scopes = {
        LUMASCOPE: new ScopeDescriptor("Lumascope", this.gModule.instance.exports.lumascope),
        RGB_PARADE: new ScopeDescriptor("RGB Parade", this.gModule.instance.exports.rgbparade),
        VECTORSCOPE: new ScopeDescriptor("Vector Scope", this.gModule.instance.exports.vectorscope),
        // TODO: Causes mem access err
        CPP_LUMASCOPE: new ScopeDescriptor("C++ Lumascope", this.gModule.instance.exports.cpp_lumascope),
        CPP_COLOR_LUMASCOPE: new ScopeDescriptor("C++ Lumascope (Color)", this.gModule.instance.exports.cpp_color_lumascope),
        CPP_RGB_PARADE: new ScopeDescriptor("C++ RGB Parade", this.gModule.instance.exports.cpp_rgb_parade),
        CPP_VECTORSCOPE: new ScopeDescriptor("C++ Vector Scope", this.gModule.instance.exports.cpp_vectorscope),
        CPP_COLOR_VECTORSCOPE: new ScopeDescriptor("C++ Vector Scope (Color)", this.gModule.instance.exports.cpp_color_vectorscope),
      };
      this.currentScope = this.scopes.LUMASCOPE!;
    });
  };

  timerCallback() {
    if (this.video?.nativeElement.paused || this.video?.nativeElement.ended) {
      return;
    }

    // Process frame
    let t0 = performance.now()
    this.computeFrame();
    let t1 = performance.now()
    this.computeTimes.push(t1 - t0);

    // Run function again immediately
    setTimeout(() => this.timerCallback(), 0);
  }

  allocateMemory() {
    let dim = this.getDimensions();
    let width = dim[0], height = dim[1], outputWidth = dim[2], outputHeight = dim[3];

    // FREE POINTERS
    if (this.inputPointer != null) {
      this.gModule.instance.exports.free(this.inputPointer);
    }
    if (this.outputPointer != null) {
      this.gModule.instance.exports.free(this.outputPointer);
    }

    // ALLOCATE POINTERS (based on current scope)
    this.inputPointer = this.gModule.instance.exports.malloc(width * height * 4);
    this.inputArray = new Uint8Array(
      this.gModule.instance.exports.memory.buffer,
      this.inputPointer,
      width * height * 4
    );

    this.outputPointer = this.gModule.instance.exports.malloc(outputWidth * outputHeight * 4);
    this.outputArray = new Uint8Array(
      this.gModule.instance.exports.memory.buffer,
      this.outputPointer,
      outputWidth * outputHeight * 4
    );
  }

  getDimensions() {
    let width = this.vidcanvas?.nativeElement.width;
    let height = this.vidcanvas?.nativeElement.height;
    let outputWidth = this.scopecanvas?.nativeElement.width;
    let outputHeight = this.scopecanvas?.nativeElement.height;
    return [width, height, outputWidth, outputHeight];
  }

  changeScope(scope: any) {
    this.computeTimes = [];
    this.currentScope = scope;
    switch(this.currentScope) {
      case this.scopes.CPP_LUMASCOPE: 
      case this.scopes.CPP_COLOR_LUMASCOPE: 
      // case this.scopes.LUMASCOPE: 
        this.vidcanvasCtx!.canvas.width = 128;
        this.vidcanvasCtx!.canvas.height = 256;
        this.scopecanvasCtx!.canvas.width = 128;
        this.scopecanvasCtx!.canvas.height = 256;
        break;
      case this.scopes.VECTORSCOPE:
      case this.scopes.CPP_COLOR_VECTORSCOPE: 
      case this.scopes.CPP_VECTORSCOPE: 
        this.vidcanvasCtx!.canvas.width = 128;
        this.vidcanvasCtx!.canvas.height = 256;
        this.scopecanvasCtx!.canvas.width = 256;
        this.scopecanvasCtx!.canvas.height = 256;
        break;
      case this.scopes.RGB_PARADE: 
      case this.scopes.LUMASCOPE: 
      case this.scopes.CPP_RGB_PARADE:
        console.log("rgb parade selected");
        this.vidcanvasCtx!.canvas.width = 128;
        this.vidcanvasCtx!.canvas.height = 256;
        this.scopecanvasCtx!.canvas.width = 128 * 3;
        this.scopecanvasCtx!.canvas.height = 256;
        break;
    }

    this.allocateMemory();
  }

  doLoad() {
    // Get html elements
    this.scopecanvasCtx = this.scopecanvas?.nativeElement.getContext("2d");
    this.vidcanvasCtx = this.vidcanvas?.nativeElement.getContext("2d");

    // Start callback to process frame
    this.video?.nativeElement.addEventListener("play", () => {
      this.timerCallback();
    });
  }

  computeFrame() {
		// Draw original frame
    let dim = this.getDimensions();
    let width = dim[0], height = dim[1], outputWidth = dim[2], outputHeight = dim[3];

		this.vidcanvasCtx?.drawImage(this.video?.nativeElement, 0, 0, width, height);

		let frame = this.vidcanvasCtx?.getImageData(0, 0, width, height);
		let data = Array.prototype.slice.call(frame?.data);
		this.inputArray.set(data);
    
    // if (this.currentScope.name == "C++ Vector Scope" || this.currentScope.name == "C++ Vector Scope (Color)") {
    //   this.currentScope.func(this.inputPointer, this.outputPointer, width, height, height);
    // } else {
      this.currentScope.func(this.inputPointer, this.outputPointer, width, height);
    // }

    this.scopecanvasCtx?.putImageData(new ImageData(new Uint8ClampedArray(this.outputArray), outputWidth, outputHeight), 0, 0);
		return;
	}
}
