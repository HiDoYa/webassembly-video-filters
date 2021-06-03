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

void convertY(unsigned char pixel, int* result, int height) {
	float tmp = (pixel / 255.0) * (height - 1);
	*result = (int)tmp;
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