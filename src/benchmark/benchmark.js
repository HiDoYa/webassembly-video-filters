// Name: benchmark.js
// Instructions: node benchmark.js
// Goal: Time each of the following algorithms
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

const js_scopes = require('./assets/algorithms.js');

// GLOBAL VARIABLES
var scopes = [];

// CLASSES
class ScopeDescriptor {
    name = '';
    func = null;
    time = 0;
    width = 0;
    height = 0;
  
    constructor(name, func, width, height) {
      this.name = name;
      this.func = func;
      this.width = width;
      this.height = height;
      this.time = -1;
    }

    setTime(time) {
        this.time = time;
    }
}

async function benchmark(width, height) {
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
        console.log("Starting benchmarks...\n");

        scopes = new Array (
            new ScopeDescriptor("Lumascope", gModule.instance.exports.lumascope, width, height),
            new ScopeDescriptor("Lumascope (Color)", gModule.instance.exports.clumascope, width, height),
            new ScopeDescriptor("RGB Parade", gModule.instance.exports.rgbparade, width * 3, height),
            new ScopeDescriptor("Vector Scope", gModule.instance.exports.vectorscope, height, height),
            new ScopeDescriptor("Vector Scope (Color)", gModule.instance.exports.cvectorscope, height, height),
            
            new ScopeDescriptor("C++ Lumascope", gModule.instance.exports.cpp_lumascope, width, height),
            new ScopeDescriptor("C++ Lumascope (Color)", gModule.instance.exports.cpp_color_lumascope, width, height),
            new ScopeDescriptor("C++ RGB Parade", gModule.instance.exports.cpp_rgb_parade, width * 3, height),
            new ScopeDescriptor("C++ Vector Scope", gModule.instance.exports.cpp_vectorscope, height, height),
            new ScopeDescriptor("C++ Vector Scope (Color)", gModule.instance.exports.cpp_color_vectorscope, height, height),
    
            new ScopeDescriptor("JS Lumascope", js_scopes.js_lumascope, width, height),
            new ScopeDescriptor("JS Color Lumascope", js_scopes.js_color_lumascope, width, height),
            // new ScopeDescriptor("JS RGB Parade", js_scopes.js_rgb_parade, width * 3, height),
            new ScopeDescriptor("JS Vector Scope (Color)", js_scopes.js_color_vectorscope, height, height),
            new ScopeDescriptor("JS Vector Scope", js_scopes.js_vectorscope, height, height),
        );

        // BENCHMARK TESTS
        for (const scope of scopes) {
            
            // allocate memory (INPUT)
            let inputPointer = gModule.instance.exports.malloc(width * height * 4);;
            let inputData = new Uint8Array(
                gModule.instance.exports.memory.buffer,
                inputPointer,
                width * height * 4
            );

            // allocate memory (OUTPUT)
            let outputPointer = gModule.instance.exports.malloc(scope.width * scope.height * 4);;
            let outputData = new Uint8Array(
                gModule.instance.exports.memory.buffer,
                outputPointer,
                scope.width * scope.height * 4
            );

            var t;
            if (scope.name.includes("JS")) {
                inputData = new Array(width * height * 4);
                outputData = new Array(scope.width * scope.height * 4);
                t = timer(scope, inputData, outputData, width, height);
            } else {
                t = timer(scope, inputPointer, outputPointer, width, height);
            }

            // time scope
            scope.setTime(t);

            // free memory
            gModule.instance.exports.free(this.inputPointer);
            gModule.instance.exports.free(this.outputPointer);
        }

        // gather results and  write to file
        let file = 'benchmark_data.json'
        let results = JSON.stringify(scopes, null, 2);
        fs.writeFile(file, results, function(err) {
            if (err) throw err;
            console.log("\nBenchmarks complete.\nResults in \'" + file + "\'");
        })
    });
}

function timer(scope, data_in, data_out, width, height) {
    var iterations = 1000;
    var time = 0;

    console.log("Timing \'" + scope.name + "\'...");
    
    for (let i = 0; i < iterations; i++) {
        const start = Date.now();
        scope.func(data_in, data_out, width, height);
        const end = Date.now();

        time += (end - start);
    }

    return time/iterations;
}

// MAIN
function main() {
    let width = 128;
    let height = 256;

    benchmark(width, height);
}

main();