/* eslint-disable complexity */
// var convert = require('convert-units')

console.log("Chrome extension from background");

chrome.runtime.onMessage.addListener(receiver);
let word = "";

function receiver(request, sender, sendResponse) {
  word = request.text;
  let sanitizedString = word.trim().toLowerCase();

  console.log(sanitizedString.replace(/[^a-zA-Z]/g, ""));
  console.log(sanitizedString.replace(/[^/\d]/g, ""));

  let unit = sanitizedString.replace(/[^a-zA-Z]/g, "");
  let value = sanitizedString.replace(/[^/\d]/g, "");

  switch (value) {
    case "1/2":
      value = 0.5;
      break;
    case "1/3":
      value = 0.33;
      break;
    case "1/4":
      value = 0.25;
      break;
    case "1/5":
      value = 0.2;
      break;
    case "1/6":
      value = 0.16;
      break;
    case "1/8":
      value = 0.125;
    default:
      "";
  }
  if (value === "1/4") {
    value = 0.25;
  }
  value = parseFloat(value);

  console.log(typeof value, value);
  let convertedMeasure;

  switch (unit) {
    case "cup":
      convertedMeasure = Math.round(value * 236.588);
      convertedMeasure = `${convertedMeasure} mL`;
      console.log("translatedMeasure :", convertedMeasure);
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
      sendResponse("Can't convert");
  }

  sendResponse(convertedMeasure);
}
