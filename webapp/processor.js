let instance;

var gModule = null;

async function loadWasm() {
	const imports = {
		wasi_snapshot_preview1: { 
			proc_exit: () => { },
			fd_write: () => { }, 
			fd_prestat_get: () => { },
			fd_prestat_dir_name: () => { },
			clock_time_get: () => { },
			poll_oneoff: () => { },
			sched_yield: () => { },
			environ_sizes_get: () => { },
			environ_get: () => { },
			path_filestat_get: () => { },
			fd_fdstat_get: () => { },
			path_open: () => { },
			path_readlink: () => { },
			path_filestat_set_times: () => { },
			path_unlink_file: () => { },
			path_remove_directory: () => { },
			path_create_directory: () => { },
			fd_readdir: () => { },
			fd_close: () => { },
			path_symlink: () => { },
			path_link: () => { },
			path_rename: () => { },
			fd_fdstat_set_flags: () => { },
			fd_seek: () => { },	
			fd_read: () => { }
		},
		env: {
			__memory_base: 0,
			__table_base: 0,
			__indirect_function_table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
			__stack_pointer: new WebAssembly.Global({value:'i32', mutable:true}, 0),
			memory: new WebAssembly.Memory({initial: 65536}),
			STACKTOP: 0
		}
	};

	gModule = await WebAssembly.instantiateStreaming(fetch('./zmo.wasm'), imports);

	gModule.instance.exports.memory.grow(10);
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

		const cArrayPointer = gModule.instance.exports.custom_malloc(data.length);
		const cArray = new Uint8Array(
			gModule.instance.exports.memory.buffer,
			cArrayPointer,
			data.length
			);
		cArray.set(data);

		const cArrayPointer2 = gModule.instance.exports.custom_malloc(this.width * 3 * 256 * 4);
		const cArray2 = new Uint8Array(
			gModule.instance.exports.memory.buffer,
			cArrayPointer2,
			this.width * 3 * 256 * 4
			);
			
		gModule.instance.exports.rgbparade(cArrayPointer, cArrayPointer2, this.width, this.height);

		this.ctx2.putImageData(new ImageData(new Uint8ClampedArray(cArray2), this.width * 3, 256), 0, 0);

		gModule.instance.exports.custom_free(cArrayPointer, data.length);
		gModule.instance.exports.custom_free(cArrayPointer2, this.width * 3 * 256 * 4);

		return;
	}
};

document.addEventListener("DOMContentLoaded", () => {
	loadWasm();
	processor.doLoad();
});
