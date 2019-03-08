console.log("Chrome extension from content");

window.addEventListener('mouseup', selectedWord);

function selectedWord() {
  let selectedText = window.getSelection().toString().trim();
  console.log('mouse highlit ', selectedText)
  if (selectedText.length > 1) {
    let message = {
      text: selectedText
    }
    chrome.runtime.sendMessage(message, function(response) {
      console.log('response ', response)
      window.getSelection().anchorNode.nodeValue = '❤️'
    })
  }
}
// check if anchor is the same as the final element (make sure the person is
// not selecting more than one p or a)
// build the offset to only overwrite one value
