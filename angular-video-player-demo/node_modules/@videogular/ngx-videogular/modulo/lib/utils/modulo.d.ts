import { FluctusInterface } from '../interfaces/fluctus.interface';
export declare class Gondolo implements FluctusInterface {
    ctx: AudioContext;
    analyser: AnalyserNode | Array<AnalyserNode>;
    stereo: boolean;
    audible: boolean;
    wavedata: Uint8Array | null;
    freqdata: any;
    splitter: ChannelSplitterNode | null;
    merger: ChannelMergerNode | null;
    source: MediaElementAudioSourceNode | MediaStreamAudioSourceNode;
    output: ChannelMergerNode;
    constructor(audio: HTMLAudioElement | AudioNode | MediaStream | MediaElementAudioSourceNode | MediaStreamAudioSourceNode, ctx?: AudioContext | any, opts?: {
        stereo?: boolean;
        audible?: boolean;
    });
    waveform(output?: Uint8Array, channel?: number): Uint8Array;
    frequencies(output?: Uint8Array, channel?: number): Uint8Array;
    private audioConfigStateResolver;
    private audioConfigStateParser;
}
