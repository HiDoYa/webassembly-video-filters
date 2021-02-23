let instance;

var gModule = null;

async function loadWasm() {
	const imports = {
		wasi_snapshot_preview1: { 
			proc_exit: () => { },
			fd_write: () => { }, 
			fd_prestat_get: () => { },
			fd_prestat_dir_name: () => { }
		},
		env: {
			__memory_base: 0,
			__table_base: 0,
			__indirect_function_table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
			__stack_pointer: new WebAssembly.Global({value:'i32', mutable:true}, 0),
			memory: new WebAssembly.Memory({initial: 1}),
			STACKTOP: 0,
		}
	};
	gModule = await WebAssembly.instantiateStreaming(fetch('./add.wasm'), imports);
};
  

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

		const cArrayPointer = gModule.instance.exports.custom_malloc(data.length * 4);
		const cArray = new Uint8Array(
			gModule.instance.exports.memory.buffer,
			cArrayPointer,
			data.length
		    );
		cArray.set(data);

		console.log(gModule.instance.exports.test());

		gModule.instance.exports.get_luminance(cArrayPointer, this.width, this.height);

		// Draw modified frame in context 2
		frame.data = Object.assign(frame.data, new Uint8ClampedArray(cArray));
		this.ctx2.putImageData(frame, 0, 0);
		gModule.instance.exports.custom_free(cArrayPointer, data.length * 4);
		return;
	}
};

document.addEventListener("DOMContentLoaded", () => {
	loadWasm();
	processor.doLoad();
});

