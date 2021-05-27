let lastUrl = location.href; 
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    onUrlChange();
  }
}).observe(document, {subtree: true, childList: true});

// Rerun init if url changed
function onUrlChange() {
  init();
}

let GLOBAL_SCOPE = "luma";
let instance;

// Listen from popup script for events
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type == "SCOPE_TYPE") {
      GLOBAL_SCOPE = request.scope;
      scopeChanged();
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
    let url = await fetch(chrome.runtime.getURL("zmo.wasm"));
    let wasm = await WebAssembly.instantiateStreaming(url, imports);
    instance = wasm.instance;
    instance.exports.memory.grow(15);
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

    setScopeSize: function() {
      this.inputWidth = 256;
      this.inputHeight = 256;
      this.outputWidth = 256;
      this.outputHeight = 256;

      if (GLOBAL_SCOPE == "rgbp") {
        this.inputWidth = 85;
        this.inputHeight = 255;
        this.outputWidth = 255;
        this.outputHeight = 255;
      }
    },
  
    doLoad: function() {
        // Free old pointers
        if (this.inputPointer != null) {
          instance.exports.free(this.inputPointer);
        }
        if (this.outputPointer != null) {
          instance.exports.free(this.outputPointer);
        }

        // Populate input/output width/height
        setScopeSize();

        // Allocate arrays
        this.inputPointer = instance.exports.malloc(this.inputWidth * this.inputHeight * 4);
        this.inputArray = new Uint8Array(
            instance.exports.memory.buffer,
            this.inputPointer,
            this.inputWidth * this.inputHeight * 4
        );

        this.outputPointer = instance.exports.malloc(this.outputWidth * this.outputHeight * 4);
        this.outputArray = new Uint8Array(
            instance.exports.memory.buffer,
            this.outputPointer,
            this.outputWidth * this.outputHeight * 4
        );

        this.c1 = document.getElementById("c1");
        this.ctx1 = this.c1.getContext("2d");
        this.c2 = document.getElementById("c2");
        this.ctx2 = this.c2.getContext("2d");

        // Resize canvas if needed
        this.ctx1.canvas.width = this.inputWidth;
        this.ctx1.canvas.height = this.inputHeight;
        this.ctx2.canvas.width = this.outputWidth;
        this.ctx2.canvas.height = this.outputHeight;

        this.video = document.getElementsByTagName("video")[0];

        // Start scope callback
        let self = this;
        this.video.addEventListener("play", () => {
            self.timerCallback();
        });
        self.timerCallback();
    },
  
    computeFrame: function() {
      if (this.video == undefined) return;
      this.ctx1.drawImage(this.video, 0, 0, this.inputWidth, this.inputHeight);
      let frame = this.ctx1.getImageData(0, 0, this.inputWidth, this.inputHeight);
      let data = Array.prototype.slice.call(frame.data);

      // Copy data into array
      this.inputArray.set(data);

      // Pass array into scope function
      switch(GLOBAL_SCOPE) {
        case "luma":
          instance.exports.lumascope(this.inputPointer, this.outputPointer, this.inputWidth, this.inputHeight);
          break;
        case "cluma":
          instance.exports.clumascope(this.inputPointer, this.outputPointer, this.inputWidth, this.inputHeight);
          break;
        case "rgbp":
          instance.exports.rgbparade(this.inputPointer, this.outputPointer, this.inputWidth, this.inputHeight);
          break;
        case "cvect":
          instance.exports.cvectorscope(this.inputPointer, this.outputPointer, this.inputWidth, this.inputHeight);
          break;
      }

      // Put output into canvas
      this.ctx2.putImageData(new ImageData(new Uint8ClampedArray(this.outputArray), this.outputWidth, this.outputHeight), 0, 0);
      return;
    }
  };

function scopeChanged() {
  processor.doLoad();
}

function init() {
  let url = window.location.href;
  let id = "topnav";
  if (url.includes("youtube.com")) {
    id = "logo";
  } else if (url.includes("vimeo.com")) {
    id = "topnav_desktop";
  }

  const youtubeRegex = new RegExp('watch');
  const vimeoRegex = new RegExp('[0-9]+');

  // Url must match for video scopes
  if ((url.includes("youtube.com") && url.match(youtubeRegex) == null) ||
      (url.includes("vimeo.com")   && url.match(vimeoRegex)   == null)) {
    return
  }

  // Only run if this hasn't been run yet
  // Find element to replace in web page
  if (document.getElementById("c1") == null) {
    console.log("Element to inject wasm:", document.getElementsByTagName(id));
    document.getElementById(id).innerHTML += "<canvas id=\"c1\" style=\"display: none;\" width=\"256\" height=\"256\"></canvas>"
    document.getElementById(id).innerHTML += "<canvas id=\"c2\" style=\"border: 1px solid white;position:absolute; top: 20px; left: 60px; z-index: 500;\" width=\"256\" height=\"256\"></canvas>"
  } 

  // Make the DIV element draggable:
  dragElement(document.getElementById("c2"));

  // Load wasm and start processing
  loadWasm().then(function() {
      instance.exports.memory.grow(15);
      processor.doLoad();
  });
}

// Toggles whether to show scope
function toggle(elmnt) {
  if (elmnt.style.display == "none") {
    elmnt.style.display = "block";
  } else {
    elmnt.style.display = "none";
  }
}

/// FOLLOWING ADAPTED FROM W3 SCHOOLS
// Allows scope to be dragged across the screen
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
