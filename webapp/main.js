(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/hiroyagojo/Code/webassembly-video-filters/angular-video-player/src/main.ts */"zUnb");


/***/ }),

/***/ "7zmE":
/*!**************************!*\
  !*** ./src/app/pipes.ts ***!
  \**************************/
/*! exports provided: MsToFps, GetAvg, GetName, LastElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MsToFps", function() { return MsToFps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetAvg", function() { return GetAvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetName", function() { return GetName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LastElement", function() { return LastElement; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class MsToFps {
    transform(value) {
        return (1 / (value / 1000)).toPrecision(5);
    }
}
MsToFps.ɵfac = function MsToFps_Factory(t) { return new (t || MsToFps)(); };
MsToFps.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "msToFps", type: MsToFps, pure: false });
class GetAvg {
    transform(array) {
        return array.reduce((a, b) => a + b) / array.length;
    }
}
GetAvg.ɵfac = function GetAvg_Factory(t) { return new (t || GetAvg)(); };
GetAvg.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "getAvg", type: GetAvg, pure: false });
class GetName {
    transform(obj) {
        return obj.name;
    }
}
GetName.ɵfac = function GetName_Factory(t) { return new (t || GetName)(); };
GetName.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "getName", type: GetName, pure: true });
class LastElement {
    transform(array) {
        return array[array.length - 1];
    }
}
LastElement.ɵfac = function LastElement_Factory(t) { return new (t || LastElement)(); };
LastElement.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "last", type: LastElement, pure: false });


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _algorithms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./algorithms */ "iumO");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/flex-layout/extended */ "znSr");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/flex-layout/flex */ "XiUz");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _videogular_ngx_videogular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @videogular/ngx-videogular/core */ "4w57");
/* harmony import */ var _videogular_ngx_videogular_overlay_play__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @videogular/ngx-videogular/overlay-play */ "cqME");
/* harmony import */ var _videogular_ngx_videogular_buffering__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @videogular/ngx-videogular/buffering */ "VKRg");
/* harmony import */ var _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @videogular/ngx-videogular/controls */ "v2j/");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _pipes__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./pipes */ "7zmE");
























const _c0 = ["files"];
const _c1 = ["scopecanvas"];
const _c2 = ["vidcanvas"];
const _c3 = ["video"];
function AppComponent_mat_progress_bar_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "mat-progress-bar", 42);
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx_r2.uploadProgress);
} }
function AppComponent_div_57_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r8.fileName);
} }
function AppComponent_div_58_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "msToFps");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "last");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("Instant: ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 3, ctx_r9.computeTimes)), " fps");
} }
function AppComponent_div_59_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "msToFps");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "getAvg");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("Average: ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 3, ctx_r10.computeTimes)), " fps");
} }
function AppComponent_div_66_mat_option_1_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-option", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_div_66_mat_option_1_Template_mat_option_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r15); const scope_r13 = ctx.$implicit; const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r14.changeScope(scope_r13.value); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "getName");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const scope_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, scope_r13.value), " ");
} }
function AppComponent_div_66_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, AppComponent_div_66_mat_option_1_Template, 3, 3, "mat-option", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "keyvalue");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, ctx_r11.scopes));
} }
class ScopeDescriptor {
    constructor(name, func) {
        this.name = '';
        this.name = name;
        this.func = func;
    }
}
class AppComponent {
    constructor(http, sanitizer, renderer) {
        this.http = http;
        this.sanitizer = sanitizer;
        this.renderer = renderer;
        this.scopes = null;
        this.currentScope = new ScopeDescriptor('', null);
        this.backendUrl = 'http://localhost:4201/';
        this.currentVidSrc = '';
        this.fileName = '';
        // Time for each computeFrame in ms
        this.computeTimes = [];
        this.uploadSub = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subscription"];
        this.uploadProgress = 0;
    }
    ngAfterViewInit() {
        this.loadWasm();
        this.doLoad();
        this.http.get(this.backendUrl + 'download', { responseType: 'json' }).subscribe(response => {
            let videos = Object.values(response);
            videos.forEach((element) => {
                this.addItem(element);
            });
        });
    }
    getFileToPlay(element) {
        this.computeTimes = [];
        this.http.get(this.backendUrl + 'playFile?name=' + element.target.textContent, { responseType: 'blob' }).subscribe(response => {
            this.fileName = element.target.textContent;
            let videoSrc = window.URL.createObjectURL(response);
            this.currentVidSrc = this.sanitizer.bypassSecurityTrustResourceUrl(videoSrc);
            this.allocateMemory();
        });
    }
    invokePlay(data) {
        this.data = data;
        this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.evokeVideo.bind(this));
    }
    evokeVideo() {
        this.data.play();
    }
    reset() {
        this.uploadProgress = 0;
        this.uploadSub = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subscription"];
    }
    addItem(element) {
        var _a;
        const container = this.renderer.createElement('span');
        this.renderer.addClass(container, 'mat-button-focus-overlay');
        this.renderer.addClass(container, 'mat-ripple');
        this.renderer.addClass(container, 'mat-button-ripple');
        const recaptchaContainer = this.renderer.createElement('a');
        recaptchaContainer.textContent = element;
        this.renderer.appendChild(recaptchaContainer, container);
        this.renderer.addClass(recaptchaContainer, 'mat-button');
        this.renderer.addClass(recaptchaContainer, 'mat-focus-indicator');
        this.renderer.addClass(recaptchaContainer, 'mat-button-base');
        this.renderer.addClass(recaptchaContainer, 'cdk-focused');
        this.renderer.addClass(recaptchaContainer, 'cdk-mouse-focused');
        this.renderer.addClass(recaptchaContainer, 'mat-button');
        this.renderer.addClass(recaptchaContainer, 'mat-button-wrapper');
        this.renderer.listen(recaptchaContainer, 'click', this.getFileToPlay.bind(this));
        this.renderer.appendChild((_a = this.files) === null || _a === void 0 ? void 0 : _a.nativeElement, recaptchaContainer);
    }
    onFileSelected(event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);
        const upload = this.http.post(this.backendUrl + "upload", formData, {
            reportProgress: true,
            observe: 'events'
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["finalize"])(() => this.reset()));
        this.uploadSub = upload.subscribe(event => {
            if (event.type == _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpEventType"].UploadProgress) {
                const total = (event.total == undefined) ? 0 : event.total;
                this.uploadProgress = Math.round(100 * (event.loaded / total));
                if (this.uploadProgress == 100) {
                    this.addItem(this.fileName);
                }
            }
        });
    }
    loadWasm() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
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
                    __stack_pointer: new WebAssembly.Global({ value: 'i32', mutable: true }, 0),
                    memory: new WebAssembly.Memory({ initial: 65536 }),
                    STACKTOP: 0
                }
            };
            yield WebAssembly.instantiateStreaming(fetch('assets/zmo.wasm'), imports).then((obj) => {
                this.gModule = obj;
                this.gModule.instance.exports.memory.grow(15);
                // Get scopes
                this.scopes = {
                    LUMASCOPE: new ScopeDescriptor("Lumascope", this.gModule.instance.exports.lumascope),
                    RGB_PARADE: new ScopeDescriptor("RGB Parade", this.gModule.instance.exports.rgbparade),
                    VECTORSCOPE: new ScopeDescriptor("Vector Scope", this.gModule.instance.exports.vectorscope),
                    CPP_LUMASCOPE: new ScopeDescriptor("C++ Lumascope", this.gModule.instance.exports.cpp_lumascope),
                    CPP_COLOR_LUMASCOPE: new ScopeDescriptor("C++ Color Lumascope", this.gModule.instance.exports.cpp_color_lumascope),
                    CPP_RGB_PARADE: new ScopeDescriptor("C++ RGB Parade", this.gModule.instance.exports.cpp_rgb_parade),
                    CPP_VECTORSCOPE: new ScopeDescriptor("C++ Vector Scope", this.gModule.instance.exports.cpp_vectorscope),
                    JS_LUMASCOPE: new ScopeDescriptor("JS Lumascope", _algorithms__WEBPACK_IMPORTED_MODULE_4__["js_lumascope"]),
                    JS_COLOR_LUMASCOPE: new ScopeDescriptor("JS Color Lumascope", _algorithms__WEBPACK_IMPORTED_MODULE_4__["js_color_lumascope"]),
                    JS_RGB_PARADE: new ScopeDescriptor("JS RGB Parade", _algorithms__WEBPACK_IMPORTED_MODULE_4__["js_rgb_parade"]),
                    JS_VECTORSCOPE: new ScopeDescriptor("JS Vector Scope", _algorithms__WEBPACK_IMPORTED_MODULE_4__["js_vectorscope"]),
                };
                this.currentScope = this.scopes.LUMASCOPE;
                this.changeScope(this.currentScope);
            });
        });
    }
    ;
    timerCallback() {
        var _a, _b;
        if (((_a = this.video) === null || _a === void 0 ? void 0 : _a.nativeElement.paused) || ((_b = this.video) === null || _b === void 0 ? void 0 : _b.nativeElement.ended)) {
            return;
        }
        // Process frame
        let t0 = performance.now();
        this.computeFrame();
        let t1 = performance.now();
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
        this.inputArray = new Uint8Array(this.gModule.instance.exports.memory.buffer, this.inputPointer, width * height * 4);
        this.outputPointer = this.gModule.instance.exports.malloc(outputWidth * outputHeight * 4);
        this.outputArray = new Uint8Array(this.gModule.instance.exports.memory.buffer, this.outputPointer, outputWidth * outputHeight * 4);
    }
    getDimensions() {
        var _a, _b, _c, _d;
        let width = (_a = this.vidcanvas) === null || _a === void 0 ? void 0 : _a.nativeElement.width;
        let height = (_b = this.vidcanvas) === null || _b === void 0 ? void 0 : _b.nativeElement.height;
        let outputWidth = (_c = this.scopecanvas) === null || _c === void 0 ? void 0 : _c.nativeElement.width;
        let outputHeight = (_d = this.scopecanvas) === null || _d === void 0 ? void 0 : _d.nativeElement.height;
        return [width, height, outputWidth, outputHeight];
    }
    changeScope(scope) {
        this.computeTimes = [];
        this.currentScope = scope;
        switch (this.currentScope) {
            case this.scopes.CPP_LUMASCOPE:
            case this.scopes.CPP_COLOR_LUMASCOPE:
            case this.scopes.CPP_RGB_PARADE:
            case this.scopes.VECTORSCOPE:
            case this.scopes.LUMASCOPE:
                this.vidcanvasCtx.canvas.width = 256;
                this.vidcanvasCtx.canvas.height = 256;
                this.scopecanvasCtx.canvas.width = 256;
                this.scopecanvasCtx.canvas.height = 256;
                break;
            case this.scopes.VECTORSCOPE:
            case this.scopes.CPP_VECTORSCOPE:
                this.vidcanvasCtx.canvas.width = 256;
                this.vidcanvasCtx.canvas.height = 256;
                this.scopecanvasCtx.canvas.width = 256;
                this.scopecanvasCtx.canvas.height = 256;
                break;
            case this.scopes.RGB_PARADE:
                this.vidcanvasCtx.canvas.width = 128;
                this.vidcanvasCtx.canvas.height = 256;
                this.scopecanvasCtx.canvas.width = 128 * 3;
                this.scopecanvasCtx.canvas.height = 256;
                break;
        }
        this.allocateMemory();
    }
    doLoad() {
        var _a, _b, _c;
        // Get html elements
        this.scopecanvasCtx = (_a = this.scopecanvas) === null || _a === void 0 ? void 0 : _a.nativeElement.getContext("2d");
        this.vidcanvasCtx = (_b = this.vidcanvas) === null || _b === void 0 ? void 0 : _b.nativeElement.getContext("2d");
        // Start callback to process frame
        (_c = this.video) === null || _c === void 0 ? void 0 : _c.nativeElement.addEventListener("play", () => {
            this.timerCallback();
        });
    }
    computeFrame() {
        var _a, _b, _c, _d, _e;
        // Draw original frame
        let dim = this.getDimensions();
        let width = dim[0], height = dim[1], outputWidth = dim[2], outputHeight = dim[3];
        (_a = this.vidcanvasCtx) === null || _a === void 0 ? void 0 : _a.drawImage((_b = this.video) === null || _b === void 0 ? void 0 : _b.nativeElement, 0, 0, width, height);
        let frame = (_c = this.vidcanvasCtx) === null || _c === void 0 ? void 0 : _c.getImageData(0, 0, width, height);
        let data = Array.prototype.slice.call(frame === null || frame === void 0 ? void 0 : frame.data);
        this.inputArray.set(data);
        if (this.currentScope.name.includes("JS")) {
            let data_out = data;
            this.currentScope.func(data, data_out, width, height, height);
            (_d = this.scopecanvasCtx) === null || _d === void 0 ? void 0 : _d.putImageData(new ImageData(new Uint8ClampedArray(data_out), outputWidth, outputHeight), 0, 0);
        }
        else {
            if (this.currentScope.name == "C++ Vector Scope") {
                this.currentScope.func(this.inputPointer, this.outputPointer, width, height, height);
            }
            else {
                this.currentScope.func(this.inputPointer, this.outputPointer, width, height);
            }
            (_e = this.scopecanvasCtx) === null || _e === void 0 ? void 0 : _e.putImageData(new ImageData(new Uint8ClampedArray(this.outputArray), outputWidth, outputHeight), 0, 0);
        }
        return;
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["DomSanitizer"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["Renderer2"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], viewQuery: function AppComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c3, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.files = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.scopecanvas = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.vidcanvas = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.video = _t.first);
    } }, decls: 67, vars: 10, consts: [[1, "main"], ["color", "primary"], ["fxShow", "true"], ["mat-icon-button", "", 3, "click"], ["mat-button", "", "routerLink", "/", 1, "navbarTitle"], [1, "spacer"], ["fxFlexFill", ""], ["color", "primary", "fxLayout", "column", "mode", "over", "opened", "false"], ["sidenav", ""], ["fxLayoutAlign", "end start", 1, "tp-section"], ["type", "file", 1, "file-input", 3, "change"], ["fileUpload", ""], ["mat-icon-button", ""], [1, "progress"], ["class", "progress-bar", "mode", "determinate", 3, "value", 4, "ngIf"], ["fxLayout", "column"], ["files", ""], [1, "title"], [1, "row-container"], [1, "videogular-container"], [3, "onPlayerReady", "change"], ["vgProperty", "current", "vgFormat", "mm:ss"], [2, "pointer-events", "none"], ["vgProperty", "total", "vgFormat", "mm:ss"], ["vgProperty", "right"], ["preload", "auto", "crossorigin", "", 3, "vgMedia", "src"], ["video", "", "media", ""], [1, "scope-container"], ["id", "overlay"], ["id", "scopecanvas", "width", "128", "height", "256"], ["scopecanvas", ""], ["id", "vidcanvas", "width", "128", "height", "256"], ["vidcanvas", ""], [1, "footer-container"], [1, "metadata-container"], ["class", "metadata-title", 4, "ngIf"], ["class", "metadata-text", 4, "ngIf"], [1, "scope-selector-row"], ["appearance", "fill"], [1, "scopeSelector"], ["panelClass", "scopePanels"], [4, "ngIf"], ["mode", "determinate", 1, "progress-bar", 3, "value"], [1, "metadata-title"], [1, "metadata-text"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "mat-toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r16); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](12); return _r0.toggle(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, "menu");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, "Videos");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "mat-sidenav-container", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "mat-sidenav", 7, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "section", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "input", 10, 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function AppComponent_Template_input_change_14_listener($event) { return ctx.onFileSelected($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_Template_button_click_16_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r16); const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](15); return _r1.click(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](18, "upload_file");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21, "drive_folder_upload");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](23, AppComponent_mat_progress_bar_23_Template, 1, 1, "mat-progress-bar", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](24, "div", 15, 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](26, "mat-sidenav-content", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](27, "h1", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](28, "Webassembly Video Scope");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](29, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](30, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](31, "vg-player", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("onPlayerReady", function AppComponent_Template_vg_player_onPlayerReady_31_listener($event) { return ctx.invokePlay($event); })("change", function AppComponent_Template_vg_player_change_31_listener($event) { return ctx.invokePlay($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](32, "vg-overlay-play");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](33, "vg-buffering");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](34, "vg-scrub-bar");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](35, "vg-scrub-bar-current-time");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](36, "vg-scrub-bar-buffering-time");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](37, "vg-controls");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](38, "vg-play-pause");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](39, "vg-playback-button");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](40, "vg-time-display", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](41, "vg-scrub-bar", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](42, "vg-time-display", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](43, "vg-mute", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](44, "vg-volume", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](45, "vg-fullscreen", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](46, "video", 25, 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](49, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](50, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](51, "canvas", 29, 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](53, "canvas", 31, 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](55, "div", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](56, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](57, AppComponent_div_57_Template, 2, 1, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](58, AppComponent_div_58_Template, 4, 5, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](59, AppComponent_div_59_Template, 4, 5, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](60, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](61, "mat-form-field", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](62, "mat-label", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](63);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](64, "getName");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](65, "mat-select", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](66, AppComponent_div_66_Template, 3, 3, "div", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](48);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.uploadProgress);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("vgMedia", _r5)("src", ctx.currentVidSrc, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.fileName.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.computeTimes.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.computeTimes.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](64, 8, ctx.currentScope));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.scopes);
    } }, directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_7__["MatToolbar"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_8__["DefaultShowHideDirective"], _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButton"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIcon"], _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatAnchor"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__["MatSidenavContainer"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_12__["FlexFillDirective"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__["MatSidenav"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_12__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_12__["DefaultLayoutAlignDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgIf"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__["MatSidenavContent"], _videogular_ngx_videogular_core__WEBPACK_IMPORTED_MODULE_14__["VgPlayerComponent"], _videogular_ngx_videogular_overlay_play__WEBPACK_IMPORTED_MODULE_15__["VgOverlayPlayComponent"], _videogular_ngx_videogular_buffering__WEBPACK_IMPORTED_MODULE_16__["VgBufferingComponent"], _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_17__["VgScrubBarComponent"], _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_17__["VgScrubBarCurrentTimeComponent"], _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_17__["VgScrubBarBufferingTimeComponent"], _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_17__["VgControlsComponent"], _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_17__["VgPlayPauseComponent"], _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_17__["VgPlaybackButtonComponent"], _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_17__["VgTimeDisplayComponent"], _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_17__["VgMuteComponent"], _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_17__["VgVolumeComponent"], _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_17__["VgFullscreenComponent"], _videogular_ngx_videogular_core__WEBPACK_IMPORTED_MODULE_14__["VgMediaDirective"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__["MatLabel"], _angular_material_select__WEBPACK_IMPORTED_MODULE_19__["MatSelect"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_20__["MatProgressBar"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgForOf"], _angular_material_core__WEBPACK_IMPORTED_MODULE_21__["MatOption"]], pipes: [_pipes__WEBPACK_IMPORTED_MODULE_22__["GetName"], _pipes__WEBPACK_IMPORTED_MODULE_22__["MsToFps"], _pipes__WEBPACK_IMPORTED_MODULE_22__["LastElement"], _pipes__WEBPACK_IMPORTED_MODULE_22__["GetAvg"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["KeyValuePipe"]], styles: [".navbarName[_ngcontent-%COMP%] {\n  font-size: 150%;\n}\n\n.tp-section[_ngcontent-%COMP%] {\n  align-items: flex-end;\n  background-color: #d0d0d0;\n  margin-bottom: 1em;\n}\n\n.videoSingleListing[_ngcontent-%COMP%] {\n  padding: 0em 2em 0em 2em;\n}\n\n.mat-toolbar[_ngcontent-%COMP%] {\n  background-color: #5d5d5d;\n}\n\n.mat-sidenav-container[_ngcontent-%COMP%] {\n  min-height: 93vh !important;\n  background-color: #2c2d31;\n}\n\n.main[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n\n.videogular-container[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-left: 1em;\n  margin-right: 1em;\n  overflow: hidden;\n  display: inline-block;\n  position: relative;\n}\n\n.scope-container[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-left: 1em;\n  margin-right: 1em;\n  display: flex;\n  justify-content: center;\n}\n\n.scope-selector-row[_ngcontent-%COMP%] {\n  display: flex;\n  margin: 2em;\n  justify-content: flex-end;\n}\n\n.title[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 1.3em;\n  color: white;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n\n.row-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-around;\n  height: 60vh;\n}\n\n#overlay[_ngcontent-%COMP%] {\n  display: inline-block;\n  \n  width: 100%;\n  height: 100%;\n  background-image: repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0.5), #ff0f0f, transparent 1px, transparent 3rem);\n  background-color: rgba(0, 0, 0, 0.8);\n  \n  position: relative;\n  cursor: pointer;\n  \n}\n\ncanvas[_ngcontent-%COMP%] {\n  border: 3px solid black;\n  margin-left: 5%;\n  border-bottom: none;\n  border-top: none;\n  border-right: none;\n}\n\n.spacer[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n\n.file-input[_ngcontent-%COMP%] {\n  display: none;\n}\n\n#scopecanvas[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  width: 95%;\n  height: 100%;\n}\n\n#vidcanvas[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.metadata-container[_ngcontent-%COMP%] {\n  background-color: #5f5f5f;\n  margin: 1em;\n}\n\n.metadata-title[_ngcontent-%COMP%] {\n  color: white;\n  margin: 1em;\n  font-size: 1em;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n\n.metadata-text[_ngcontent-%COMP%] {\n  color: white;\n  margin: 1em;\n  font-size: 0.7em;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n\n.footer-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNJLGVBQUE7QUFESjs7QUFJQTtFQUNJLHFCQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtBQURKOztBQUlBO0VBQ0ksd0JBQUE7QUFESjs7QUFJQTtFQUVJLHlCQUFBO0FBRko7O0FBS0E7RUFFSSwyQkFBQTtFQUNBLHlCQUFBO0FBSEo7O0FBUUE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtBQUxKOztBQVFBO0VBQ0ksT0FBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7QUFMSjs7QUFRQTtFQUNJLE9BQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0FBTEo7O0FBU0E7RUFDSSxhQUFBO0VBQ0EsV0FBQTtFQUNBLHlCQUFBO0FBTko7O0FBU0E7RUFDSSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsaURBQUE7QUFOSjs7QUFTQTtFQUNJLGFBQUE7RUFDQSw2QkFBQTtFQUNBLFlBQUE7QUFOSjs7QUFTQTtFQUNJLHFCQUFBO0VBQXVCLHNCQUFBO0VBQ3ZCLFdBQUE7RUFDQSxZQUFBO0VBRUEsc0hBQUE7RUFFQSxvQ0FBQTtFQUFtQyxrQ0FBQTtFQUNuQyxrQkFBQTtFQUNBLGVBQUE7RUFBaUIsMkJBQUE7QUFMckI7O0FBUUE7RUFDSSx1QkFBQTtFQUVBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFOSjs7QUFTQTtFQUNJLGNBQUE7QUFOSjs7QUFTQTtFQUNJLGFBQUE7QUFOSjs7QUFTQTtFQUNJLFlBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtBQU5KOztBQVNBO0VBQ0ksYUFBQTtBQU5KOztBQVNBO0VBQ0kseUJBQUE7RUFDQSxXQUFBO0FBTko7O0FBU0E7RUFDSSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7RUFDQSxpREFBQTtBQU5KOztBQVNBO0VBQ0ksWUFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGlEQUFBO0FBTko7O0FBU0E7RUFDSSxhQUFBO0VBQ0EsOEJBQUE7QUFOSiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy8gTkFWQkFSXHJcbi5uYXZiYXJOYW1le1xyXG4gICAgZm9udC1zaXplOiAxNTAlO1xyXG59XHJcblxyXG4udHAtc2VjdGlvbiB7XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDBkMGQwO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMWVtO1xyXG59XHJcblxyXG4udmlkZW9TaW5nbGVMaXN0aW5nIHtcclxuICAgIHBhZGRpbmc6IDBlbSAyZW0gMGVtIDJlbTtcclxufVxyXG5cclxuLm1hdC10b29sYmFye1xyXG4gICAgLy8gaGVpZ2h0OiA3dmg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWQ1ZDVkO1xyXG59XHJcblxyXG4ubWF0LXNpZGVuYXYtY29udGFpbmVye1xyXG4gICAgLy9iYWNrZ3JvdW5kLWNvbG9yOiBsaWdodHNreWJsdWU7XHJcbiAgICBtaW4taGVpZ2h0OiA5M3ZoICFpbXBvcnRhbnQ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmMyZDMxO1xyXG59XHJcblxyXG5cclxuLy8gTUFJTiBQQUdFXHJcbi5tYWluIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlOyAgXHJcbn1cclxuXHJcbi52aWRlb2d1bGFyLWNvbnRhaW5lciB7XHJcbiAgICBmbGV4OiAxO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDFlbTtcclxuICAgIG1hcmdpbi1yaWdodDogMWVtO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG5cclxuLnNjb3BlLWNvbnRhaW5lciB7XHJcbiAgICBmbGV4OiAxO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDFlbTtcclxuICAgIG1hcmdpbi1yaWdodDogMWVtO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5cclxufVxyXG5cclxuLnNjb3BlLXNlbGVjdG9yLXJvdyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgbWFyZ2luOiAyZW07XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG59XHJcblxyXG4udGl0bGUge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbWFyZ2luOiAxLjNlbTtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcclxufVxyXG5cclxuLnJvdy1jb250YWluZXJ7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgICBoZWlnaHQ6IDYwdmg7XHJcbn1cclxuXHJcbiNvdmVybGF5IHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsgLyogSGlkZGVuIGJ5IGRlZmF1bHQgKi9cclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG5cclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCByZ2JhKDAsMCwwLDAuNSksIGhzbCgwLCAxMDAlLCA1MyUpLCAgdHJhbnNwYXJlbnQgMXB4LCB0cmFuc3BhcmVudCAzcmVtKTtcclxuXHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMCwwLDAuOCk7IC8qIEJsYWNrIGJhY2tncm91bmQgd2l0aCBvcGFjaXR5ICovXHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7IC8qIEFkZCBhIHBvaW50ZXIgb24gaG92ZXIgKi9cclxufVxyXG5cclxuY2FudmFzIHtcclxuICAgIGJvcmRlcjogM3B4IHNvbGlkIGJsYWNrO1xyXG5cclxuICAgIG1hcmdpbi1sZWZ0OiA1JTtcclxuICAgIGJvcmRlci1ib3R0b206IG5vbmU7XHJcbiAgICBib3JkZXItdG9wOiBub25lO1xyXG4gICAgYm9yZGVyLXJpZ2h0OiBub25lO1xyXG59XHJcblxyXG4uc3BhY2VyIHtcclxuICAgIGZsZXg6IDEgMSBhdXRvO1xyXG59XHJcblxyXG4uZmlsZS1pbnB1dCB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG59XHJcblxyXG4jc2NvcGVjYW52YXMge1xyXG4gICAgb3BhY2l0eTogMC41O1xyXG4gICAgd2lkdGg6IDk1JTtcclxuICAgIGhlaWdodDogMTAwJTtcclxufVxyXG5cclxuI3ZpZGNhbnZhcyB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG59XHJcblxyXG4ubWV0YWRhdGEtY29udGFpbmVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig5NSwgOTUsIDk1KTtcclxuICAgIG1hcmdpbjogMWVtO1xyXG59XHJcblxyXG4ubWV0YWRhdGEtdGl0bGUge1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgbWFyZ2luOiAxZW07XHJcbiAgICBmb250LXNpemU6IDFlbTtcclxuICAgIGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcclxufVxyXG5cclxuLm1ldGFkYXRhLXRleHQge1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgbWFyZ2luOiAxZW07XHJcbiAgICBmb250LXNpemU6IDAuN2VtO1xyXG4gICAgZm9udC1mYW1pbHk6IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO1xyXG59XHJcblxyXG4uZm9vdGVyLWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG59Il19 */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/flex-layout */ "YUcS");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _pipes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pipes */ "7zmE");
/* harmony import */ var _videogular_ngx_videogular_buffering__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @videogular/ngx-videogular/buffering */ "VKRg");
/* harmony import */ var _videogular_ngx_videogular_overlay_play__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @videogular/ngx-videogular/overlay-play */ "cqME");
/* harmony import */ var _videogular_ngx_videogular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @videogular/ngx-videogular/core */ "4w57");
/* harmony import */ var _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @videogular/ngx-videogular/controls */ "v2j/");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ "fXoL");


















class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _videogular_ngx_videogular_core__WEBPACK_IMPORTED_MODULE_13__["VgCoreModule"],
            _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_14__["VgControlsModule"],
            _videogular_ngx_videogular_overlay_play__WEBPACK_IMPORTED_MODULE_12__["VgOverlayPlayModule"],
            _videogular_ngx_videogular_buffering__WEBPACK_IMPORTED_MODULE_11__["VgBufferingModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"],
            _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__["FlexLayoutModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_8__["MatSelectModule"],
            _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_6__["MatSidenavModule"],
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__["MatToolbarModule"],
            _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_7__["MatButtonToggleModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_15__["HttpClientModule"],
            _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_16__["MatProgressBarModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_pipes__WEBPACK_IMPORTED_MODULE_10__["MsToFps"],
        _pipes__WEBPACK_IMPORTED_MODULE_10__["GetAvg"],
        _pipes__WEBPACK_IMPORTED_MODULE_10__["GetName"],
        _pipes__WEBPACK_IMPORTED_MODULE_10__["LastElement"],
        _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _videogular_ngx_videogular_core__WEBPACK_IMPORTED_MODULE_13__["VgCoreModule"],
        _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_14__["VgControlsModule"],
        _videogular_ngx_videogular_overlay_play__WEBPACK_IMPORTED_MODULE_12__["VgOverlayPlayModule"],
        _videogular_ngx_videogular_buffering__WEBPACK_IMPORTED_MODULE_11__["VgBufferingModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"],
        _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__["FlexLayoutModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_8__["MatSelectModule"],
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_6__["MatSidenavModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__["MatToolbarModule"],
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_7__["MatButtonToggleModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_15__["HttpClientModule"],
        _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_16__["MatProgressBarModule"]] }); })();


/***/ }),

/***/ "iumO":
/*!*******************************!*\
  !*** ./src/app/algorithms.ts ***!
  \*******************************/
/*! exports provided: js_lumascope, js_color_lumascope, js_rgb_parade, js_vectorscope */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "js_lumascope", function() { return js_lumascope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "js_color_lumascope", function() { return js_color_lumascope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "js_rgb_parade", function() { return js_rgb_parade; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "js_vectorscope", function() { return js_vectorscope; });
function convert_itu_bt709(r, g, b) {
    let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b; // Y value
    //rerange from 0 -> 1
    luminance = luminance / 255.0;
    return luminance;
}
// convert to luminance scale 0-1 (regardless of R,G,B)
function convert_simple(pixel) {
    let luminance = pixel / 255.0;
    return luminance;
}
// source: https://softpixel.com/~cwright/programming/colorspace/yuv/
function RGBtoY(R, G, B) {
    return (R * .299000) + (G * .587000) + (B * .114000); // 0 - 255
}
function RGBtoUV(R, G, B) {
    let U = (R * -.168736) + (G * -.331264) + (B * .500000) + 128; // 0 - 255
    let V = (R * .500000) + (G * -.418688) + (B * -.081312) + 128; // 0 - 255
    return [U, V];
}
function YUVtoRGB(Y, U, V) {
    let R = Y + 1.4075 * (V - 128);
    let G = Y - 0.3455 * (U - 128) - (0.7169 * (V - 128));
    let B = Y + 1.7790 * (U - 128);
    return [R, G, B];
}
function normalize(input) {
    return input / 255.0;
}
function getIndex(x, y, width) {
    return ((y * width) + x) * 4;
}
function getUpdatedColor(pixel_cur, pixel_new, divider, constant) {
    let result = pixel_cur + (constant * pixel_new / divider);
    if (result > 255)
        return 255;
    return Math.floor(result);
}
/////// SCOPE GENERATORS ///////
// get itu_bt.709 luminance (waveform)
function js_lumascope(data_in, data_out, width, height) {
    let index;
    let Y;
    let histogram = new Array(1024);
    for (let w = 0; w < width; w++) {
        for (let i = 0; i < height; i++)
            histogram[i] = 0;
        for (let h = 0; h < height; h++) {
            index = ((h * width) + w) * 4;
            Y = Math.floor(height * convert_itu_bt709(data_in[index], data_in[index + 1], data_in[index + 2]));
            //increment histogram bucket for the luminance we found
            histogram[height - (Y + 1)] += 4.0 * 256 / height; // (Y, U, V)
        }
        for (let h = 0; h < height; h++) {
            index = ((h * width) + w) * 4;
            //  display histogram using green pixels (i.e. set r and b to 0)
            data_out[index] = histogram[h];
            data_out[index + 1] = histogram[h];
            data_out[index + 2] = histogram[h];
            data_out[index + 3] = 255;
        }
    }
}
// get RGB luminance (waveform)
function js_color_lumascope(data_in, data_out, width, height) {
    let index, Y_height;
    let Y, U, V;
    let R, G, B;
    let histogramY = new Array(1024); // Y values
    let totalR = new Array(1024);
    let totalG = new Array(1024);
    let totalB = new Array(1024);
    let count = new Array(1024);
    for (let w = 0; w < width; w++) {
        // initialize histograms to 0
        for (let h = 0; h < height; h++) {
            histogramY[h] = 0;
            totalR[h] = 0;
            totalG[h] = 0;
            totalB[h] = 0;
            count[h] = 0;
        }
        // process data_in[]
        for (let h = 0; h < height; h++) {
            index = ((h * width) + w) * 4;
            // get Y
            Y = RGBtoY(data_in[index], data_in[index + 1], data_in[index + 2]);
            Y_height = normalize(Y) * (height - 1); // 0 - (height - 1)
            // increment histogram bucket for the luminance we found (inverted)
            histogramY[height - Y_height - 1] += 4 * 256.0 / height;
            // sum RGB
            totalR[height - Y_height - 1] += data_in[index];
            totalG[height - Y_height - 1] += data_in[index + 1];
            totalB[height - Y_height - 1] += data_in[index + 2];
            // counter
            count[height - Y_height - 1] += 1;
        }
        // process data_out[]
        for (let h = 0; h < height; h++) {
            if (count[h] == 0)
                count[h] = 1;
            // average RGB
            R = totalR[h] / count[h];
            G = totalG[h] / count[h];
            B = totalB[h] / count[h];
            let uvVal = RGBtoUV(R, G, B); // convert average RGB to UV
            U = uvVal[0];
            V = uvVal[1];
            let rgbVal = YUVtoRGB(histogramY[h], U, V); // convert back to RGB with HISTOGRAM Y
            R = rgbVal[0];
            G = rgbVal[1];
            B = rgbVal[2];
            index = ((h * width) + w) * 4;
            // set data_out[] (insert U, V -> RGB)
            data_out[index] = R;
            data_out[index + 1] = G;
            data_out[index + 2] = B;
            data_out[index + 3] = 255;
        }
    }
}
// get seperate RGB luminance (waveform)
function js_rgb_parade(data_in, data_out, width, height) {
    let index; // pixel's index
    let indexR, indexG, indexB; // pixel's index
    let Yr, Yg, Yb; // pixel's luminance
    let channel_width = width / 3;
    let w_r, w_g, w_b;
    //  histogram[1024][3];
    let histogram = new Array(1024).map(() => new Array(3));
    for (let w = 0; w <= channel_width; w++) {
        if (w * 3 >= width) {
            break;
        }
        //initialize histogram elements to zero
        for (let i = 0; i < height; i++) {
            histogram[i][0] = 0;
            histogram[i][1] = 0;
            histogram[i][2] = 0;
        }
        //find luminance, increment histogram bucket
        for (let h = 0; h < height; h++) {
            index = ((h * width) + (w * 3)) * 4;
            Yr = Math.floor(convert_simple(data_in[index]) * height);
            Yg = Math.floor(convert_simple(data_in[index + 1]) * height);
            Yb = Math.floor(convert_simple(data_in[index + 2]) * height);
            histogram[height - (Yr + 1)][0] += 4.0 * 256 / height;
            histogram[height - (Yg + 1)][1] += 4.0 * 256 / height;
            histogram[height - (Yb + 1)][2] += 4.0 * 256 / height;
        }
        w_r = w;
        w_g = w + channel_width;
        w_b = w + (2 * channel_width);
        //display histogram
        for (let h = 0; h < height; h++) {
            indexR = ((h * width) + w_r) * 4;
            indexG = ((h * width) + w_g) * 4;
            indexB = ((h * width) + w_b) * 4;
            data_out[indexR + 1] = 0; //R
            data_out[indexR + 2] = 0;
            data_out[indexG] = 0; //G
            data_out[indexG + 2] = 0;
            data_out[indexB] = 0; //B
            data_out[indexB + 1] = 0;
            data_out[indexR] = histogram[h][0];
            data_out[indexG + 1] = histogram[h][1];
            data_out[indexB + 2] = histogram[h][2];
        }
    }
}
function js_vectorscope(data_in, data_out, width, height, scope_height) {
    let index;
    let x, y;
    let R, G, B;
    let U, V;
    for (let w = 0; w < width; w++) {
        for (let h = 0; h < scope_height; h++) {
            index = getIndex(w, h, width);
            data_out[index] = 0;
            data_out[index + 1] = 0;
            data_out[index + 2] = 0;
            data_out[index + 3] = 255;
        }
    }
    for (let w = 0; w < width; w++) {
        for (let h = 0; h < height; h++) {
            index = getIndex(w, h, width);
            R = data_in[index];
            G = data_in[index + 1];
            B = data_in[index + 2];
            // get UV
            let uvVal = RGBtoUV(R, G, B);
            U = uvVal[0];
            V = uvVal[1];
            // convert UV to XY
            x = normalize(U) * scope_height + 0.5; // 0 to scope's height
            y = (height - 1) - normalize(V) * scope_height + 0.5; // 0 to scope's height
            // calculate resulting pixel brightness
            index = getIndex(x, y, scope_height);
            // insert result
            data_out[index] = getUpdatedColor(data_out[index], R, height, 4);
            data_out[index + 1] = getUpdatedColor(data_out[index + 1], G, height, 4);
            data_out[index + 2] = getUpdatedColor(data_out[index + 2], B, height, 4);
        }
    }
}


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map