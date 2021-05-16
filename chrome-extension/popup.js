function sendMessage(type, scope=null) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: type, scope: scope}, function(response) {
        });
    });
}

arr = ["luma", "rgbp", "vect"]

for (ind in arr) {
    let i = ind;
    document.getElementById(arr[i]).onclick = function() {
        sendMessage("SCOPE_TYPE", arr[i]);
    };
}

document.getElementById("toggleButton").onclick = function() {
    sendMessage("SCOPE_TOGGLE");
};