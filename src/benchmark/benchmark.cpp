#include <chrono>
#include <cinttypes>
#include <stdio.h>
#include <stdlib.h>
#include "../cpp_scope_helpers.h"

using namespace std::chrono;

#define HEIGHT 256
#define WIDTH 128

char* createData(int width, int height);

int main(void)
{
    typedef high_resolution_clock Time;
    typedef milliseconds ms;
    typedef duration<float> fsec;
    auto t0 = Time::now();

    for (int i = 0; i < 65556; i++) {
        // do nothing
        printf("%d ", i);
    }

    printf("\n");

    auto t1 = Time::now();
    fsec fs = t1 - t0;
    ms d = duration_cast<ms>(fs);
    printf("Duration (ms): %" PRId64 "\n", d.count());
}

char* createData(int width, int height) {
    int index;

    // initialize data
    char* data = (char*)malloc(width * height * 4 * sizeof(char));

    // populate data with random values
    for (int w = 0; w < width; w++) {
        for (int h = 0; h < height; h++) {
            index = get_index(w, h, width);
            data[index] = (char)(rand() % 256);
        }
    }

    return data;
}