/* eslint-disable complexity */
// var convert = require('convert-units')

chrome.runtime.onMessage.addListener(receiver);
let word = "";
window.enabled = false
window.convertedMeasure = 0

function isEnabled() {
  return enabled;
}

function setEnabled(newStatus) {
  enabled = newStatus;
}

function receiver(request, sender, sendResponse) {
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