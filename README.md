# Webassembly Video Filters

## Running the Webserver
After building, the webserver can be started with
```
python3 host.py
```

Next, start the backend server with
```
node server.js
```

Navigate to localhost:8080 to view the site.

## COMPILATION
### Compilation Pre-Requisites
Compilation into webassembly requires LLVM 11+ to be installed, and LLVM must be built with webassembly enabled.
To check if llvm version is suitable, type `llc --version`

Compilation of the angular frontend portion requires npm and angular to be installed.

### Compile from Vanilla C to Webassembly
The following command compiles vanilla C (without any libraries) into webassembly.

```
clang --target=wasm32 --no-standard-libraries -Wl,--export-all -Wl,--no-entry -o add.wasm add.c
```

### Compilation Process for Halide to Webassembly
Compilation from Halide code to Webassembly requires a 2 step complation process (AOT compilation) which is handled by the gn build.

Enter the project directory and generate build files with
```
gn gen out/mac
gn gen out/win
```

Next, run the build files using
```
ninja -C out/mac
ninja -C out/win
```

The webapp and webassembly will be generated in out/{OS}/lib.

Note: If you made changes to the project and would like to build again, it is best to clean out the output directory, otherwise the build may not be correct.
```
gn clean out/mac
gn clean out/win
```

If there is an error about a missing libclang\_rt.builtins-wasm32.a, the file should be copied over from zmo/extern into the correct directory.

### Compilation Process for Angular
Navigate to the angular video player base directory and run the following:
```
ng build --prod
```
The new files can then be served from a webserver (note that zmo.wasm must be located in the assets/ directory of the output).

### Build Process
The web frontend files are in the angular-video-player/ directory and is built into static production files in the output directory. 
The algorithm files are all located in the src/ directory and is built into a webassembly file in the output directory. 


## DEVELOPMENT
### Adding a New Generator
#### Webassembly Changes
Adding a new generator is required to create a new Halide pipeline for a scope.
* Add a new class in src/generator/scope.cpp and register the class name with HALIDE\_REGISTER\_GENERATOR at the bottom of the file. You must also specify the generator name here.
* Edit BUILD.gn andd add the generator name of the scope in the "scopes" list.
* Edit src/scope.h and add a new constant to the enum at the top of the header file.
* Edit src/scope.cpp and add a new header for the generator using the generator name. Then, add the new constant in the select\_scope using the enum constant.
* Edit src/halide_zmo.cpp and use the enums from scope.h to select which generator you want to use.

#### Frontend Changes
The new generator simply needs to be called from the frontend.
* In the loadWasm() function in app.component.ts, add the new scope and its function call.

### Angular Video Player
The frontend webapp interacts with the node backend app located in angular-video-player/server. Navigate to this folder and start the server with
```
node server.js
```

To open a webpage for development, run
```
ng serve
```
