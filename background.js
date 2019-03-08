// var convert = require('convert-units')

console.log("Chrome extension from background")

chrome.runtime.onMessage.addListener(receiver)
let word = '';

function receiver(request, sender, sendResponse) {
  word = request.text;

  // conversion

  sendResponse(word)
}


// chrome.runtime.sendMessage({greteing: 'hello from background'}, (response) => {
//   console.log(response.message);
// })