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
  //files : ElementRef | undefined;
  public url: SafeResourceUrl = 'http://localhost:4201/';
  CurrentVidSrc:  SafeResourceUrl | String = '';
  
  
  @Input()
    requiredFileType:string | undefined;

    fileName = '';
    uploadProgress:number | undefined;
    uploadSub: Subscription ;
  

  videoIPlaylist = [
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
  ];

  activeIndex = 0;
  currentVid = this.videoIPlaylist[this.activeIndex];
  data!: { getDefaultMedia: () => { (): any; new(): any; subscriptions: { (): any; new(): any; loadedMetadata: { (): any; new(): any; subscribe: { (arg0: () => void): void; new(): any; }; }; ended: { (): any; new(): any; subscribe: { (arg0: () => void): void; new(): any; }; }; }; }; play: () => void; pause: () => void; };

  constructor(private http: HttpClient, public sanitizer: DomSanitizer, private renderer: Renderer2, ) {
    this.uploadSub = new Subscription;
      this.uploadProgress = 0;
   }

  ngOnInit(): void {
     
   }
   ngAfterViewInit(){
    //console.log(this.files?.nativeElement.value);
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

    if (this.activeIndex === this.videoIPlaylist.length) {
      this.activeIndex = 0;
    }

    this.currentVid = this.videoIPlaylist[this.activeIndex];
  }

  evokeVideo() {
    this.data.play();
  }
  
  

  startPlayer(item: { name: string; src: string; type: string; }, index: number) {
    this.activeIndex = index;
    this.currentVid = item;
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

}