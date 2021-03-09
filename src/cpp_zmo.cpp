#define KEEPALIVE extern "C" __attribute__((used))

/////// CONVERSIONS ///////
// convert RGB to luminance scale 0-1 (uses itu bt.709 standard)
double convert_itu_bt709(unsigned char r, unsigned char g, unsigned char b) {
	double luminance = 0.2126*r + 0.7152*g + 0.0722*b;

	//rerange from 0 -> 1
	luminance = luminance / 255.0;
	return luminance;
}

// convert to luminance scale 0-1 (regardless of R,G,B)
double convert_simple(unsigned char pixel) {
	double luminance = pixel / 255.0;
	return luminance;
}

// convert 0-1 double to 0-height int
int convert_height(double x, int height) {
	return x * height;
}

/////// SCOPE GENERATORS ///////
// get itu_bt.709 luminance (waveform)
KEEPALIVE void cpp_lumascope(char data[], int width, int height) {
	int index;				// pixel's index
	int Y;					// pixel's luminance

	// float histogram[height];
	// float* histogram = custom_malloc((int)sizeof(float) * height);
	float histogram[1024];
	// float* histogram = malloc(sizeof(float) * height);

	for (int w = 0; w < width; w++) {
		//initialize histogram elements to zero
		for (int i=0; i < height; i++) histogram[i] = 0;

		for (int h = 0; h < height; h++) {
			index = ((h * width) + w) * 4;
			Y = (int) (height * convert_itu_bt709(data[index],
												data[index+1],
												data[index+2]));

			//increment histogram bucket for the luminance we found
			histogram[height-(Y+1)]+=4.0*256/height;
		}

		for (int h = 0; h < height; h++) {
			index = ((h * width) + w) * 4;

			//  display histogram using green pixels (i.e. set r and b to 0)
			data[index] = 0;
			data[index+1] = histogram[h];
			data[index+2] = 0;
		}
	}
	// custom_free(histogram, sizeof(float)*height);
}

// get RGB luminance (waveform)
KEEPALIVE void cpp_color_lumascope(char data[], int width, int height) {
	int index;				// pixel's index
	int Yr, Yg;			// pixel's luminance (rgb)

	// unsigned char histogram[1024][3];
	float histogramR[1024];
	float histogramG[1024];
	// float histogramB[1024];

	for (int w = 0; w < width; w++) {
		//initialize histogram elements to zero
		for (int i=0; i < height; i++) {
			histogramR[i] = 0; // r
			histogramG[i] = 0; // g
			// histogramB[i] = 0; // b
		}

		for (int h = 0; h < height; h++) {
			index = ((h * width) + w) * 4;
			Yr = (int) (convert_simple(data[index]) * height);
			Yg = (int) (convert_simple(data[index+1]) * height);
			// Yb = (int) (convert_simple(data[index+2]) * height);

			//increment histogram bucket for the luminance(s) we found
			histogramR[height - (Yr+1)] += 4.0*256/height;
			histogramG[height - (Yg+1)] += 4.0*256/height;
			// histogramB[height - (Yb+1)] += 4.0*256/height;
		}

		for (int h = 0; h < height; h++) {
			index = ((h * width) + w) * 4;
			//  display histogram using rgb
			data[index] = histogramR[h]; // r
			data[index+1] = histogramG[h]; // g
			data[index+2] = 0;
			// data[index+2] = histogramB[h]; // b
		}
	}
}

// get seperate RGB luminance (waveform)
KEEPALIVE void cpp_rgb_parade(char data[], int width, int height) {
	int index;					// pixel's index
	int indexR, indexG, indexB;	// pixel's index
	int Yr, Yg, Yb;				// pixel's luminance

	int channel_width = width / 3;
	int w_r, w_g, w_b;

	// unsigned char histogram[1024][3];
	float histogram[1024][3];

	for (int w = 0; w <= channel_width; w++) {
		if (w * 3 >= width) {
				break;
		}

		//initialize histogram elements to zero
		for (int i=0; i < height; i++) {
			histogram[i][0] = 0;
			histogram[i][1] = 0;
			histogram[i][2] = 0;
		}
		//find luminance, increment histogram bucket
		for (int h = 0; h < height; h++) {
			index = ((h * width) + (w * 3)) * 4;
			Yr = (int) (convert_simple(data[index]) * height);
			Yg = (int) (convert_simple(data[index+1]) * height);
			Yb = (int) (convert_simple(data[index+2]) * height);

			histogram[height - (Yr+1)][0] += 4.0*256/height;
			histogram[height - (Yg+1)][1] += 4.0*256/height;
			histogram[height - (Yb+1)][2] += 4.0*256/height;
		}

		w_r = w;
		w_g = w + channel_width;
		w_b = w + (2 * channel_width);

		//display histogram
		for (int h = 0; h < height; h++) {
			indexR = ((h * width) + w_r) * 4;
			indexG = ((h * width) + w_g) * 4;
			indexB = ((h * width) + w_b) * 4;


			data[indexR+1] = 0; //R
			data[indexR+2] = 0;
			data[indexG]   = 0; //G
			data[indexG+2] = 0;
			data[indexB]   = 0; //B
			data[indexB+1] = 0;

			data[indexR]   = histogram[h][0];
			data[indexG+1] = histogram[h][1];
			data[indexB+2] = histogram[h][2];
		}
	}
}
