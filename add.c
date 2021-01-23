// Filename: add.c
int add(int a, int b) {
	return a*a + b;
}

void bulkAdd(int* data, int b, int length) {
	for (int i = 0; i < length; i++) {
		data[i * 4 + 0] = add(data[i * 4 + 0] ,b);
		data[i * 4 + 1] = add(data[i * 4 + 1] ,b);
		data[i * 4 + 2] = add(data[i * 4 + 2] ,b);
	}
}
