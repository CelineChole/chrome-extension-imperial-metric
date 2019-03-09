var bgPage = chrome.extension.getBackgroundPage()

const popup = document.querySelector('#measure')
let test = document.createElement('h1')
test.textContent = bgPage.getConvertedMeasure()
popup.appendChild(test)

