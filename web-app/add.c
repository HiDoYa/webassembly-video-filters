// EXPORTED FNS
// convert RGB to luminance (uses itu bt.709 standard)
unsigned char convert_itu_bt709(int height, unsigned char r, unsigned char g, unsigned char b) {
	float luminance = 0.2126*r + 0.7152*g + 0.0722*b;

	//rerange from 0 -> height

	luminance = luminance * height / 256.0;

	if (luminance > (height - 1)) return height - 1;

	return (unsigned char)luminance;
}

// FUNCTIONS TO COMMUNICATE B/W WASM AND JS
extern unsigned char __heap_base;
unsigned int bump_pointer = &__heap_base;
void* custom_malloc(int n) {
	unsigned int r = bump_pointer;
	bump_pointer += n;
	return (void *)r;
}
void custom_free(void* p, int n) {
	bump_pointer -= n;
}

// get array of average luminance of each column
void get_luminance(char data[], int width, int height) {
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

