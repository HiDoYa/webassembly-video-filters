//Halide luminence
#include "Halide.h"
using namespace Halide;

unsigned char convert_itu_bt709(int height, unsigned char r, unsigned char g, unsigned char b) {
	float luminance = 0.2126*r + 0.7152*g + 0.0722*b;

	//rerange from 0 -> height

	luminance = luminance * height / 256.0;

	if (luminance > (height - 1)) return height - 1;

	return (unsigned char)luminance;
}

void get_luminance(uint8_t data[], int width, int height) {
	Halide::Buffer input = { 0 }; 
	//input.host = (uint8_t *)&data[0]; // Often, can be just "(uint8_t *)data"
    input.host = &data[0];
	Var x("x"), y("y"), c("c");
	int index;				// pixel's index
	int Y;					// pixel's luminance
	int Y_col;				// column's luminance
	input.extent[0] = width; // In elements, not bytes
	input.extent[1] = height;
	//  can we use custom_malloc here to only use the memory we need (height bytes)
	unsigned char histogram[1024];

	Halide::ImageParam img(Halide::type_of<uint8_t>(), 3);
	Halide::Func luma;
	luma(c) = Halide::pow(img(x,y,c), 2.f);

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

