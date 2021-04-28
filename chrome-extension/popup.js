function sendMessage(scope) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {scope: scope}, function(response) {
        });
    });
}

arr = ["luma", "rgbp", "vect"]

for (ind in arr) {
    let i = ind;
    document.getElementById(arr[i]).onclick = function() {
        console.log(arr[i]);
        sendMessage(arr[i]);
    };
}