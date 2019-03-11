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
  // ¼½¾ have the continuous Unicode values from \u00BC to \u00BE
  // ⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞ have the continuous Unicode values from \u2150 to \u215E
  let value = sanitizedString.replace(/[^/\d\u00BC-\u00BE\u2150-\u215E]/g, "");

  if (!value) {
    convertedMeasure = "Can't convert";
    console.log('inside value')
    sendResponse(convertedMeasure);
    return
  }

  
  // value = parseFloat(value);
  let split = value.split('/');
  if (split.length > 1) {
    value = split[0] / split[1];
  }

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
    case '⅐':
      value = 0.14
      break;
    case '⅑':
      value = 0.11
      break;
    case '⅒':
      value = 0.1
      break;
    case '⅓':
      value = 0.33
      break;
    case '⅔':
      value = 0.66
      break;
    case '⅕':
      value = 0.2
      break;
    case '⅖':
      value = 0.4
      break;
    case '⅗':
      value = 0.6
      break;
    case '⅘':
      value = 0.8
      break;
    case '⅙':
      value = 0.16
      break;
    case '⅚':
      value = 0.83
      break;
    case '⅛':
      value = 0.125
      break;
    case '⅜':
      value = 0.375
      break;
    case '⅝':
      value = 0.625
      break;
    case '⅞':
      value = 0.875
      break;
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