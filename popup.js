console.log('from popup')

var bgPage = chrome.extension.getBackgroundPage()
console.log('bgPage', bgPage.word)

// const popup = document.querySelector('#measure')
// let test = document.createElement('span')
// test.textContent = 'yo'
// popup.appendChild(test)
