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

extern "C" KEEPALIVE void vectorscope(unsigned char data[], unsigned char data2[], int width, int height) {
	const int selector = ZMO::RGBPARADE;
	ZMO::Region<int32_t> r(width,height);
	ZMO::Scope_u8_C4(selector, data, width * 4, data2, 256 * 3, r);
}

