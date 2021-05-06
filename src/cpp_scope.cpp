#include "cpp_scope_helpers.h"

#define KEEPALIVE extern "C" __attribute__((used))

/////// CONVERSIONS ///////
// convert RGB to luminance scale 0-1 (uses itu bt.709 standard)
double convert_itu_bt709(unsigned char r, unsigned char g, unsigned char b) {
	double luminance = 0.2126*r + 0.7152*g + 0.0722*b; // Y value
	//rerange from 0 -> 1
	luminance = luminance / 255.0;
	return luminance;
}

// convert to luminance scale 0-1 (regardless of R,G,B)
double convert_simple(unsigned char pixel) {
	double luminance = pixel / 255.0;
	return luminance;
}

// source: https://softpixel.com/~cwright/programming/colorspace/yuv/
void RGB_to_Y(unsigned char R, unsigned char G, unsigned char B, double* Y) {
	*Y = (R *  .299000) + (G *  .587000) + (B *  .114000); 	  	// 0 - 255
}

void RGB_to_UV(unsigned char R, unsigned char G, unsigned char B, double* U, double* V) {
	*U = (R * -.168736) + (G * -.331264) + (B *  .500000) + 128; 	// 0 - 255
	*V = (R *  .500000) + (G * -.418688) + (B * -.081312) + 128; 	// 0 - 255
}

void YUVtoRGB(double Y, double U, double V, unsigned char* R, unsigned char* G, unsigned char* B) {
	*R = Y + 1.4075 * (V - 128);
	*G = Y - 0.3455 * (U - 128) - (0.7169 * (V - 128));
	*B = Y + 1.7790 * (U - 128);
}

double normalize(double input) {
	return input / 255.0;
}

int get_index(int x, int y, int width) {
	return ((y * width) + x) * 4;
}

unsigned char get_updated_color(unsigned char pixel_cur, unsigned char pixel_new, int divider, int constant) {
	double result = pixel_cur + (constant * pixel_new / divider);
	if (result > 255) return (char)255;
	return (char)result;

}
/////// SCOPE GENERATORS ///////
// get itu_bt.709 luminance (waveform)
KEEPALIVE void cpp_lumascope(char data_in[], char data_out[], int width, int height) {
	int index;				
	int Y;					
	
	float histogram[1024];

	for (int w = 0; w < width; w++) {
		for (int i=0; i < height; i++) histogram[i] = 0;

		for (int h = 0; h < height; h++) {
			index = ((h * width) + w) * 4;
			
			Y = (int) (height * convert_itu_bt709(data_in[index], 
												data_in[index+1], 
												data_in[index+2]));

			//increment histogram bucket for the luminance we found
			histogram[height-(Y+1)]+=4.0*256/height; // (Y, U, V)
		}

		for (int h = 0; h < height; h++) {
			index = ((h * width) + w) * 4;

			//  display histogram using green pixels (i.e. set r and b to 0)
			data_out[index] = histogram[h];
			data_out[index+1] = histogram[h];
			data_out[index+2] = histogram[h];
			data_out[index+3] = (char)255;
		}
	}
}

// get RGB luminance (waveform)
KEEPALIVE void cpp_color_lumascope(char data_in[], char data_out[], int width, int height) {
	int index, Y_height;

	double Y, U, V;
	unsigned char R, G, B;
	
	float histogramY[1024];	// Y values

	int totalR[1024];
	int totalG[1024];
	int totalB[1024];

	int count[1024];

	for (int w = 0; w < width; w++) {

		// initialize histograms to 0
		for (int h=0; h < height; h++) {
			histogramY[h] = 0;

			totalR[h] = 0;
			totalG[h] = 0;
			totalB[h] = 0;

			count[h] = 0;
		}

		// process data_in[]
		for (int h = 0; h < height; h++) {
			index = ((h * width) + w) * 4;

			// get Y
			RGB_to_Y(data_in[index], data_in[index+1], data_in[index+2], &Y);
			Y_height = normalize(Y) * (height-1); // 0 - (height - 1)

			// increment histogram bucket for the luminance we found (inverted)
			histogramY[height-Y_height-1] += 4 * 256.0/height;

			// sum RGB
			totalR[height-Y_height-1] += data_in[index];
			totalG[height-Y_height-1] += data_in[index+1];
			totalB[height-Y_height-1] += data_in[index+2];

			// counter
			count[height-Y_height-1] += 1;
		}

		// process data_out[]
		for (int h = 0; h < height; h++) {
			if (count[h] == 0) count[h] = 1;

			// average RGB
			R = totalR[h]/count[h];
			G = totalG[h]/count[h];
			B = totalB[h]/count[h];

			RGB_to_UV(R, G, B, &U, &V);			  		// convert average RGB to UV
			YUVtoRGB(histogramY[h], U, V, &R, &G, &B); 	// convert back to RGB with HISTOGRAM Y

			index = ((h * width) + w) * 4;

			// set data_out[] (insert U, V -> RGB)
			data_out[index]   = R;
			data_out[index+1] = G;
			data_out[index+2] = B;
			data_out[index+3] = (char)255;
		}
	}
}

// get seperate RGB luminance (waveform)
KEEPALIVE void cpp_rgb_parade(char data_in[], char data_out[], int width, int height) {
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
			Yr = (int) (convert_simple(data_in[index]) * height);
			Yg = (int) (convert_simple(data_in[index+1]) * height);
			Yb = (int) (convert_simple(data_in[index+2]) * height);

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

			
			data_out[indexR+1] = 0; //R
			data_out[indexR+2] = 0;
			data_out[indexG]   = 0; //G
			data_out[indexG+2] = 0;
			data_out[indexB]   = 0; //B
			data_out[indexB+1] = 0;

			data_out[indexR]   = histogram[h][0];
			data_out[indexG+1] = histogram[h][1];
			data_out[indexB+2] = histogram[h][2];
		}
	}
}

KEEPALIVE void cpp_vectorscope(char data_in[], char data_out[], int width, int height, int scope_height) {
	int index;
	int x, y;
	unsigned char R, G, B;
	double U, V;

	for (int w = 0; w < width; w++) {
		for (int h = 0; h < scope_height; h++) {
				index = get_index(w, h, width);
				data_out[index] = 0;
				data_out[index+1] = 0;
				data_out[index+2] = 0;
				data_out[index+3] = (char)255;
		}
	}

	for (int w = 0; w < width; w++) {
		for (int h = 0; h < height; h++) {
			index = get_index
		(w, h, width);

			R = data_in[index];
			G = data_in[index+1];
			B = data_in[index+2];

			// get UV
			RGB_to_UV(R, G, B, &U, &V);

			// convert UV to XY
			x = normalize(U) * scope_height + 0.5;				// 0 to scope's height
			y = (height-1) - normalize(V) * scope_height + 0.5; // 0 to scope's height

			// calculate resulting pixel brightness
			index = get_index(x, y, scope_height);

			// insert result
			data_out[index] = get_updated_color(data_out[index], R, height, 4);
			data_out[index+1] = get_updated_color(data_out[index+1], G, height, 4);
			data_out[index+2] = get_updated_color(data_out[index+2], B, height, 4);
		}
	}
}