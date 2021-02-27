import { Component, ElementRef, Injectable, ViewChild, Renderer2, RendererFactory2, Input } from '@angular/core';
import { HttpClient, HttpEventType} from '@angular/common/http';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {finalize} from 'rxjs/operators';
import { element } from 'protractor';
import { Observable, Subscription } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})




export class AppComponent {
  @ViewChild('files') files: { nativeElement: { value: any; querySelector: (arg0: string) => any; }; } | undefined;
  @ViewChild('c1') c1: { nativeElement: { value:any; getContext: (arg0: string) => CanvasRenderingContext2D | undefined; width: any; height: any; }; } | undefined
  @ViewChild('c2', {static: false}) c2: ElementRef | undefined;
  @ViewChild('video', {static: false}) video: ElementRef | undefined;
  public ctx1: CanvasRenderingContext2D | undefined;
  public ctx2: CanvasRenderingContext2D | undefined;
  //files : ElementRef | undefined;
  public url: SafeResourceUrl = 'http://localhost:4201/';
  CurrentVidSrc:  SafeResourceUrl | String = '';
  
   gModule: any;





  
  @Input()
    requiredFileType:string | undefined;

    fileName = '';
    uploadProgress:number | undefined;
    uploadSub: Subscription ;
  
    

 /* videoIPlaylist = [
    {
      name: 'Video 1',
      src: 'http://static.videogular.com/assets/videos/videogular.mp4',
      type: 'video/mp4'
    },
    {
      name: 'Video 2',
      src: 'http://static.videogular.com/assets/videos/elephants-dream.mp4',
      type: 'video/mp4'
    },
    {
      name: 'Video 3',
      src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
      type: 'video/mp4'
    },    
  ];*/

  activeIndex = 0;
  //currentVid = this.videoIPlaylist[this.activeIndex];
  data!: { getDefaultMedia: () => { (): any; new(): any; subscriptions: { (): any; new(): any; loadedMetadata: { (): any; new(): any; subscribe: { (arg0: () => void): void; 
    new(): any; }; }; 
    ended: { (): any; new(): any; 
    subscribe: { (arg0: () => void): void; 
    new(): any; }; }; }; }; 
    play: () => void;
     pause: () => void; };

  constructor(private http: HttpClient, public sanitizer: DomSanitizer, private renderer: Renderer2, ) {
    this.uploadSub = new Subscription;
      this.uploadProgress = 0;
   }

  ngOnInit(): void {
   
   }
   ngAfterViewInit(){
    //console.log(this.files?.nativeElement.value);
    this.loadWasm();
    this.doLoad();
    this.http.get('http://localhost:4201/download', {responseType:'json'}).subscribe(response => {
      //var videoSrc = window.URL.createObjectURL(response);
      

      let videos = Object.values(response);
      
      videos.forEach ((element: any) => {
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
          //this.renderer.addClass(recaptchaContainer, 'mat-button-ripple');
          this.renderer.addClass(recaptchaContainer, 'cdk-focused');
          this.renderer.addClass(recaptchaContainer, 'cdk-mouse-focused')
          this.renderer.addClass(recaptchaContainer, 'mat-button');
          this.renderer.addClass(recaptchaContainer, 'mat-button-wrapper');
          
          this.renderer.listen(recaptchaContainer, 'click', this.GetFileToPlay.bind(this) );
          //this.renderer.addClass(recaptchaContainer, 'mat-button-focus-overlay');
          this.renderer.appendChild(this.files?.nativeElement, recaptchaContainer);
          console.log(element);
        
      });
      //this.items = videos;
      //console.log(this.items);
      //console.log(videos);
     // window.open(videoSrc);

     // this.CurrentVidSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(videoSrc);
    });
   }
   GetFileToPlay (element:any) {
    //console.log(element.target.textContent);
    
    this.http.get('http://localhost:4201/playFile?name='+ element.target.textContent, {responseType:'blob'}).subscribe(response => {
      var videoSrc = window.URL.createObjectURL(response);
      this.CurrentVidSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(videoSrc);
    });
   }

  invokePlaylist(data: any) {
    this.data = data;

    this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.evokeVideo.bind(this));
    
    //this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVdo.bind(this));
  }

  nextVdo() {
    this.activeIndex++;

    //if (this.activeIndex === this.videoIPlaylist.length) {
    //  this.activeIndex = 0;
   // }

   // this.currentVid = this.videoIPlaylist[this.activeIndex];
  }

  evokeVideo() {
    this.data.play();
    //console.log("timer callc=back");
  //  this.timerCallback()
    
  }
  
  

  startPlayer(item: { name: string; src: string; type: string; }, index: number) {
    this.activeIndex = index;
    //this.currentVid = item;
  }

  uploadVideos(btn : any){
        if(btn.opened){
          console.log(btn.opened);
        }
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadSub = new Subscription;
  }

  addItem( element: any){
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
          //this.renderer.addClass(recaptchaContainer, 'mat-button-ripple');
          this.renderer.addClass(recaptchaContainer, 'cdk-focused');
          this.renderer.addClass(recaptchaContainer, 'cdk-mouse-focused')
          this.renderer.addClass(recaptchaContainer, 'mat-button');
          this.renderer.addClass(recaptchaContainer, 'mat-button-wrapper');
          
          this.renderer.listen(recaptchaContainer, 'click', this.GetFileToPlay.bind(this) );
          //this.renderer.addClass(recaptchaContainer, 'mat-button-focus-overlay');
          this.renderer.appendChild(this.files?.nativeElement, recaptchaContainer);
          console.log(element);
  }
  onFileSelected(event: any) {
    const file:File = event.target.files[0];
  
    if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);

        const upload$ = this.http.post("http://localhost:4201/upload", formData, {
            reportProgress: true,
            observe: 'events'
        })
        .pipe(
            finalize(() => this.reset())
        );
      
        this.uploadSub = upload$.subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
            const total: number = (event.total == undefined) ? 0 : event.total;
            this.uploadProgress = Math.round(100 * (event.loaded / total));
            if(this.uploadProgress == 100){
              this.addItem(this.fileName);
            }
            
            
          }
        })
    }
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

  await WebAssembly.instantiateStreaming(fetch('http://localhost:4201/zmo.wasm'), imports).then((obj: any) => {
    this.gModule = obj;
    this.gModule.instance.exports.memory.grow(10);
   // console.log(this.gModule.instance);
  });
  //this.gModule.instance.exports.memory.grow(10);
  
};


timerCallback() {
 
  if (this.video?.nativeElement.paused || this.video?.nativeElement.ended) {
    return;
  }
 // console.log("in timer callback");
  // Process frame
  this.computeFrame();

  // Run function again immediately
  let self = this;
  setTimeout(function () {self.timerCallback();}, 0);
}

doLoad() {
  // Get html elements
 // this.video = document.getElementById("video");
  //this.c1 = document.getElementById("c1");
 // let canvas1 = document.getElementById("c1");
  this.ctx1 = this.c1?.nativeElement.getContext("2d");
  this.ctx2 = this.c2?.nativeElement.getContext("2d");
  let self = this;
  //console.log(canvas1);
 // console.log(this.c1);
  //console.log(this.ctx1);
  
  // Start callback to process frame
  this.video?.nativeElement.addEventListener("play", function() {
     // self.width = self.video?.nativeElement.width / 2;
      //self.height = self.video?.nativeElement.videoHeight / 2;
      console.log("in video");
      self.timerCallback();
    }, false);
  }
  computeFrame() {
		// Draw original frame in context 1
		this.ctx2?.drawImage(this.video?.nativeElement, 0, 0, this.c1?.nativeElement.width, this.c1?.nativeElement.height);

		// Modify frame
		let frame = this.ctx2?.getImageData(0, 0, this.c1?.nativeElement.width, this.c1?.nativeElement.height);
   // console.log("this frame",frame);
		let data = Array.prototype.slice.call(frame?.data);

		const cArrayPointer = this.gModule.instance.exports.custom_malloc(data.length);
	
		const cArray = new Uint8Array(
			this.gModule.instance.exports.memory.buffer,
			cArrayPointer,
			data.length
		    );
		cArray.set(data);

		const cArrayPointer2 = this.gModule.instance.exports.custom_malloc(this.c1?.nativeElement.width * 256 * 4);
		const cArray2 = new Uint8Array(
			this.gModule.instance.exports.memory.buffer,
			cArrayPointer2,
			this.c1?.nativeElement.width * 256 * 4
			);
			
		this.gModule.instance.exports.get_luminance(cArrayPointer, cArrayPointer2, this.c1?.nativeElement.width, this.c1?.nativeElement.height);

		
		//var newFrame = this.ctx2.createImageData(this.width, this.height);

		//newFrame.data = Object.assign(newFrame.data, new Uint8ClampedArray(cArray2));

		this.ctx1?.putImageData(new ImageData(new Uint8ClampedArray(cArray2), this.c1?.nativeElement.width, 256), 0, 0);

		this.gModule.instance.exports.custom_free(cArrayPointer, data.length);

		this.gModule.instance.exports.custom_free(cArrayPointer2, this.c1?.nativeElement.width * 256 * 4);

		return;
	}

}