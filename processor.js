let instance;
async function loadWasm() {
	let wasm = await WebAssembly.instantiateStreaming(fetch("./add.wasm", { cache: 'no-cache' }));
	instance = wasm.instance;
}

let processor = {
	timerCallback: function() {
		if (this.video.paused || this.video.ended) {
			return;
		}

		// Process frame
		this.computeFrame();

		// Run function again immediately
		let self = this;
		setTimeout(function () {self.timerCallback();}, 0);
	},

	doLoad: function() {
		// Get html elements
		this.video = document.getElementById("video");
		this.c1 = document.getElementById("c1");
		this.ctx1 = this.c1.getContext("2d");
		this.c2 = document.getElementById("c2");
		this.ctx2 = this.c2.getContext("2d");
		let self = this;

		// Start callback to process frame
		this.video.addEventListener("play", function() {
				self.width = self.video.videoWidth / 2;
				self.height = self.video.videoHeight / 2;
				self.timerCallback();
			}, false);
	},

	computeFrame: function() {
		// Draw original frame in context 1
		this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);

		// Modify frame
		let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
		let data = Array.prototype.slice.call(frame.data);

		const cArrayPointer = instance.exports.custom_malloc(data.length * 4);
		const cArray = new Uint8Array(
			instance.exports.memory.buffer,
			cArrayPointer,
			data.length
		    );
		cArray.set(data);

		instance.exports.get_luminance(cArrayPointer, this.width, this.height);

		// Draw modified frame in context 2
		frame.data = Object.assign(frame.data, new Uint8ClampedArray(cArray));
		this.ctx2.putImageData(frame, 0, 0);
		instance.exports.custom_free(cArrayPointer, data.length * 4);
		return;
	}
};

document.addEventListener("DOMContentLoaded", () => {
	loadWasm();
	processor.doLoad();
});