#include <chrono>
#include <cinttypes>
#include <stdio.h>
#include <stdlib.h>
#include "../cpp_scope_helpers.h"
#include "../cpp_zmo.h"

using namespace std::chrono;

// #define WIDTH 128
// #define HEIGHT 256

int WIDTH = 128;
int HEIGHT = 256;

char* create_data(int width, int height);

int main(void)
{
    typedef high_resolution_clock Time;
    typedef milliseconds ms;
    typedef duration<float> fsec;
    
    // create input and output data
    char* data_in = create_data(WIDTH, HEIGHT);
    char* data_out = create_data(WIDTH, HEIGHT);

    // get start time
    auto t0 = Time::now();

    // operation
    cpp_color_lumascope(data_in, data_out, WIDTH, HEIGHT);

    // get end time
    auto t1 = Time::now();

    // report findings
    fsec fs = t1 - t0;
    ms d = duration_cast<ms>(fs);
    printf("Duration (ms): %" PRId64 "\n", d.count());
}

char* init_data(int width, int height) {
    int index;

    // initialize data
    char* data = (char*)malloc(width * height * 4 * sizeof(char));

    // populate data with random values
    for (int w = 0; w < width; w++) {
        for (int h = 0; h < height; h++) {
            index = get_index(w, h, height);
            data[index] = (char)(rand() % 256);
        }
    }

    return data;
}