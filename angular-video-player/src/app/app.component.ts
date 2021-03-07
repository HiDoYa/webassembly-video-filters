import { Component, ElementRef, Injectable, ViewChild, Renderer2, RendererFactory2, Input } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { finalize } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @ViewChild('files') files: { nativeElement: { value: any; querySelector: (arg0: string) => any; }; } | undefined;
  @ViewChild('scopecanvas') scopecanvas: ElementRef | undefined;
  @ViewChild('vidcanvas') vidcanvas: ElementRef | undefined;
  @ViewChild('video') video: ElementRef | undefined;

  scopes = ["Lumascope", "RGB Parade"];
  currentScope = this.scopes[0];

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
    this.http.get(this.backendUrl + 'playFile?name=' + element.target.textContent, {responseType:'blob'}).subscribe(response => {
      let videoSrc = window.URL.createObjectURL(response);
      this.currentVidSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(videoSrc);

      this.allocateMemory();
    });
  }

  getDimensions() {
    let width = this.vidcanvas?.nativeElement.width;
    let height = this.vidcanvas?.nativeElement.height;
    let outputWidth = width;
    let outputHeight = height;
    switch(this.currentScope) {
      case "Lumascope":
        outputWidth = width;
        break;
      case "RGB Parade":
        outputWidth = width * 3;
        break;
      default:
    }

    return [width, height, outputWidth, outputHeight];
  }

  allocateMemory() {
    let dim = this.getDimensions();
    let width = dim[0];
    let height = dim[1];
    let outputWidth = dim[2];
    let outputHeight = dim[3];

    let data = Array.prototype.slice.call(this.vidcanvasCtx?.getImageData(0, 0, width, height)?.data);

    // FREE POINTERS
    if (this.inputPointer != null) {
      this.gModule.instance.exports.free(this.inputPointer);
      this.gModule.instance.exports.free(this.outputPointer);
    }

    // ALLOCATE POINTERS (based on current scope)
    this.inputPointer = this.gModule.instance.exports.malloc(data.length);
    this.inputArray = new Uint8Array(
      this.gModule.instance.exports.memory.buffer,
      this.inputPointer,
      data.length
    );
    this.outputPointer = this.gModule.instance.exports.malloc(outputWidth * 256 * 4);
    this.outputArray = new Uint8Array(
      this.gModule.instance.exports.memory.buffer,
      this.outputPointer,
      outputWidth * 256 * 4
    );
  }

  invokePlay(data: any) {
    this.data = data;
    this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.evokeVideo.bind(this));
  }

  evokeVideo() {
    this.data.play();
  }

  uploadVideos(btn: any){
    if(btn.opened){
      // console.log(btn.opened);
    }
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
      this.gModule.instance.exports.memory.grow(10);
    });
  };

  timerCallback() {
    if (this.video?.nativeElement.paused || this.video?.nativeElement.ended) {
      return;
    }

    // Process frame
    this.computeFrame();

    // Run function again immediately
    setTimeout(() => this.timerCallback(), 0);
  }

  changeScope(scope: string) {
    this.currentScope = scope;
    this.allocateMemory();

    switch(this.currentScope) {
      case "Lumascope":
        this.scopecanvasCtx!.canvas.width = 128;
        this.scopecanvasCtx!.canvas.height = 256;
        break;
      case "RGB Parade":
        this.scopecanvasCtx!.canvas.width = 128 * 3;
        this.scopecanvasCtx!.canvas.height = 256;
        break;
    }
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
    let width = dim[0];
    let height = dim[1];
    let outputWidth = dim[2];
    let outputHeight = dim[3];

		this.vidcanvasCtx?.drawImage(this.video?.nativeElement, 0, 0, width, height);

		// Modify frame
		let frame = this.vidcanvasCtx?.getImageData(0, 0, width, height);
		let data = Array.prototype.slice.call(frame?.data);
		this.inputArray.set(data);
      
    switch (this.currentScope) {
      case "Lumascope": 
        this.gModule.instance.exports.lumascope(this.inputPointer, this.outputPointer, width, height);
        break;
      case "RGB Parade": 
        this.gModule.instance.exports.rgbparade(this.inputPointer, this.outputPointer, width, height);
        break;
    }

		this.scopecanvasCtx?.putImageData(new ImageData(new Uint8ClampedArray(this.outputArray), outputWidth, outputHeight), 0, 0);
		return;
	}
}