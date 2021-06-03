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
/*! exports provided: MsToFps, GetAvg, GetName, LastElement, OrderBy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MsToFps", function() { return MsToFps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetAvg", function() { return GetAvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetName", function() { return GetName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LastElement", function() { return LastElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderBy", function() { return OrderBy; });
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
class OrderBy {
    transform(array) {
        return array.sort((a, b) => a.key.localeCompare(b.key));
    }
}
OrderBy.ɵfac = function OrderBy_Factory(t) { return new (t || OrderBy)(); };
OrderBy.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "orderBy", type: OrderBy, pure: false });


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
const _c3 = ["bgScope"];
const _c4 = ["video"];
const _c5 = ["overlay"];
function AppComponent_mat_progress_bar_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "mat-progress-bar", 44);
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx_r2.uploadProgress);
} }
function AppComponent_div_57_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r10.fileName);
} }
function AppComponent_div_58_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "msToFps");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "last");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("Instant: ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 3, ctx_r11.computeTimes)), " fps");
} }
function AppComponent_div_59_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "msToFps");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "getAvg");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("Average: ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 3, ctx_r12.computeTimes)), " fps");
} }
function AppComponent_div_66_mat_option_1_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-option", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_div_66_mat_option_1_Template_mat_option_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r17); const scope_r15 = ctx.$implicit; const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r16.changeScope(scope_r15.value); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "getName");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const scope_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, scope_r15.value), " ");
} }
function AppComponent_div_66_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, AppComponent_div_66_mat_option_1_Template, 3, 3, "mat-option", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "orderBy");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "keyvalue");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 3, ctx_r13.scopes)));
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
        this.uploadFileName = '';
        this.image = new Image();
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
        this.uploadFileName = file.name;
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
                    this.addItem(this.uploadFileName);
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
                    HALIDE_LUMASCOPE: new ScopeDescriptor("Halide Lumascope", this.gModule.instance.exports.lumascope),
                    HALIDE_CLUMASCOPE: new ScopeDescriptor("Halide Lumascope (Color)", this.gModule.instance.exports.clumascope),
                    HALIDE_RGB_PARADE: new ScopeDescriptor("Halide RGB Parade", this.gModule.instance.exports.rgbparade),
                    HALIDE_VECTORSCOPE: new ScopeDescriptor("Halide Vector Scope", this.gModule.instance.exports.vectorscope),
                    HALIDE_CVECTORSCOPE: new ScopeDescriptor("Halide Vector Scope (Color)", this.gModule.instance.exports.cvectorscope),
                    CPP_LUMASCOPE: new ScopeDescriptor("C++ Lumascope", this.gModule.instance.exports.cpp_lumascope),
                    CPP_COLOR_LUMASCOPE: new ScopeDescriptor("C++ Lumascope (Color)", this.gModule.instance.exports.cpp_color_lumascope),
                    CPP_RGB_PARADE: new ScopeDescriptor("C++ RGB Parade", this.gModule.instance.exports.cpp_rgb_parade),
                    CPP_VECTORSCOPE: new ScopeDescriptor("C++ Vector Scope", this.gModule.instance.exports.cpp_vectorscope),
                    CPP_COLOR_VECTORSCOPE: new ScopeDescriptor("C++ Vector Scope (Color)", this.gModule.instance.exports.cpp_color_vectorscope),
                    JS_LUMASCOPE: new ScopeDescriptor("JS Lumascope", _algorithms__WEBPACK_IMPORTED_MODULE_4__["js_lumascope"]),
                    JS_COLOR_LUMASCOPE: new ScopeDescriptor("JS Color Lumascope", _algorithms__WEBPACK_IMPORTED_MODULE_4__["js_color_lumascope"]),
                    JS_RGB_PARADE: new ScopeDescriptor("JS RGB Parade", _algorithms__WEBPACK_IMPORTED_MODULE_4__["js_rgb_parade"]),
                    JS_VECTORSCOPE: new ScopeDescriptor("JS Vector Scope (Color)", _algorithms__WEBPACK_IMPORTED_MODULE_4__["js_color_vectorscope"]),
                    JS_COLOR_VECTORSCOPE: new ScopeDescriptor("JS Vector Scope", _algorithms__WEBPACK_IMPORTED_MODULE_4__["js_vectorscope"]),
                };
                this.currentScope = this.scopes.HALIDE_LUMASCOPE;
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        this.computeTimes = [];
        this.currentScope = scope;
        switch (this.currentScope) {
            case this.scopes.HALIDE_LUMASCOPE:
            case this.scopes.HALIDE_CLUMASCOPE:
            case this.scopes.CPP_LUMASCOPE:
            case this.scopes.CPP_COLOR_LUMASCOPE:
            case this.scopes.JS_LUMASCOPE:
            case this.scopes.JS_COLOR_LUMASCOPE:
                (_a = this.bgScopeCtx) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, (_b = this.bgScope) === null || _b === void 0 ? void 0 : _b.nativeElement.width, (_c = this.bgScope) === null || _c === void 0 ? void 0 : _c.nativeElement.height);
                this.image.src = "../../assets/images/scopes.svg";
                this.vidcanvasCtx.canvas.width = 116;
                this.vidcanvasCtx.canvas.height = 256;
                this.scopecanvasCtx.canvas.width = 116;
                this.scopecanvasCtx.canvas.height = 256;
                break;
            case this.scopes.HALIDE_VECTORSCOPE:
            case this.scopes.HALIDE_CVECTORSCOPE:
            case this.scopes.CPP_VECTORSCOPE:
            case this.scopes.CPP_COLOR_VECTORSCOPE:
            case this.scopes.JS_VECTORSCOPE:
            case this.scopes.JS_COLOR_VECTORSCOPE:
                (_d = this.bgScopeCtx) === null || _d === void 0 ? void 0 : _d.clearRect(0, 0, (_e = this.bgScope) === null || _e === void 0 ? void 0 : _e.nativeElement.width, (_f = this.bgScope) === null || _f === void 0 ? void 0 : _f.nativeElement.height);
                this.image.src = "../../assets/images/vectorscope.svg";
                this.vidcanvasCtx.canvas.width = 256;
                this.vidcanvasCtx.canvas.height = 256;
                this.scopecanvasCtx.canvas.width = 256;
                this.scopecanvasCtx.canvas.height = 256;
                break;
            case this.scopes.HALIDE_RGB_PARADE:
            case this.scopes.CPP_RGB_PARADE:
            case this.scopes.JS_RGB_PARADE:
                (_g = this.bgScopeCtx) === null || _g === void 0 ? void 0 : _g.clearRect(0, 0, (_h = this.bgScope) === null || _h === void 0 ? void 0 : _h.nativeElement.width, (_j = this.bgScope) === null || _j === void 0 ? void 0 : _j.nativeElement.height);
                this.image.src = "../../assets/images/scopes.svg";
                this.vidcanvasCtx.canvas.width = 128;
                this.vidcanvasCtx.canvas.height = 256;
                this.scopecanvasCtx.canvas.width = 128 * 3;
                this.scopecanvasCtx.canvas.height = 256;
                break;
        }
        this.allocateMemory();
    }
    doLoad() {
        var _a, _b, _c, _d, _e, _f, _g;
        // Get html elements
        this.scopecanvasCtx = (_a = this.scopecanvas) === null || _a === void 0 ? void 0 : _a.nativeElement.getContext("2d");
        this.vidcanvasCtx = (_b = this.vidcanvas) === null || _b === void 0 ? void 0 : _b.nativeElement.getContext("2d");
        this.bgScopeCtx = (_c = this.bgScope) === null || _c === void 0 ? void 0 : _c.nativeElement.getContext("2d");
        this.bgScopeCtx.canvas.width = 256;
        this.bgScopeCtx.canvas.height = 256;
        (_d = this.bgScopeCtx) === null || _d === void 0 ? void 0 : _d.clearRect(0, 0, (_e = this.bgScope) === null || _e === void 0 ? void 0 : _e.nativeElement.width, (_f = this.bgScope) === null || _f === void 0 ? void 0 : _f.nativeElement.height);
        this.image.onload = () => {
            var _a, _b, _c;
            (_a = this.bgScopeCtx) === null || _a === void 0 ? void 0 : _a.drawImage(this.image, 0, 0, (_b = this.bgScope) === null || _b === void 0 ? void 0 : _b.nativeElement.width, (_c = this.bgScope) === null || _c === void 0 ? void 0 : _c.nativeElement.height);
        };
        // Chart for the scope.
        this.image.src = "../../assets/images/scopes.svg";
        // Start callback to process frame
        (_g = this.video) === null || _g === void 0 ? void 0 : _g.nativeElement.addEventListener("play", () => {
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
        if (this.currentScope.name.includes("JS")) {
            let data_out = new Array(outputWidth * outputHeight * 4);
            this.currentScope.func(data, data_out, width, height);
            (_d = this.scopecanvasCtx) === null || _d === void 0 ? void 0 : _d.putImageData(new ImageData(new Uint8ClampedArray(data_out), outputWidth, outputHeight), 0, 0);
        }
        else {
            this.inputArray.set(data);
            this.currentScope.func(this.inputPointer, this.outputPointer, width, height);
            (_e = this.scopecanvasCtx) === null || _e === void 0 ? void 0 : _e.putImageData(new ImageData(new Uint8ClampedArray(this.outputArray), outputWidth, outputHeight), 0, 0);
        }
        return;
    }
    getSize(event) {
        let size = {};
        let currentScope = event.currentScope.name;
        switch (currentScope) {
            case "Halide Vector Scope":
            case "Halide Vector Scope (Color)":
            case "C++ Vector Scope":
            case "C++ Vector Scope (Color)":
            case "JS Vector Scope (Color)":
            case "JS Vector Scope":
                size = {
                    position: 'relative',
                    width: '75%',
                    height: '100%'
                };
                break;
            default:
                size = {
                    position: 'relative',
                    width: '100%',
                    height: '100%'
                };
        }
        return size;
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["DomSanitizer"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["Renderer2"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], viewQuery: function AppComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c4, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c5, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.files = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.scopecanvas = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.vidcanvas = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.bgScope = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.video = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.overlay = _t.first);
    } }, decls: 67, vars: 11, consts: [[1, "main"], ["color", "primary"], ["fxShow", "true"], ["mat-icon-button", "", 3, "click"], ["mat-button", "", "routerLink", "/", 1, "navbarTitle"], [1, "spacer"], ["fxFlexFill", ""], ["color", "primary", "fxLayout", "column", "mode", "over", "opened", "false"], ["sidenav", ""], ["fxLayoutAlign", "end start", 1, "tp-section"], ["type", "file", 1, "file-input", 3, "change"], ["fileUpload", ""], [1, "progress"], ["class", "progress-bar", "mode", "determinate", 3, "value", 4, "ngIf"], ["fxLayout", "column"], ["files", ""], [1, "title"], [1, "row-container"], [1, "videogular-container"], [3, "onPlayerReady", "change"], ["vgProperty", "current", "vgFormat", "mm:ss"], [2, "pointer-events", "none"], ["vgProperty", "total", "vgFormat", "mm:ss"], ["vgProperty", "right"], ["preload", "auto", "crossorigin", "", 3, "vgMedia", "src"], ["video", "", "media", ""], [1, "scope-container"], ["id", "overlay", 3, "ngStyle"], ["overlay", ""], ["id", "scopecanvas", "width", "128", "height", "256"], ["scopecanvas", ""], ["id", "bgScope", "width", "128", "height", "256"], ["bgScope", ""], ["id", "vidcanvas", "width", "128", "height", "256"], ["vidcanvas", ""], [1, "footer-container"], [1, "metadata-container"], ["class", "metadata-title", 4, "ngIf"], ["class", "metadata-text", 4, "ngIf"], [1, "scope-selector-row"], ["appearance", "fill"], [1, "scopeSelector"], ["panelClass", "scopePanels"], [4, "ngIf"], ["mode", "determinate", 1, "progress-bar", 3, "value"], [1, "metadata-title"], [1, "metadata-text"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "mat-toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r18); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](12); return _r0.toggle(); });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_Template_button_click_16_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r18); const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](15); return _r1.click(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](18, "upload_file");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](20, AppComponent_mat_progress_bar_20_Template, 1, 1, "mat-progress-bar", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](21, "div", 14, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "mat-sidenav-content", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "h1", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](25, "Webassembly Video Scope");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](26, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](27, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](28, "vg-player", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("onPlayerReady", function AppComponent_Template_vg_player_onPlayerReady_28_listener($event) { return ctx.invokePlay($event); })("change", function AppComponent_Template_vg_player_change_28_listener($event) { return ctx.invokePlay($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](29, "vg-overlay-play");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](30, "vg-buffering");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](31, "vg-scrub-bar");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](32, "vg-scrub-bar-current-time");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](33, "vg-scrub-bar-buffering-time");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](34, "vg-controls");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](35, "vg-play-pause");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](36, "vg-playback-button");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](37, "vg-time-display", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](38, "vg-scrub-bar", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](39, "vg-time-display", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](40, "vg-mute", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](41, "vg-volume", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](42, "vg-fullscreen", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](43, "video", 24, 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](46, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](47, "div", 27, 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](49, "canvas", 29, 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](51, "canvas", 31, 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](53, "canvas", 33, 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](55, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](56, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](57, AppComponent_div_57_Template, 2, 1, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](58, AppComponent_div_58_Template, 4, 5, "div", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](59, AppComponent_div_59_Template, 4, 5, "div", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](60, "div", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](61, "mat-form-field", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](62, "mat-label", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](63);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](64, "getName");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](65, "mat-select", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](66, AppComponent_div_66_Template, 4, 5, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](45);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](20);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.uploadProgress);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("vgMedia", _r5)("src", ctx.currentVidSrc, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngStyle", ctx.getSize(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.fileName.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.computeTimes.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.computeTimes.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](64, 9, ctx.currentScope));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.scopes);
    } }, directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_7__["MatToolbar"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_8__["DefaultShowHideDirective"], _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButton"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIcon"], _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatAnchor"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__["MatSidenavContainer"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_12__["FlexFillDirective"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__["MatSidenav"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_12__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_12__["DefaultLayoutAlignDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgIf"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__["MatSidenavContent"], _videogular_ngx_videogular_core__WEBPACK_IMPORTED_MODULE_14__["VgPlayerComponent"], _videogular_ngx_videogular_overlay_play__WEBPACK_IMPORTED_MODULE_15__["VgOverlayPlayComponent"], _videogular_ngx_videogular_buffering__WEBPACK_IMPORTED_MODULE_16__["VgBufferingComponent"], _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_17__["VgScrubBarComponent"], _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_17__["VgScrubBarCurrentTimeComponent"], _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_17__["VgScrubBarBufferingTimeComponent"], _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_17__["VgControlsComponent"], _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_17__["VgPlayPauseComponent"], _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_17__["VgPlaybackButtonComponent"], _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_17__["VgTimeDisplayComponent"], _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_17__["VgMuteComponent"], _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_17__["VgVolumeComponent"], _videogular_ngx_videogular_controls__WEBPACK_IMPORTED_MODULE_17__["VgFullscreenComponent"], _videogular_ngx_videogular_core__WEBPACK_IMPORTED_MODULE_14__["VgMediaDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgStyle"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_8__["DefaultStyleDirective"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__["MatLabel"], _angular_material_select__WEBPACK_IMPORTED_MODULE_19__["MatSelect"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_20__["MatProgressBar"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgForOf"], _angular_material_core__WEBPACK_IMPORTED_MODULE_21__["MatOption"]], pipes: [_pipes__WEBPACK_IMPORTED_MODULE_22__["GetName"], _pipes__WEBPACK_IMPORTED_MODULE_22__["MsToFps"], _pipes__WEBPACK_IMPORTED_MODULE_22__["LastElement"], _pipes__WEBPACK_IMPORTED_MODULE_22__["GetAvg"], _pipes__WEBPACK_IMPORTED_MODULE_22__["OrderBy"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["KeyValuePipe"]], styles: [".navbarName[_ngcontent-%COMP%] {\n  font-size: 150%;\n}\n\n.tp-section[_ngcontent-%COMP%] {\n  align-items: flex-end;\n  background-color: #d0d0d0;\n  margin-bottom: 1em;\n}\n\n.videoSingleListing[_ngcontent-%COMP%] {\n  padding: 0em 2em 0em 2em;\n}\n\n.mat-toolbar[_ngcontent-%COMP%] {\n  background-color: #5d5d5d;\n}\n\n.mat-sidenav-container[_ngcontent-%COMP%] {\n  min-height: 93vh !important;\n  background-color: #2c2d31;\n}\n\n.main[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n\n.videogular-container[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-left: 1em;\n  margin-right: 1em;\n  overflow: hidden;\n  display: inline-block;\n  position: relative;\n}\n\n.scope-container[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-left: 1em;\n  margin-right: 1em;\n  display: flex;\n  justify-content: center;\n}\n\n.scope-selector-row[_ngcontent-%COMP%] {\n  display: flex;\n  margin: 2em;\n  justify-content: flex-end;\n}\n\n.title[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 1.3em;\n  color: white;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n\n.row-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-around;\n  height: 60vh;\n}\n\n#overlay[_ngcontent-%COMP%] {\n  display: inline-block;\n  \n  width: 100%;\n  height: 100%;\n  position: relative;\n  cursor: pointer;\n  \n}\n\n.spacer[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n\n.file-input[_ngcontent-%COMP%] {\n  display: none;\n}\n\n#scopecanvas[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  width: 95%;\n  height: 100%;\n}\n\n#vidcanvas[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.metadata-container[_ngcontent-%COMP%] {\n  background-color: #5f5f5f;\n  margin: 1em;\n}\n\n.metadata-title[_ngcontent-%COMP%] {\n  color: white;\n  margin: 1em;\n  font-size: 1em;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n\n.metadata-text[_ngcontent-%COMP%] {\n  color: white;\n  margin: 1em;\n  font-size: 0.7em;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n\n.footer-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n}\n\n#overlay[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNJLGVBQUE7QUFESjs7QUFJQTtFQUNJLHFCQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtBQURKOztBQUlBO0VBQ0ksd0JBQUE7QUFESjs7QUFJQTtFQUVJLHlCQUFBO0FBRko7O0FBS0E7RUFFSSwyQkFBQTtFQUNBLHlCQUFBO0FBSEo7O0FBUUE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtBQUxKOztBQVFBO0VBQ0ksT0FBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7QUFMSjs7QUFRQTtFQUNJLE9BQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0FBTEo7O0FBU0E7RUFDSSxhQUFBO0VBQ0EsV0FBQTtFQUNBLHlCQUFBO0FBTko7O0FBU0E7RUFDSSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsaURBQUE7QUFOSjs7QUFTQTtFQUNJLGFBQUE7RUFDQSw2QkFBQTtFQUNBLFlBQUE7QUFOSjs7QUFTQTtFQUNJLHFCQUFBO0VBQXVCLHNCQUFBO0VBQ3ZCLFdBQUE7RUFDQSxZQUFBO0VBS0Esa0JBQUE7RUFDQSxlQUFBO0VBQWlCLDJCQUFBO0FBUnJCOztBQVdBO0VBQ0ksY0FBQTtBQVJKOztBQVdBO0VBQ0ksYUFBQTtBQVJKOztBQVdBO0VBQ0ksWUFBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0FBUko7O0FBV0E7RUFDSSxhQUFBO0FBUko7O0FBV0E7RUFDSSx5QkFBQTtFQUNBLFdBQUE7QUFSSjs7QUFXQTtFQUNJLFlBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLGlEQUFBO0FBUko7O0FBV0E7RUFDSSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsaURBQUE7QUFSSjs7QUFXQTtFQUNJLGFBQUE7RUFDQSw4QkFBQTtBQVJKOztBQVVBO0VBRUksa0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQVJKIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vLyBOQVZCQVJcclxuLm5hdmJhck5hbWV7XHJcbiAgICBmb250LXNpemU6IDE1MCU7XHJcbn1cclxuXHJcbi50cC1zZWN0aW9uIHtcclxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkMGQwZDA7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxZW07XHJcbn1cclxuXHJcbi52aWRlb1NpbmdsZUxpc3Rpbmcge1xyXG4gICAgcGFkZGluZzogMGVtIDJlbSAwZW0gMmVtO1xyXG59XHJcblxyXG4ubWF0LXRvb2xiYXJ7XHJcbiAgICAvLyBoZWlnaHQ6IDd2aDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM1ZDVkNWQ7XHJcbn1cclxuXHJcbi5tYXQtc2lkZW5hdi1jb250YWluZXJ7XHJcbiAgICAvL2JhY2tncm91bmQtY29sb3I6IGxpZ2h0c2t5Ymx1ZTtcclxuICAgIG1pbi1oZWlnaHQ6IDkzdmggIWltcG9ydGFudDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyYzJkMzE7XHJcbn1cclxuXHJcblxyXG4vLyBNQUlOIFBBR0VcclxuLm1haW4ge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7ICBcclxufVxyXG5cclxuLnZpZGVvZ3VsYXItY29udGFpbmVyIHtcclxuICAgIGZsZXg6IDE7XHJcbiAgICBtYXJnaW4tbGVmdDogMWVtO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxZW07XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcblxyXG4uc2NvcGUtY29udGFpbmVyIHtcclxuICAgIGZsZXg6IDE7XHJcbiAgICBtYXJnaW4tbGVmdDogMWVtO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxZW07XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblxyXG59XHJcblxyXG4uc2NvcGUtc2VsZWN0b3Itcm93IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBtYXJnaW46IDJlbTtcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XHJcbn1cclxuXHJcbi50aXRsZSB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW46IDEuM2VtO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgZm9udC1mYW1pbHk6IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO1xyXG59XHJcblxyXG4ucm93LWNvbnRhaW5lcntcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICAgIGhlaWdodDogNjB2aDtcclxufVxyXG5cclxuI292ZXJsYXkge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrOyAvKiBIaWRkZW4gYnkgZGVmYXVsdCAqL1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcblxyXG4gICAgLy9iYWNrZ3JvdW5kLWltYWdlOiByZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgcmdiYSgwLDAsMCwwLjUpLCBoc2woMCwgMTAwJSwgNTMlKSwgIHRyYW5zcGFyZW50IDFweCwgdHJhbnNwYXJlbnQgM3JlbSk7XHJcblxyXG4gICAgLy9iYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMCwwLDAuOCk7IC8qIEJsYWNrIGJhY2tncm91bmQgd2l0aCBvcGFjaXR5ICovXHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7IC8qIEFkZCBhIHBvaW50ZXIgb24gaG92ZXIgKi9cclxufVxyXG5cclxuLnNwYWNlciB7XHJcbiAgICBmbGV4OiAxIDEgYXV0bztcclxufVxyXG5cclxuLmZpbGUtaW5wdXQge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxufVxyXG5cclxuI3Njb3BlY2FudmFzIHtcclxuICAgIG9wYWNpdHk6IDAuNTtcclxuICAgIHdpZHRoOiA5NSU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbiN2aWRjYW52YXMge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxufVxyXG5cclxuLm1ldGFkYXRhLWNvbnRhaW5lciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoOTUsIDk1LCA5NSk7XHJcbiAgICBtYXJnaW46IDFlbTtcclxufVxyXG5cclxuLm1ldGFkYXRhLXRpdGxlIHtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIG1hcmdpbjogMWVtO1xyXG4gICAgZm9udC1zaXplOiAxZW07XHJcbiAgICBmb250LWZhbWlseTogUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7XHJcbn1cclxuXHJcbi5tZXRhZGF0YS10ZXh0IHtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIG1hcmdpbjogMWVtO1xyXG4gICAgZm9udC1zaXplOiAwLjdlbTtcclxuICAgIGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcclxufVxyXG5cclxuLmZvb3Rlci1jb250YWluZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG4jb3ZlcmxheSBjYW52YXMge1xyXG5cclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHdpZHRoOiAxMDAlOyBcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgXHJcbn1cclxuI2JnU2NvcGUge1xyXG4gIFxyXG4gICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xyXG59XHJcbiJdfQ== */"] });


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
        _pipes__WEBPACK_IMPORTED_MODULE_10__["OrderBy"],
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
/*! exports provided: js_lumascope, js_color_lumascope, js_rgb_parade, js_color_vectorscope, js_vectorscope */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "js_lumascope", function() { return js_lumascope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "js_color_lumascope", function() { return js_color_lumascope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "js_rgb_parade", function() { return js_rgb_parade; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "js_color_vectorscope", function() { return js_color_vectorscope; });
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
    if (luminance > 1) {
        return 1;
    }
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
            histogram[height - (Y + 1)] += 16.0 * 256 / height;
        }
        for (let h = 0; h < height; h++) {
            index = ((h * width) + w) * 4;
            //  display histogram using green pixels (i.e. set r and b to 0)
            data_out[index] = 0;
            data_out[index + 1] = histogram[h];
            data_out[index + 2] = 0;
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
            histogramY[Math.floor(height - Y_height - 1)] += 16 * 256.0 / height;
            // sum RGB
            totalR[Math.floor(height - Y_height - 1)] += data_in[index];
            totalG[Math.floor(height - Y_height - 1)] += data_in[index + 1];
            totalB[Math.floor(height - Y_height - 1)] += data_in[index + 2];
            // counter
            count[Math.floor(height - Y_height - 1)] += 1;
        }
        // process data_out[]
        for (let h = 0; h < height; h++) {
            if (count[h] == 0)
                count[h] = 1;
            // average RGB
            R = totalR[h] / count[h];
            G = totalG[h] / count[h];
            B = totalB[h] / count[h];
            // convert to UV
            let uvVal = RGBtoUV(R, G, B);
            U = uvVal[0];
            V = uvVal[1];
            // convert back to RGB with HISTOGRAM Y
            let rgbVal = YUVtoRGB(histogramY[h], U, V);
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
    let output_width = width * 3;
    let w_r, w_g, w_b;
    let histogram = new Array(1024);
    for (let h = 0; h < 1024; h++) {
        histogram[h] = new Array(3);
    }
    for (let w = 0; w < width; w++) {
        //initialize histogram elements to zero
        for (let h = 0; h < height; h++) {
            histogram[h][0] = 0;
            histogram[h][1] = 0;
            histogram[h][2] = 0;
        }
        //find luminance, increment histogram bucket
        for (let h = 0; h < height; h++) {
            index = ((h * width) + w) * 4;
            Yr = Math.floor(data_in[index] / 255.0 * (height - 1));
            Yg = Math.floor(data_in[index + 1] / 255.0 * (height - 1));
            Yb = Math.floor(data_in[index + 2] / 255.0 * (height - 1));
            histogram[height - Yr - 1][0] += 16.0 * 256 / height;
            histogram[height - Yg - 1][1] += 16.0 * 256 / height;
            histogram[height - Yb - 1][2] += 16.0 * 256 / height;
        }
        //display histogram
        for (let h = 0; h < height; h++) {
            indexR = ((h * output_width) + w) * 4;
            indexG = ((h * output_width) + w + width) * 4;
            indexB = ((h * output_width) + w + 2 * width) * 4;
            data_out[indexR + 1] = 0; //R
            data_out[indexR + 2] = 0;
            data_out[indexG] = 0; //G
            data_out[indexG + 2] = 0;
            data_out[indexB] = 0; //B
            data_out[indexB + 1] = 0;
            data_out[indexR] = histogram[h][0];
            data_out[indexG + 1] = histogram[h][1];
            data_out[indexB + 2] = histogram[h][2];
            // set alpha
            data_out[indexR + 3] = 255;
            data_out[indexG + 3] = 255;
            data_out[indexB + 3] = 255;
        }
    }
}
function js_color_vectorscope(data_in, data_out, width, height) {
    let index;
    let x, y;
    let R, G, B;
    let U, V;
    for (let w = 0; w < width; w++) {
        for (let h = 0; h < height; h++) {
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
            x = normalize(U) * (height - 1);
            y = (height - 1) - (normalize(V) * (height - 1));
            // calculate resulting pixel brightness
            index = getIndex(Math.round(x), Math.round(y), height);
            data_out[index] = getUpdatedColor(data_out[index], R, height, 16);
            data_out[index + 1] = getUpdatedColor(data_out[index + 1], G, height, 16);
            data_out[index + 2] = getUpdatedColor(data_out[index + 2], B, height, 16);
        }
    }
}
function js_vectorscope(data_in, data_out, width, height) {
    let index;
    let x, y;
    let R, G, B;
    let U, V;
    for (let w = 0; w < width; w++) {
        for (let h = 0; h < height; h++) {
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
            x = normalize(U) * (height - 1);
            y = (height - 1) - (normalize(V) * (height - 1));
            // calculate resulting pixel brightness
            index = getIndex(Math.round(x), Math.round(y), height);
            let result = data_out[index + 1] + 16.0 * 256 / height;
            if (result > 255)
                result = 255;
            data_out[index] = 0;
            data_out[index + 1] = result;
            data_out[index + 2] = 0;
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