//
// Helper functions for the cpp scopes (cpp_zmo)
//

/////// CONVERSIONS ///////
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