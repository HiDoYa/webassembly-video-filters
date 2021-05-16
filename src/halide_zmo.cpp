#include "scope.h"
#define KEEPALIVE extern "C" __attribute__((used))

int main() { return 0; }

KEEPALIVE void lumascope(unsigned char data[], unsigned char data2[],int width, int height) {
	const int selector = ZMO::LUMASCOPE;
	ZMO::Region<int32_t> r(width,height);
	ZMO::Scope_u8_C4(selector, data, width * 4, data2, width * 4, r);
}

KEEPALIVE void rgbparade(unsigned char data[], unsigned char data2[], int width, int height) {
	const int selector = ZMO::RGBPARADE;
	ZMO::Region<int32_t> r(width,height);
	ZMO::Scope_u8_C4(selector, data, width * 4, data2, width * 4 * 3, r);
}

KEEPALIVE void vectorscope(unsigned char data[], unsigned char data2[], int width, int height) {
	const int selector = ZMO::VECTORSCOPE;
	ZMO::Region<int32_t> r(width,height);
	ZMO::Scope_u8_C4(selector, data, width * 4, data2, 256 * 4, r);
}

KEEPALIVE void cvectorscope(unsigned char data[], unsigned char data2[], int width, int height) {
	const int selector = ZMO::CVECTORSCOPE;
	ZMO::Region<int32_t> r(width,height);
	ZMO::Scope_u8_C4(selector, data, width * 4, data2, 256 * 4, r);
}

KEEPALIVE void clumascope(unsigned char data[], unsigned char data2[],int width, int height) {
	const int selector = ZMO::CLUMASCOPE;
	ZMO::Region<int32_t> r(width,height);
	ZMO::Scope_u8_C4(selector, data, width * 4, data2, width * 4, r);
}
