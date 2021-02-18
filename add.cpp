#include "scope.h"
//#include <emscripten.h>

#define EMSCRIPTEN_KEEPALIVE __attribute__((used))

int main()
{
	return 0;
}

// EXPORTED FNS
// convert RGB to luminance (uses itu bt.709 standard)
unsigned char convert_itu_bt709(int height, unsigned char r, unsigned char g, unsigned char b) {
	float luminance = 0.2126*r + 0.7152*g + 0.0722*b;

	//rerange from 0 -> height

	luminance = luminance * height / 256.0;

	if (luminance > (height - 1)) return height - 1;

	return (unsigned char)luminance;
}

extern "C" int EMSCRIPTEN_KEEPALIVE test(){
	unsigned char histogram[1024];

	histogram[3] = 11;
	unsigned char histogram2[1024];
	histogram2[3] = 22;

    Telestream::ZMO::Region<int32_t> r(10,10);

	Telestream::ZMO::Scope_u8_C1(histogram, 10, histogram2, 10, r);

	return histogram2[3];
}
// get array of average luminance of each column
extern "C" EMSCRIPTEN_KEEPALIVE void get_luminance(unsigned char data[], unsigned char data2[],int width, int height) {
	
	Telestream::ZMO::Region<int32_t> r(width*4,height*4);
	Telestream::ZMO::Scope_u8_C1
	(data, width, data2, width, r);
	
}

// FUNCTIONS TO COMMUNICATE B/W WASM AND JS
extern unsigned char __heap_base;
unsigned char *bump_pointer = &__heap_base;
extern "C" EMSCRIPTEN_KEEPALIVE void* custom_malloc(int n) {
	unsigned char *r = bump_pointer;
	bump_pointer += n;
	return (void *)r;
}
extern "C"  EMSCRIPTEN_KEEPALIVE void custom_free(void* p, int n) {
	bump_pointer -= n;
}
