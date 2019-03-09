/* eslint-disable default-case */
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

  if (value === null) {
    convertedMeasure = "Can't convert"
  }

  let split = value.split('/');
  if (split.length > 1) {
    value = split[0] / split[1];
  }
  
  value = parseFloat(value);

  switch (value) {
    case '¾':
      value = 0.75;
      break;
    case '½':
      value = 0.5;
      break;
    case '¼':
      value = 0.25
      break;
    default:
    convertedMeasure = "Can't convert"
  }

  switch (unit) {
    case "cup":
    case "cups":
      convertedMeasure = Math.round(value * 236.588);
      convertedMeasure = `${convertedMeasure} mL`;
      break;
    case "pound":
    case "pounds":
    case "lb":
    case "lbs":
      convertedMeasure = Math.round(value * 453.592);
      convertedMeasure = `${convertedMeasure} grams`;
      break;
    case "ounce":
    case "ounces":
      convertedMeasure = Math.round(value * 28.3495);
      convertedMeasure = `${convertedMeasure} grams`;
      break;
      
    case "quart":
    case "quarts":
      convertedMeasure = Math.round(value * 946.353);
      convertedMeasure = `${convertedMeasure} mL`;
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