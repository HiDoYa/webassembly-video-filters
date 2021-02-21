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
Compilation from Halide code to Webassembly requires a 2 step complation process (AOT compilation).

First, the zmo library must be compiled into a static library. Enter the zmo directory and generate build files with
```
gn gen out/mac
gn gen out/win
```

Next, run the build files usnig
```
ninja -C out/mac
ninja -C out/win
```

Copy the libzmo.a static library that was created in out/{OS}/lib into the web-app directory.

Then, the libzmo.a and the calling C file must be compiled into webassembly using the following command. The scope.h and types.h header files are required from the zmo library.

If there is an error about a missing libclang\_rt.builtins-wasm32.a, the file should be copied over from zmo/extern into the correct directory.

```
clang++ --target=wasm32-unknown-wasi \
--sysroot /path/to/wasi-sysroot \
add.cpp \
-L/path/to/header_files -lzmo \
-Wl,--no-entry -Wl,--export=custom_malloc \
-Wl,--export=test -Wl,--export=get_luminance \
-Wl,--export=custom_free \
-o add.wasm
```

