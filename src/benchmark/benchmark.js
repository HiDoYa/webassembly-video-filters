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

// import { js_color_lumascope, js_lumascope, js_rgb_parade, js_color_vectorscope, js_vectorscope } from "./assets/algorithms"

// var js_scopes = require('./assets/algorithms.ts');


// GLOBAL VARIABLES
var scopes = [];

// CLASSES
class ScopeDescriptor {
    name = '';
    func = null;
    time = 0;
  
    constructor(name, func) {
      this.name = name;
      this.func = func;
      this.time = -1;
    }

    setTime(time) {
        this.time = time;
    }
}

// LOCAL FUNCTIONS
async function benchmark(data_in, data_out, width, height) {
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
    }

    const fs = require('fs');
    await WebAssembly.instantiate(new Uint8Array(fs.readFileSync('./assets/zmo.wasm')), imports).then((obj) => {
        var gModule = obj;
        gModule.instance.exports.memory.grow(15);
        console.log("init gModule");
        console.log(gModule);

        scopes = new Array (
            new ScopeDescriptor("Lumascope", gModule.instance.exports.lumascope),
            new ScopeDescriptor("Lumascope (Color)", gModule.instance.exports.clumascope),
            // new ScopeDescriptor("RGB Parade", gModule.instance.exports.rgbparade),
            // new ScopeDescriptor("Vector Scope", gModule.instance.exports.vectorscope),
            // new ScopeDescriptor("Vector Scope (Color)", gModule.instance.exports.cvectorscope),
            
            new ScopeDescriptor("C++ Lumascope", gModule.instance.exports.cpp_lumascope),
            new ScopeDescriptor("C++ Lumascope (Color)", gModule.instance.exports.cpp_color_lumascope),
            // new ScopeDescriptor("C++ RGB Parade", gModule.instance.exports.cpp_rgb_parade),
            // new ScopeDescriptor("C++ Vector Scope", gModule.instance.exports.cpp_vectorscope),
            // new ScopeDescriptor("C++ Vector Scope (Color)", gModule.instance.exports.cpp_color_vectorscope),
    
            // JS_LUMASCOPE: new ScopeDescriptor("JS Lumascope", js_scopes.js_lumascope),
            // JS_COLOR_LUMASCOPE: new ScopeDescriptor("JS Color Lumascope", js_scopes.js_color_lumascope),
            // JS_RGB_PARADE: new ScopeDescriptor("JS RGB Parade", js_scopes.js_rgb_parade),
            // JS_VECTORSCOPE: new ScopeDescriptor("JS Vector Scope (Color)", js_scopes.js_color_vectorscope),
            // JS_COLOR_VECTORSCOPE: new ScopeDescriptor("JS Vector Scope", js_scopes.js_vectorscope),
        );

        // BENCHMARK TESTS
        for (const scope of scopes) {
            t = timer(scope, data_in, data_out, width, height);
            scope.setTime(t);
        }

        for (const scope of scopes) {
            console.log(scope);
        }

    });
}

function timer(scope, data_in, data_out, width, height) {
    console.log("Timing \'" + scope.name + "\'...");
    var time = 0;

    for (let i = 0; i < 3; i++) {
        const start = Date.now();
        scope.func(data_in, data_out, width, height);
        const end = Date.now();

        time += (end - start);
    }

    return time;
}

function initData(width, height) {
    let data = new Array(width * height * 4);

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

// MAIN
function main() {
    // init variables
    let file = 'benchmark_data.txt'
    let results = 'RESULTS GO HERE'

    let width = 128;
    let height = 256;

    var data_in = initData(width, height);
    var data_out = initData(width, height);

    benchmark(data_in, data_out, width, height);

    const fs = require('fs');
    fs.writeFile(file, results, function(err) {
        if (err) throw err;
        console.log("Benchmarks complete.\nResults in file: " + file);
    })
}

main();