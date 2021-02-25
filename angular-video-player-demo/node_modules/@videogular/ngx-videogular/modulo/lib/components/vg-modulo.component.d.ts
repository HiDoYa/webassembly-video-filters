import { ElementRef } from "@angular/core";
import { ModuloConfig } from '../interfaces/modulo-config.interface';
export declare class VgModuloComponent {
    private _audioAnalyser;
    private _ctx;
    moduloConfig: ModuloConfig;
    audioElement: HTMLAudioElement;
    waveCanvas: ElementRef<HTMLCanvasElement>;
    startVisualizer(): void;
    update(): void;
}
