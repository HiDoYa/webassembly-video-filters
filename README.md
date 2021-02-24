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
