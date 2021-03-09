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
