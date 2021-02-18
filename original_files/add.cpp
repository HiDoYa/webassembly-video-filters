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
extern "C" EMSCRIPTEN_KEEPALIVE void get_luminance(char data[], int width, int height) {
	int index;				// pixel's index
	int Y;					// pixel's luminance
	int Y_col;				// column's luminance

	//  can we use custom_malloc here to only use the memory we need (height bytes)
	unsigned char histogram[1024];

	for (int w = 0; w < width; w++) {
		//initialize histogram elements to zero
		for (int i=0; i < height; i++) histogram[i] = 0;

		for (int h = 0; h < height; h++) {
			index = ((h * width) + w) * 4;
			Y = convert_itu_bt709(height, data[index], 
								  data[index+1], 
								  data[index+2]);

			//increment histogram bucket for the luminance we found
			histogram[Y]+=4*256/height;
		}


		for (int h = 0; h < height; h++) {
			index = ((h * width) + w) * 4;

			//  display histogram using green pixels (i.e. set r and b to 0)
			data[index] = 0;
			data[index+1] = histogram[h];
			data[index+2] = 0;
		}
	}
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
