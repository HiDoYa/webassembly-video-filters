let instance;
async function loadWasm() {
	let wasm = await WebAssembly.instantiateStreaming(fetch("./add.wasm", { cache: 'no-cache' }));
	instance = wasm.instance;
	console.log(instance.exports);
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
		// 4 for color channels (RGBA)
		let l = frame.data.length / 4;

		for (let i = 0; i < l; i++) {
			frame.data[i * 4 + 0] = instance.exports.add(frame.data[i * 4 + 0], 1.5);
			frame.data[i * 4 + 1] = instance.exports.add(frame.data[i * 4 + 1], 1.5);
			frame.data[i * 4 + 2] = instance.exports.add(frame.data[i * 4 + 2], 1.5);
		}

		// TODO: How to pass array into wasm? Can Wasm and js share memory?
		// console.log(instance.exports.bulkAdd(frame.data, 5, l));

		// Draw modified frame in context 2
		this.ctx2.putImageData(frame, 0, 0);
		return;
	}
};

document.addEventListener("DOMContentLoaded", () => {
	loadWasm();
	processor.doLoad();
});

