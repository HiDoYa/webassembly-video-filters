//
// Helper functions for the cpp scopes
//

/////// CONVERSIONS ///////

//
// assigns Y given R,G,B
// Source: https://softpixel.com/~cwright/programming/colorspace/yuv/
//
void RGBtoY(unsigned char R, unsigned char G, unsigned char B, double* Y);

//
// assigns U,V given R,G,B
//
void RGBtoUV(unsigned char R, unsigned char G, unsigned char B, double* U, double* V);

//
// assigns R,G,B given U,V
//
void YUVtoRGB(double Y, double U, double V, unsigned char* R, unsigned char* G, unsigned char* B);

/////// MISC HELPERS ///////
//
// normalize input (0-255) to output (0-1)
//
double normalize(unsigned char pixel);

//
// return index of array from x,y coordinates
//
int get_index(int x, int y, int width);

//
// updates & saturates a pixel value
/// @param pixel_cur    current pixel value
/// @param pixel_new    new pixel's value to add to current
/// @param divider      the denominator of the pixel change
/// @param constant     the multiplier of the pixel change
//
unsigned char get_updated_color(unsigned char pixel_cur, unsigned char pixel_new, int divider, int constant);


// //
// // convert RGB to luminance scale 0-1 (uses itu bt.709 standard)
// //
// double convert_itu_bt709(unsigned char r, unsigned char g, unsigned char b) {
// 	double luminance = 0.2126*r + 0.7152*g + 0.0722*b; // Y value
// 	//rerange from 0 -> 1
// 	luminance = luminance / 255.0;
// 	return luminance;
// }