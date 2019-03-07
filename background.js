console.log("Chrome extension from background")

chrome.runtime.onMessage.addListener(receiver)

function receiver(request, sender, sendResponse) {
  window.word = request.text;
  console.log(window.word)
}
