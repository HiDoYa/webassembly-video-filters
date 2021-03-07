import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';


import { AppComponent } from './app.component';

import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';

import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatIconModule, 
    MatButtonModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonToggleModule,
    HttpClientModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
