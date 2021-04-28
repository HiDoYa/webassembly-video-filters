let instance;
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
    let wasm = await WebAssembly.instantiateStreaming(fetch(chrome.runtime.getURL("zmo.wasm")), imports);
    instance = wasm.instance;
}

let GLOBAL_SCOPE = "luma";
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    GLOBAL_SCOPE = request.scope;
    sendResponse({done: "done"});
  }
);


let processor = {
    timerCallback: function() {
      if (this.video.paused || this.video.ended) {
          return;
      }
    
      this.computeFrame();
      let self = this;
      setTimeout(function () {
          self.timerCallback();
      }, 0);
    },
  
    doLoad: function() {
        this.inputPointer = instance.exports.malloc(255 * 255 * 4);
        this.inputArray = new Uint8Array(
            instance.exports.memory.buffer,
            this.inputPointer,
            255 * 255 * 4
        );

        this.outputPointer = instance.exports.malloc(255 * 255 * 4);
        this.outputArray = new Uint8Array(
            instance.exports.memory.buffer,
            this.outputPointer,
            255 * 255 * 4
        );

        this.c1 = document.getElementById("c1");
        this.ctx1 = this.c1.getContext("2d");
        this.c2 = document.getElementById("c2");
        this.ctx2 = this.c2.getContext("2d");
        this.video = document.getElementsByTagName("video")[0];

        this.width = 255;
        this.height = 255;

        let self = this;
        this.video.addEventListener("play", () => {
            self.timerCallback();
        });
        self.timerCallback();
    },
  
    computeFrame: function() {
      if (this.video == undefined) return;
      this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
      let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
      let data = Array.prototype.slice.call(frame.data);

      this.inputArray.set(data);
      switch(GLOBAL_SCOPE) {
        case "luma":
          instance.exports.lumascope(this.inputPointer, this.outputPointer, this.width, this.height);
          break;
        case "rgbp":
          instance.exports.rgbparade(this.inputPointer, this.outputPointer, this.width/3, this.height);
          break;
        case "vect":
          instance.exports.vectorscope(this.inputPointer, this.outputPointer, this.width, this.height);
          break;
      }
      this.ctx2.putImageData(new ImageData(new Uint8ClampedArray(this.outputArray), this.width, this.height), 0, 0);
      return;
    }
  };

document.getElementById("logo").innerHTML += "<canvas id=\"c1\" style=\"display: none;\" width=\"255\" height=\"255\"></canvas>"
document.getElementById("logo").innerHTML += "<canvas id=\"c2\" style=\"border: 1px solid white;position:absolute; top: 20px; left: 60px; z-index: 500;\" width=\"255\" height=\"255\"></canvas>"

loadWasm().then(function() {
    instance.exports.memory.grow(15);
    processor.doLoad();
});

