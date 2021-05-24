// BENCHMARK.js
// Time each of the following algorithms
//  * cpp_lumascope()
//  * cpp_color_lumascope()
//  * cpp_vectorscope()
//  * cpp_color_vectorscope()
//  * cpp_rgb_parade()
//  -------------------------------
//  * lumascope()
//  * clumascope()
//  * vectorscope()
//  * cvectorscope()
//  * rgb_parade()
//  -------------------------------
//  * js_lumascope()
//  * js_color_lumascope()
//  * js_vectorscope()
//  * js_color_vectorscope()
//  * js_rgb_parade()

import { js_color_lumascope, js_lumascope, js_rgb_parade, js_color_vectorscope, js_vectorscope } from "./algorithms.ts"

// class WASM() {
//     this.gModule = 0;
// }

// async loadWasm() {
//     const imports = {
//         wasi_snapshot_preview1: {
//             proc_exit: () => { },
//             fd_write: () => { },
//             fd_prestat_get: () => { },
//             fd_prestat_dir_name: () => { },
//             clock_time_get: () => { },
//             poll_oneoff: () => { },
//             sched_yield: () => { },
//             environ_sizes_get: () => { },
//             environ_get: () => { },
//             path_filestat_get: () => { },
//             fd_fdstat_get: () => { },
//             path_open: () => { },
//             path_readlink: () => { },
//             path_filestat_set_times: () => { },
//             path_unlink_file: () => { },
//             path_remove_directory: () => { },
//             path_create_directory: () => { },
//             fd_readdir: () => { },
//             fd_close: () => { },
//             path_symlink: () => { },
//             path_link: () => { },
//             path_rename: () => { },
//             fd_fdstat_set_flags: () => { },
    
//             fd_seek: () => { },
    
//             fd_read: () => { }
//         },
//         env: {
//                 __memory_base: 0,
//                 __table_base: 0,
//                 __indirect_function_table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
//                 __stack_pointer: new WebAssembly.Global({value:'i32', mutable:true}, 0),
//                 memory: new WebAssembly.Memory({initial: 65536}),
//                 STACKTOP: 0
//         }
//     }
    
//         await WebAssembly.instantiateStreaming(fetch('assets/zmo.wasm'), imports).then((obj: any) => {
//         this.gModule = obj;
//         this.gModule.instance.exports.memory.grow(15);
//     }

function benchmark() {
    // init variables
    scopes: any = null;

    let file = 'benchmark_data.txt'
    let results = 'MY RESULTS'

    let HEIGHT = 256;
    let WIDTH = 128;

    // write results to file
    var fs = require('fs');
    

    // initWasm();
    // WebAssembly.instantiateStreaming(fetch('zmo.wasm'), imports).then((obj: any) => {
    // this.gModule = obj;
    // this.gModule.instance.exports.memory.grow(15);

    // create data
    let data_in = initData(WIDTH, HEIGHT);
    let data_out = initData(WIDTH, HEIGHT);

    // timer start
    const start = Date.now();

    for (let i = 0; i < 65556; i++) {
        js_color_lumascope(data_in, data_out, WIDTH, HEIGHT);
    }

    // timer end
    const end = Date.now();

    const elapsed = end - start;

    results = elapsed.toString();

    fs.writeFile(file, results, function(err) {
        if (err) throw err;
        console.log("Results in file: " + file);
    })
    
    // import zmo.wasm
    // run various functions with timer
    // this.gModule.instance.exports.cpp_vectorscope(data_in, data_out, WIDTH, HEIGHT, HEIGHT);
    
    


    
}

function initData(width, height) {
    let data;

    for (let h = 0; h < height; h++) {
        for (let w = 0; w < width; w++) {
            let i = ((h * width) + w) * 4;
            data[i] = Math.floor(Math.random() * 255);
            data[i+1] = Math.floor(Math.random() * 255);
            data[i+2] = Math.floor(Math.random() * 255);
            data[i+3] = 255;
        }
    }
    return data;
}


benchmark();