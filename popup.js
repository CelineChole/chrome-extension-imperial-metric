console.log('from popup')

var bgPage = chrome.extension.getBackgroundPage()

const popup = document.querySelector('#measure')
let test = document.createElement('span')
test.textContent = 'yo'
popup.appendChild(test)

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting === 'hello') {
      sendResponse({message: "hi to you"})
    }
  }
);