#include "scope.h"
//#include <emscripten.h>

#define EMSCRIPTEN_KEEPALIVE __attribute__((used))

int main() {
	return 0;
}

// get array of average luminance of each column
extern "C" EMSCRIPTEN_KEEPALIVE void get_luminance(unsigned char data[], unsigned char data2[],int width, int height) {
	Telestream::ZMO::Region<int32_t> r(width,height);
	Telestream::ZMO::Scope_u8_C4(data, width * 4, data2, width * 4, r);
}

// FUNCTIONS TO COMMUNICATE B/W WASM AND JS
extern unsigned char __heap_base;
unsigned char *bump_pointer = &__heap_base;
extern "C" EMSCRIPTEN_KEEPALIVE void* custom_malloc(int n) {
	unsigned char *r = bump_pointer;
	bump_pointer += n;
	return (void *)r;
}
extern "C" EMSCRIPTEN_KEEPALIVE void custom_free(void* p, int n) {
	bump_pointer -= n;
}
