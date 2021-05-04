let GLOBAL_SCOPE = "luma";
let instance;
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type == "SCOPE_TYPE") {
      GLOBAL_SCOPE = request.scope;
    } else if  (request.type == "SCOPE_TOGGLE") {
      toggle(document.getElementById("c2"));
    }
    sendResponse({done: "done"});
  }
);
init();

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

function init() {
  let url = window.location.href;
  let id = "topnav";
  if (url.includes("youtube.com")) {
    id = "logo";
  } else if (url.includes("vimeo.com")) {
    id = "topnav_desktop";
  }

  document.getElementById(id).innerHTML += "<canvas id=\"c1\" style=\"display: none;\" width=\"255\" height=\"255\"></canvas>"
  document.getElementById(id).innerHTML += "<canvas id=\"c2\" style=\"border: 1px solid white;position:absolute; top: 20px; left: 60px; z-index: 500;\" width=\"255\" height=\"255\"></canvas>"

  // Make the DIV element draggable:
  dragElement(document.getElementById("c2"));

  loadWasm().then(function() {
      instance.exports.memory.grow(15);
      processor.doLoad();
  });
}

function toggle(elmnt) {
  if (elmnt.style.display == "none") {
    elmnt.style.display = "block";
  } else {
    elmnt.style.display = "none";
  }
}

/// FOLLOWING ADAPTED FROM W3 SCHOOLS
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
