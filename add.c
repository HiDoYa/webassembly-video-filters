// EXPORTED FNS
int add(int a, int b) {
	return a * a + b;
}

void bulkAdd(char data[], int b, int length) {
	// 4 for color channels (RGBA)
	for (int i = 0; i < length; i+=4) {
		data[i + 0] = add(data[i + 0], b);
		data[i + 1] = add(data[i + 1], b);
		data[i + 2] = add(data[i + 2], b);
	}
}

// FUNCTIONS TO COMMUNICATE B/W WASM AND JS
extern unsigned char __heap_base;
unsigned int bump_pointer = &__heap_base;
void* malloc(int n) {
	unsigned int r = bump_pointer;
	bump_pointer += n;
	return (void *)r;
}
void free(void* p, int n) {
	bump_pointer -= n;
}

