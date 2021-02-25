# Webassembly Video Filters

## Running the Webserver
The webserver can be started with
```
python3 host.py
```

Navigate to localhost:8080 to view the development site.

## Compilation Pre-Requisites
Compilation into webassembly requires LLVM 11+ to be installed, and LLVM must be built with webassembly enabled.
To check if llvm version is suitable, type `llc --version`

## Compile from Vanilla C to Webassembly
The following command compiles vanilla C (without any libraries) into webassembly.

```
clang --target=wasm32 --no-standard-libraries -Wl,--export-all -Wl,--no-entry -o add.wasm add.c
```

## Compilation Process for Halide to Webassembly
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

If there is an error about a missing libclang\_rt.builtins-wasm32.a, the file should be copied over from zmo/extern into the correct directory.

## Adding a New Generator
Adding a new generator is required to create a new Halide pipeline for a scope.
* Add a new class in src/generator/scope.cpp and register the class name with HALIDE\_REGISTER\_GENERATOR at the bottom of the file. You must also specify the generator name here.
* Edit BUILD.gn andd add the generator name of the scope in the "scopes" list.
* Edit src/scope.h and add a new constant to the enum at the top of the header file.
* Edit src/scope.cpp and add a new header for the generator using the generator name. Then, add the new constant in the select\_scope using the enum constant.
* Edit src/zmo.cpp and use the enums from scope.h to select which generator you want to use.
