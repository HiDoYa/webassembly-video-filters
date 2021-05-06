#define KEEPALIVE extern "C" __attribute__((used))

#include "cpp_scope_helpers.h"

/////// SCOPE GENERATORS ///////
// LUMASCOPE
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

// COLOR LUMASCOPE
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

			RGBtoUV(R, G, B, &U, &V);
			YUVtoRGB(histogramY[h], U, V, &R, &G, &B); 

			index = ((h * width) + w) * 4;

			// set data_out[] (insert U, V -> RGB)
			data_out[index]   = R;
			data_out[index+1] = G;
			data_out[index+2] = B;
			data_out[index+3] = (unsigned char)255;
		}
	}
}

// RGB PARADE
KEEPALIVE void cpp_rgb_parade(char data_in[], char data_out[], int width, int height) {
	int index;					// pixel's index
	int indexR, indexG, indexB;	// pixel's index
	int Yr, Yg, Yb;				// pixel's luminance

	int output_width = width * 3;

	float histogram[1024][3];

	for (int w = 0; w < width; w++) {
		//initialize histogram elements to zero
		for (int h=0; h < height; h++) {
			histogram[h][0] = 0;
			histogram[h][1] = 0;
			histogram[h][2] = 0;
		}
                     
		//find luminance, increment histogram bucket
		for (int h = 0; h < height; h++) {
			index = ((h * width) + w) * 4;
			Yr = (int)(data_in[index]/255.0 * (height-1));
			Yg = (int)(data_in[index+1]/255.0 * (height-1));
			Yb = (int)(data_in[index+2]/255.0 * (height-1));

			histogram[height - Yr - 1][0] += 16.0*256/height;
			histogram[height - Yg - 1][1] += 16.0*256/height;
			histogram[height - Yb - 1][2] += 16.0*256/height;
		}

		//display histogram
		for (int h = 0; h < height; h++) {
			indexR = ((h * output_width) + w) * 4;
			indexG = ((h * output_width) + w + width) * 4;
			indexB = ((h * output_width) + w + 2*width) * 4;

			data_out[indexR+1] = 0; //R
			data_out[indexR+2] = 0;
			data_out[indexG]   = 0; //G
			data_out[indexG+2] = 0;
			data_out[indexB]   = 0; //B
			data_out[indexB+1] = 0;

			data_out[indexR]   = (unsigned char)histogram[h][0];
			data_out[indexG+1] = (unsigned char)histogram[h][1];
			data_out[indexB+2] = (unsigned char)histogram[h][2];

			// set alpha
			data_out[indexR+3] = (unsigned char)255;
			data_out[indexG+3] = (unsigned char)255;
			data_out[indexB+3] = (unsigned char)255;
		}
	}
}

// COLOR VECTORSCOPE
KEEPALIVE void cpp_color_vectorscope(char data_in[], char data_out[], int width, int height) {
	int index;
	int x, y;
	unsigned char R, G, B;
	double U, V;

	for (int w = 0; w < height; w++) {
		for (int h = 0; h < height; h++) {
			index = get_index(w, h, height);

			data_out[index] = 0;
			data_out[index+1] = 0;
			data_out[index+2] = 0;
			data_out[index+3] = (unsigned char)255;
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

			x = normalize(U) * (height -1);					// 0 to scope's height
			y = (height-1) - (normalize(V) * (height -1)); 	// 0 to scope's height


			// calculate resulting pixel brightness
			index = get_index(x, y, height);

			// insert result
			data_out[index] = get_updated_color(data_out[index], R, height, 16);
			data_out[index+1] = get_updated_color(data_out[index+1], G, height, 16);
			data_out[index+2] = get_updated_color(data_out[index+2], B, height, 16);
		}
	}
}

// VECTORSCOPE
KEEPALIVE void cpp_vectorscope(char data_in[], char data_out[], int width, int height) {
	int index;
	int x, y;
	int result;
	unsigned char R, G, B;
	double U, V;

	for (int w = 0; w < height; w++) {
		for (int h = 0; h < height; h++) {
				index = get_index(w, h, height);
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
			x = normalize(U) * (height -1);
			y = (height-1) - (normalize(V) * (height -1));

			// calculate resulting pixel brightness
			index = get_index(x, y, height);

			// insert result
			result = data_out[index+1] + 16.0*256/height;
			if (result > 256) result = 256;

			data_out[index] = 0;
			data_out[index+1] = (char)result;
			data_out[index+2] = 0;
		}
	}
}