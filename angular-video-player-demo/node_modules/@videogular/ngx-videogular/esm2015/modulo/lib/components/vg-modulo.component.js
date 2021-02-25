/**
 * @fileoverview added by tsickle
 * Generated from: lib/components/vg-modulo.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { Gondolo } from "../utils/modulo";
export class VgModuloComponent {
    /**
     * @return {?}
     */
    startVisualizer() {
        if (!this._audioAnalyser) {
            this._audioAnalyser = new Gondolo(this.audioElement);
            const { width, height } = this.moduloConfig.dimensions;
            /** @type {?} */
            const canvasElement = this.waveCanvas.nativeElement;
            this._ctx = canvasElement.getContext("2d");
            canvasElement.width = width;
            canvasElement.height = height;
        }
        this.update();
    }
    /**
     * @return {?}
     */
    update() {
        /** @type {?} */
        const audioFreq = this._audioAnalyser.waveform();
        const { fillStyle, strokeStyle, lineWidth, scaleFactor } = this.moduloConfig;
        const { width, height } = this.waveCanvas.nativeElement;
        // Clear canvas
        this._ctx.fillStyle = fillStyle;
        this._ctx.fillRect(0, 0, width, height);
        this._ctx.strokeStyle = strokeStyle;
        this._ctx.lineWidth = lineWidth;
        // Draw frequency lines
        this._ctx.beginPath();
        this._ctx.moveTo(0, height / 2 - audioFreq[0] * scaleFactor);
        for (let i = 0; i < audioFreq.length; i++) {
            this._ctx.lineTo((width / audioFreq.length) * i, height / 2 - audioFreq[i] * scaleFactor);
        }
        this._ctx.moveTo(0, height / 2 + audioFreq[0] * scaleFactor);
        for (let i = 0; i < audioFreq.length; i++) {
            this._ctx.lineTo((width / audioFreq.length) * i, height / 2 + audioFreq[i] * scaleFactor);
        }
        this._ctx.stroke();
        window.requestAnimationFrame((/**
         * @return {?}
         */
        () => this.update()));
    }
}
VgModuloComponent.decorators = [
    { type: Component, args: [{
                selector: "vg-modulo",
                template: "<canvas #waveCanvas></canvas>\n"
            }] }
];
VgModuloComponent.propDecorators = {
    moduloConfig: [{ type: Input }],
    audioElement: [{ type: Input }],
    waveCanvas: [{ type: ViewChild, args: ["waveCanvas", { static: false },] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    VgModuloComponent.prototype._audioAnalyser;
    /**
     * @type {?}
     * @private
     */
    VgModuloComponent.prototype._ctx;
    /** @type {?} */
    VgModuloComponent.prototype.moduloConfig;
    /** @type {?} */
    VgModuloComponent.prototype.audioElement;
    /** @type {?} */
    VgModuloComponent.prototype.waveCanvas;
}
//# sourceMappingURL=vg-modulo.component.js.map