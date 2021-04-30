#define KEEPALIVE extern "C" __attribute__((used))

#include "cpp_scope_helpers.h"

//
// Helper functions for the cpp scopes
//

/////// CONVERSIONS ///////

//
// assigns Y given R,G,B
// Source: https://softpixel.com/~cwright/programming/colorspace/yuv/
//
void RGBtoY(unsigned char R, unsigned char G, unsigned char B, double* Y) {
	*Y = (R *  .299000) + (G *  .587000) + (B *  .114000); 	  	// 0 - 255
}

//
// assigns U,V given R,G,B
//
void RGBtoUV(unsigned char R, unsigned char G, unsigned char B, double* U, double* V) {
	*U = (R * -.168736) + (G * -.331264) + (B *  .500000) + 128; 	// 0 - 255
	*V = (R *  .500000) + (G * -.418688) + (B * -.081312) + 128; 	// 0 - 255
}

//
// assigns R,G,B given U,V
//
void YUVtoRGB(double Y, double U, double V, unsigned char* R, unsigned char* G, unsigned char* B) {
	*R = Y + 1.4075 * (V - 128);
	*G = Y - 0.3455 * (U - 128) - (0.7169 * (V - 128));
	*B = Y + 1.7790 * (U - 128);
}


/////// MISC HELPERS ///////
//
// normalize input (0-255) to output (0-1)
//
double normalize(unsigned char pixel) {
	return (double)pixel / 255.0;
}

//
// return index of array from x,y coordinates
//
int get_index(int x, int y, int width) {
	return ((y * width) + x) * 4;
}

//
// updates & saturates a pixel value
/// @param pixel_cur    current pixel value
/// @param pixel_new    new pixel's value to add to current
/// @param divider      the denominator of the pixel change
/// @param constant     the multiplier of the pixel change
//
unsigned char get_updated_color(unsigned char pixel_cur, unsigned char pixel_new, int divider, int constant) {
	double result = pixel_cur + (constant * pixel_new / divider);
	if (result > 255) return (char)255;
	return (char)result;
}

/////// SCOPE GENERATORS ///////
// get itu_bt.709 luminance (waveform)
KEEPALIVE void cpp_lumascope(char data_in[], char data_out[], int width, int height) {
	int index;				
	double Y;
	int Y_height;
	
	float histogram[1024];

	for (int w = 0; w < width; w++) {
		for (int i=0; i < height; i++) histogram[i] = 0;

		for (int h = 0; h < height; h++) {
			index = ((h * width) + w) * 4;
			
			RGBtoY(data_in[index], data_in[index+1], data_in[index+2], &Y);
			Y_height = normalize(Y) * (height - 1);

			//increment histogram bucket for the luminance we found
			histogram[height-Y_height-1] += 16.0*256/height; // (Y, U, V)
			if (histogram[height-Y_height-1] > 255) histogram[height-Y_height-1] = 255;
		}

		for (int h = 0; h < height; h++) {
			index = ((h * width) + w) * 4;

			//  display histogram using green pixels (i.e. set r and b to 0)
			data_out[index] = 0;
			data_out[index+1] = histogram[h];
			data_out[index+2] = 0;

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
			RGBtoY(data_in[index], data_in[index+1], data_in[index+2], &Y);
			Y_height = normalize(Y) * (height-1); // 0 - (height - 1)

			// increment histogram bucket for the luminance we found (inverted)
			histogramY[height-Y_height-1] += 16.0*256/height;

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

			if (R > 255) R = 255;
			if (G > 255) G = 255;
			if (B > 255) B = 255;

			RGBtoUV(R, G, B, &U, &V);			  		// convert average RGB to UV
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

// get seperate RGB luminance (waveform), output is 3 * width
KEEPALIVE void cpp_rgb_parade(char data_in[], char data_out[], int width, int height) {
	int index;					// pixel's index
	int indexR, indexG, indexB;	// pixel's index
	int Yr, Yg, Yb;				// pixel's luminance

	int w_r, w_g, w_b;

	// unsigned char histogram[1024][3];
	float histogram[1024][3];

	for (int w = 0; w < width; w++) {
		//initialize histogram elements to zero
		for (int i=0; i < height; i++) {
			histogram[i][0] = 0;
			histogram[i][1] = 0;
			histogram[i][2] = 0;
		}

		//find luminance, increment histogram bucket
		for (int h = 0; h < height; h++) {
			index = (h * (width + w)) * 4;
			Yr = (int) (data_in[index]/255.0) * height;
			Yg = (int) (data_in[index+1]/255.0) * height;
			Yb = (int) (data_in[index+2]/255.0) * height;

			histogram[height - Yr - 1][0] += 16.0*256/height;
			histogram[height - Yg - 1][1] += 16.0*256/height;
			histogram[height - Yb - 1][2] += 16.0*256/height;

			if (histogram[height - Yr - 1][0] > 255) histogram[height - Yr - 1][0] = 255;
			if (histogram[height - Yg - 1][1] > 255) histogram[height - Yg - 1][1] = 255;
			if (histogram[height - Yb - 1][2] > 255) histogram[height - Yb - 1][2] = 255;
		}

		w_r = w;
		w_g = w + width;
		w_b = w + (2 * width);

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

			// data_out[indexR]   = histogram[h][0];
			// data_out[indexG+1] = histogram[h][1];
			// data_out[indexB+2] = histogram[h][2];

			data_out[indexR]   = (char)255;
			data_out[indexG+1] = (char)255;
			data_out[indexB+2] = (char)255;

			// set alpha
			data_out[indexR+3] = (char)255;
			data_out[indexG+3] = (char)255;
			data_out[indexB+3] = (char)255;
		}
	}
}

// // get seperate RGB luminance (waveform)
// KEEPALIVE void cpp_rgb_parade(char data_in[], char data_out[], int width, int height) {
// 		int index;				// pixel's index
// 	int indexR, indexG, indexB;	// pixel's index
// 	int Yr, Yg, Yb;				// pixel's luminance

// 	// int channel_width = width / 3;
// 	int channel_width = width;
// 	int w_r, w_g, w_b;

// 	// unsigned char histogram[1024][3];
// 	float histogram[1024][3];

// 	for (int w = 0; w <= channel_width; w++) {
// 		if (w * 3 >= width) {
// 				break;
// 		}

// 		//initialize histogram elements to zero
// 		for (int i=0; i < height; i++) {
// 			histogram[i][0] = 0;
// 			histogram[i][1] = 0;
// 			histogram[i][2] = 0;
// 		}
// 		//find luminance, increment histogram bucket
// 		for (int h = 0; h < height; h++) {
// 			index = ((h * width) + (w * 3)) * 4;
// 			Yr = (int) (data_in[index]/255.0) * height;
// 			Yg = (int) (data_in[index+1]/255.0) * height;
// 			Yb = (int) (data_in[index+2]/255.0) * height;

// 			histogram[height - (Yr+1)][0] += 16.0*256/height;
// 			histogram[height - (Yg+1)][1] += 16.0*256/height;
// 			histogram[height - (Yb+1)][2] += 16.0*256/height;
// 		}

// 		w_r = w;
// 		w_g = w + channel_width;
// 		w_b = w + (2 * channel_width);

// 		//display histogram
// 		for (int h = 0; h < height; h++) {
// 			indexR = ((h * width) + w_r) * 4;
// 			indexG = ((h * width) + w_g) * 4;
// 			indexB = ((h * width) + w_b) * 4;

			
// 			data_out[indexR+1] = 0; //R
// 			data_out[indexR+2] = 0;
// 			data_out[indexG]   = 0; //G
// 			data_out[indexG+2] = 0;
// 			data_out[indexB]   = 0; //B
// 			data_out[indexB+1] = 0;

// 			// data_out[indexR]   = histogram[h][0];
// 			// data_out[indexG+1] = histogram[h][1];
// 			// data_out[indexB+2] = histogram[h][2];
// 			data_out[indexR]   = (char)255;
// 			data_out[indexG+1] = (char)255;
// 			data_out[indexB+2] = (char)255;
// 		}
// 	}
// }

KEEPALIVE void cpp_color_vectorscope(char data_in[], char data_out[], int width, int height, int scope_height) {
	int index;
	int x, y;
	unsigned char R, G, B;
	double U, V;

	for (int w = 0; w < scope_height; w++) {
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
			index = get_index(w, h, width);

			R = data_in[index];
			G = data_in[index+1];
			B = data_in[index+2];

			// get UV
			RGBtoUV(R, G, B, &U, &V);

			// convert UV to XY
			x = normalize(U) * scope_height + 0.5;				// 0 to scope's height
			y = (height-1) - normalize(V) * scope_height + 0.5; // 0 to scope's height

			// calculate resulting pixel brightness
			index = get_index(x, y, scope_height);

			// insert result
			data_out[index] = get_updated_color(data_out[index], R, height, 16);
			data_out[index+1] = get_updated_color(data_out[index+1], G, height, 16);
			data_out[index+2] = get_updated_color(data_out[index+2], B, height, 16);
		}
	}
}

KEEPALIVE void cpp_vectorscope(char data_in[], char data_out[], int width, int height, int scope_height) {
	int index;
	int x, y;
	int result;
	unsigned char R, G, B;
	double U, V;

	for (int w = 0; w < scope_height; w++) {
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
			index = get_index(w, h, width);

			R = data_in[index];
			G = data_in[index+1];
			B = data_in[index+2];

			// get UV
			RGBtoUV(R, G, B, &U, &V);

			// convert UV to XY
			x = normalize(U) * scope_height + 0.5;				// 0 to scope's height
			y = (height-1) - normalize(V) * scope_height + 0.5; // 0 to scope's height

			// calculate resulting pixel brightness
			index = get_index(x, y, scope_height);

			// insert result
			result = data_out[index+1] + 16.0*256/scope_height;
			if (result > 256) result = 256;

			data_out[index] = 0;
			data_out[index+1] = (char)result;
			data_out[index+2] = 0;
		}
	}
}