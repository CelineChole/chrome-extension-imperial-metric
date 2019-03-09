/* eslint-disable complexity */
// var convert = require('convert-units')

chrome.runtime.onMessage.addListener(receiver);
let word = "";
window.enabled = false
window.convertedMeasure = 0

chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked() {
  enabled = !enabled

  if (enabled) {
    chrome.browserAction.setBadgeText({text: 'on'})
    // chrome.browserAction.setIcon({path: 'Cooking-icon.png'})
  } else {
    chrome.browserAction.setBadgeText({text: ''})
    // chrome.browserAction.setIcon({path: 'Cooking-icon-bw-32.png'})
    
  }
}

function receiver(request, sender, sendResponse) {
  if (!enabled) {
    sendResponse('Disabled')
    return
  }


  word = request.text;
  let sanitizedString = word.trim().toLowerCase();

  let unit = sanitizedString.replace(/[^a-zA-Z]/g, "");
  let value = sanitizedString.replace(/[^/\d]/g, "");

  let split = value.split('/');
  if (split.length > 1) {
    value = split[0] / split[1];
  }
  
  value = parseFloat(value);

  switch (unit) {
    case "cup":
      convertedMeasure = Math.round(value * 236.588);
      convertedMeasure = `${convertedMeasure} mL`;
      break;
    case "pound":
    case "lb":
      convertedMeasure = Math.round(value * 453.592);
      convertedMeasure = `${convertedMeasure} grams`;
      break;
    case "ounce":
      convertedMeasure = Math.round(value * 28.3495);
      convertedMeasure = `${convertedMeasure} grams`;
      break;

    default:
      convertedMeasure = "Can't convert";
  }

  sendResponse(convertedMeasure);
}

// let the popup get the converted measure
// function getConvertedMeasure() {
//   return convertedMeasure
// }