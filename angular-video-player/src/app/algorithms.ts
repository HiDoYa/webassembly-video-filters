function convert_itu_bt709(r: number, g: number, b: number) {
	let luminance = 0.2126*r + 0.7152*g + 0.0722*b; // Y value
	//rerange from 0 -> 1
	luminance = luminance / 255.0;
	return luminance;
}

// convert to luminance scale 0-1 (regardless of R,G,B)
function convert_simple(pixel: number) {
	let luminance = pixel / 255.0;
	if (luminance > 1) {
		return 1;
	}
	return luminance;
}

// source: https://softpixel.com/~cwright/programming/colorspace/yuv/
function RGBtoY(R: number, G: number, B: number) {
	return (R * .299000) + (G * .587000) + (B * .114000); 	  	// 0 - 255
}

function RGBtoUV(R: number, G: number, B: number) {
	let U = (R * -.168736) + (G * -.331264) + (B *  .500000) + 128; 	// 0 - 255
	let V = (R *  .500000) + (G * -.418688) + (B * -.081312) + 128; 	// 0 - 255
    return [U, V]
}

function YUVtoRGB(Y: number, U: number, V: number) {
	let R = Y + 1.4075 * (V - 128);
	let G = Y - 0.3455 * (U - 128) - (0.7169 * (V - 128));
	let B = Y + 1.7790 * (U - 128);

    return [R, G, B];
}

function normalize(input: number) {
	return input / 255.0;
}

function getIndex(x: number, y: number, width: number) {
	return ((y * width) + x) * 4;
}

function getUpdatedColor(pixel_cur: number, pixel_new: number, divider: number, constant: number) {
	let result = pixel_cur + (constant * pixel_new / divider);
	if (result > 255) return 255;
	return Math.floor(result);

}
/////// SCOPE GENERATORS ///////
// get itu_bt.709 luminance (waveform)
export function js_lumascope(data_in: any, data_out: any, width: number, height: number) {
	let index;				
	let Y;					
	
	let histogram = new Array(1024);

	for (let w = 0; w < width; w++) {
		for (let i=0; i < height; i++) histogram[i] = 0;

		for (let h = 0; h < height; h++) {
			index = ((h * width) + w) * 4;
			
			Y = Math.floor(height * convert_itu_bt709(data_in[index], 
												data_in[index+1], 
												data_in[index+2]));

			//increment histogram bucket for the luminance we found
			histogram[height-(Y+1)]+=16.0*256/height;
		}

		for (let h = 0; h < height; h++) {
			index = ((h * width) + w) * 4;

			//  display histogram using green pixels (i.e. set r and b to 0)
			data_out[index] = 0;
			data_out[index+1] = histogram[h];
			data_out[index+2] = 0;
			data_out[index+3] = 255;
		}
	}
}

// get RGB luminance (waveform)
export function js_color_lumascope(data_in: any, data_out: any, width: number, height: number) {
	let index, Y_height;

	let Y, U, V;
	let R, G, B;
	
	let histogramY = new Array(1024);	// Y values

	let totalR = new Array(1024);
	let totalG = new Array(1024);
	let totalB = new Array(1024);

	let count = new Array(1024);

	for (let w = 0; w < width; w++) {

		// initialize histograms to 0
		for (let h = 0; h < height; h++) {
			histogramY[h] = 0;

			totalR[h] = 0;
			totalG[h] = 0;
			totalB[h] = 0;

			count[h] = 0;
		}

		// process data_in[]
		for (let h = 0; h < height; h++) {
			index = ((h * width) + w) * 4;

			// get Y
			Y = RGBtoY(data_in[index], data_in[index+1], data_in[index+2]);
			Y_height = normalize(Y) * (height-1); // 0 - (height - 1)

			// increment histogram bucket for the luminance we found (inverted)
			histogramY[Math.floor(height-Y_height-1)] += 16 * 256.0/height;

			// sum RGB
			totalR[Math.floor(height-Y_height-1)] += data_in[index];
			totalG[Math.floor(height-Y_height-1)] += data_in[index+1];
			totalB[Math.floor(height-Y_height-1)] += data_in[index+2];

			// counter
			count[Math.floor(height-Y_height-1)] += 1;
		}

		// process data_out[]
		for (let h = 0; h < height; h++) {
			if (count[h] == 0) count[h] = 1;

			// average RGB
			R = totalR[h]/count[h];
			G = totalG[h]/count[h];
			B = totalB[h]/count[h];

			// convert to UV
			let uvVal = RGBtoUV(R, G, B);
            U = uvVal[0];
            V = uvVal[1];

 			// convert back to RGB with HISTOGRAM Y
			let rgbVal = YUVtoRGB(histogramY[h], U, V);
            R = rgbVal[0];
            G = rgbVal[1];
            B = rgbVal[2];

			index = ((h * width) + w) * 4;

			// set data_out[] (insert U, V -> RGB)
			data_out[index]   = R;
			data_out[index+1] = G;
			data_out[index+2] = B;
			data_out[index+3] = 255;
		}
	}
}

// get seperate RGB luminance (waveform)
export function js_rgb_parade(data_in: any, data_out: any, width: number, height: number) {
    let index;					// pixel's index
	let indexR, indexG, indexB;	// pixel's index
	let Yr, Yg, Yb;				// pixel's luminance

	let output_width = width * 3;
	let w_r, w_g, w_b;

	let histogram = new Array(1024);
	for (let h=0; h < 1024; h++) {
		histogram[h] = new Array(3);
	}

	for (let w = 0; w < width; w++) {
		//initialize histogram elements to zero
		for (let h=0; h < height; h++) {
			histogram[h][0] = 0;
			histogram[h][1] = 0;
			histogram[h][2] = 0;
		}

		//find luminance, increment histogram bucket
		for (let h = 0; h < height; h++) {
			index = ((h * width) + w) * 4;
			Yr = Math.floor(data_in[index]/255.0 * (height-1));
			Yg = Math.floor(data_in[index+1]/255.0 * (height-1));
			Yb = Math.floor(data_in[index+2]/255.0 * (height-1));

			histogram[height - Yr - 1][0] += 16.0*256/height;
			histogram[height - Yg - 1][1] += 16.0*256/height;
			histogram[height - Yb - 1][2] += 16.0*256/height;
		}

		//display histogram
		for (let h = 0; h < height; h++) {
			indexR = ((h * output_width) + w) * 4;
			indexG = ((h * output_width) + w + width) * 4;
			indexB = ((h * output_width) + w + 2*width) * 4;

			data_out[indexR+1] = 0; //R
			data_out[indexR+2] = 0;
			data_out[indexG]   = 0; //G
			data_out[indexG+2] = 0;
			data_out[indexB]   = 0; //B
			data_out[indexB+1] = 0;

			data_out[indexR]   = histogram[h][0];
			data_out[indexG+1] = histogram[h][1];
			data_out[indexB+2] = histogram[h][2];

			// set alpha
			data_out[indexR+3] = 255;
			data_out[indexG+3] = 255;
			data_out[indexB+3] = 255;
		}
	}
}

export function js_color_vectorscope(data_in: any, data_out: any, width: number, height: number) {
	let index;
	let x, y;
	let R, G, B;
	let U, V;

	for (let w = 0; w < width; w++) {
		for (let h = 0; h < height; h++) {
				index = getIndex(w, h, width);
				data_out[index] = 0;
				data_out[index+1] = 0;
				data_out[index+2] = 0;
				data_out[index+3] = 255;
		}
	}

	for (let w = 0; w < width; w++) {
		for (let h = 0; h < height; h++) {
			index = getIndex(w, h, width);

			R = data_in[index];
			G = data_in[index+1];
			B = data_in[index+2];

			// get UV
			let uvVal = RGBtoUV(R, G, B);
            U = uvVal[0];
            V = uvVal[1];

			// convert UV to XY
			x = normalize(U) * (height-1);
			y = (height-1) - (normalize(V) * (height-1));

			// calculate resulting pixel brightness
			index = getIndex(Math.round(x), Math.round(y), height);

			data_out[index] = getUpdatedColor(data_out[index], R, height, 16);
			data_out[index+1] = getUpdatedColor(data_out[index+1], G, height, 16);
			data_out[index+2] = getUpdatedColor(data_out[index+2], B, height, 16);
		}
	}
}


export function js_vectorscope(data_in: any, data_out: any, width: number, height: number) {
	
	let index;
	let x, y;
	let R, G, B;
	let U, V;

	for (let w = 0; w < width; w++) {
		for (let h = 0; h < height; h++) {
				index = getIndex(w, h, width);
				data_out[index] = 0;
				data_out[index+1] = 0;
				data_out[index+2] = 0;
				data_out[index+3] = 255;
			
		}
	}

	for (let w = 0; w < width; w++) {
		for (let h = 0; h < height; h++) {
			index = getIndex(w, h, width);

			R = data_in[index];
			G = data_in[index+1];
			B = data_in[index+2];

			// get UV
			let uvVal = RGBtoUV(R, G, B);
            U = uvVal[0];
            V = uvVal[1];

			// convert UV to XY
			x = normalize(U) * (height-1);
			y = (height-1) - (normalize(V) * (height-1));

			// calculate resulting pixel brightness
			index = getIndex(Math.round(x), Math.round(y), height);

			let result = data_out[index+1] + 16.0*256/height;
			if (result > 255) result = 255;

			data_out[index] = 0;
			data_out[index+1] = result;
			data_out[index+2] = 0;
		}
	}
}