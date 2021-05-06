# Webassembly Video Filters

Webassembly is a technology allowing binary instruction format to be run on the browser. We put this to the test using video scopes written in C++ and translated to Webassembly.

## Running the Webserver
To run the website, you must have node and python3 installed. 

The webserver can be started by going to the webapp/ directory and running
```
python3 host.py
```

Next, go to the server/ directory and ensure the dependencies for the backend server are installed by running
```
npm install
```
Run the backend server with
```
node server.js
```

Navigate to localhost:8080 to view the site.

## Webassembly Compilation
### Compilation Pre-Requisites
Compilation into webassembly requires LLVM 11+ to be installed, and LLVM must be built with webassembly enabled.
To check if llvm version is suitable, type `llc --version`

### Compilation Process
Compilation from Halide code to Webassembly requires a 2 step complation process (AOT compilation) which is handled by the gn build.

Enter the project directory and generate build files with
```
gn gen out/{OS}
```

Next, run the build files using
```
ninja -C out/{OS}
```

The webassembly file will be generated in out/{OS}/lib.

If there is an error about a missing libclang\_rt.builtins-wasm32.a, the file should be copied over from zmo/extern into the correct directory.

## Website Compilation and Instructions
### Compilation Pre-Requisites
Compilation of angular requires node and npm to be installed.
After these are installed, navigate to the angular-video-player/ directory and install the dependencies using
```
npm install
```

### Development
Navigate to the angular video player base directory and run the following:
```
ng serve
```

### Compilation Process
Navigate to the angular video player base directory and run the following:
```
ng build
```
The new files can then be served from a webserver (note that zmo.wasm must be located in the assets/ directory of the output).

### Build Process
The web frontend files are in the angular-video-player/ directory and is built into static production files in the output directory. 
The algorithm files are all located in the src/ directory and is built into a webassembly file in the output directory. 

## Adding a New Generator
### Webassembly Changes
Adding a new generator is required to create a new Halide pipeline for a scope.
* Add a new class in src/generator/scope.cpp and register the class name with HALIDE\_REGISTER\_GENERATOR at the bottom of the file. You must also specify the generator name here.
* Edit BUILD.gn andd add the generator name of the scope in the "scopes" list.
* Edit src/scope.h and add a new constant to the enum at the top of the header file.
* Edit src/scope.cpp and add a new header for the generator using the generator name. Then, add the new constant in the select\_scope using the enum constant.
* Edit src/halide_zmo.cpp and use the enums from scope.h to select which generator you want to use.

### Frontend Changes
The new generator simply needs to be called from the frontend.
* In the loadWasm() function in app.component.ts, add the new scope and its function call.

## Running the Chrome Extension from Source
* Navigate to ![chrome://extensions](chrome://extensions) in your chrome browser. 
* Click on `Load Unpacked` and select the chrome-extension folder int he directory.
* Navigate to youtube or vimeo to see the extension in use.