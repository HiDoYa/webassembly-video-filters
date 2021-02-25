/**
 * @fileoverview added by tsickle
 * Generated from: lib/utils/modulo.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const AudioContext = window["AudioContext"] || window["webkitAudioContext"];
export class Gondolo {
    /**
     * @param {?} audio
     * @param {?=} ctx
     * @param {?=} opts
     */
    constructor(audio, ctx, opts) {
        if (!(this instanceof Gondolo)) {
            return new Gondolo(audio, ctx, opts);
        }
        if (!(ctx instanceof AudioContext)) {
            (opts = ctx), (ctx = null);
        }
        opts = opts || {};
        this.ctx = ctx = ctx || new AudioContext();
        if (!(audio instanceof AudioNode)) {
            audio =
                audio instanceof Audio || audio instanceof HTMLAudioElement
                    ? ctx.createMediaElementSource(audio)
                    : ctx.createMediaStreamSource(audio);
        }
        this.audioConfigStateResolver(ctx, opts, audio);
        this.audioConfigStateParser(ctx);
    }
    /**
     * @param {?=} output
     * @param {?=} channel
     * @return {?}
     */
    waveform(output, channel) {
        if (!output) {
            output =
                this.wavedata ||
                    (this.wavedata = new Uint8Array((this.analyser[0] || this.analyser).frequencyBinCount));
        }
        /** @type {?} */
        const analyser = this.stereo ? this.analyser[channel || 0] : this.analyser;
        analyser.getByteTimeDomainData(output);
        return output;
    }
    /**
     * @param {?=} output
     * @param {?=} channel
     * @return {?}
     */
    frequencies(output, channel) {
        if (!output) {
            output =
                this.freqdata ||
                    (this.freqdata = new Uint8Array((this.analyser[0] || this.analyser).frequencyBinCount));
        }
        /** @type {?} */
        const analyser = this.stereo ? this.analyser[channel || 0] : this.analyser;
        analyser.getByteFrequencyData(output);
        return output;
    }
    /**
     * @private
     * @param {?} ctx
     * @param {?} opts
     * @param {?} audio
     * @return {?}
     */
    audioConfigStateResolver(ctx, opts, audio) {
        this.analyser = ctx.createAnalyser();
        this.stereo = !!opts.stereo;
        this.audible = opts.audible !== false;
        this.wavedata = null;
        this.freqdata = null;
        this.splitter = null;
        this.merger = null;
        this.source = audio;
    }
    /**
     * @private
     * @param {?} ctx
     * @return {?}
     */
    audioConfigStateParser(ctx) {
        if (!this.stereo) {
            this.output = this.source;
            this.source.connect(this.analyser[0] || this.analyser);
            if (this.audible) {
                (this.analyser[0] || this.analyser).connect(ctx.destination);
            }
        }
        else {
            this.analyser = [this.analyser[0] || this.analyser];
            this.analyser.push(ctx.createAnalyser());
            this.splitter = ctx.createChannelSplitter(2);
            this.merger = ctx.createChannelMerger(2);
            this.output = this.merger;
            this.source.connect(this.splitter);
            for (let i = 0; i < 2; i++) {
                this.splitter.connect(this.analyser[i], i, 0);
                this.analyser[i].connect(this.merger, 0, i);
            }
            if (this.audible) {
                this.merger.connect(ctx.destination);
            }
        }
    }
}
if (false) {
    /** @type {?} */
    Gondolo.prototype.ctx;
    /** @type {?} */
    Gondolo.prototype.analyser;
    /** @type {?} */
    Gondolo.prototype.stereo;
    /** @type {?} */
    Gondolo.prototype.audible;
    /** @type {?} */
    Gondolo.prototype.wavedata;
    /** @type {?} */
    Gondolo.prototype.freqdata;
    /** @type {?} */
    Gondolo.prototype.splitter;
    /** @type {?} */
    Gondolo.prototype.merger;
    /** @type {?} */
    Gondolo.prototype.source;
    /** @type {?} */
    Gondolo.prototype.output;
}
//# sourceMappingURL=modulo.js.map