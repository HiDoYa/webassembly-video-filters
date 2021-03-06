#include "scope.h"
#define KEEPALIVE __attribute__((used))

int main() { return 0; }

// get array of average luminance of each column
extern "C" KEEPALIVE void lumascope(unsigned char data[], unsigned char data2[],int width, int height) {
	const int selector = ZMO::LUMASCOPE;
	ZMO::Region<int32_t> r(width,height);
	ZMO::Scope_u8_C4(selector, data, width * 4, data2, width * 4, r);
}

extern "C" KEEPALIVE void rgbparade(unsigned char data[], unsigned char data2[], int width, int height) {
	const int selector = ZMO::RGBPARADE;
	ZMO::Region<int32_t> r(width,height);
	ZMO::Scope_u8_C4(selector, data, width * 4, data2, width * 4 * 3, r);
}

// FUNCTIONS TO COMMUNICATE B/W WASM AND JS
extern unsigned char __heap_base;
unsigned char *bump_pointer = &__heap_base;
extern "C" KEEPALIVE void* custom_malloc(int n) {
	unsigned char *r = bump_pointer;
	bump_pointer += n;
	return (void *)r;
}
extern "C" KEEPALIVE void custom_free(void* p, int n) {
	bump_pointer -= n;
}
