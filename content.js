console.log("Chrome extension from content");

window.addEventListener('mouseup', selectedWord);

function selectedWord() {
  let selectedText = window.getSelection().toString().trim();
  console.log(selectedText)
  if (selectedText.length > 1) {
    let message = {
      text: selectedText
    }
    chrome.runtime.sendMessage(message)
  }
}