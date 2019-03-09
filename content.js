window.addEventListener('mouseup', selectedWord);
var bgPage = chrome.extension.getBackgroundPage()

function selectedWord() {
  if (!bgPage.isEnabled()) {
    return
  }

  let selectedText = window.getSelection().toString().trim()
  if (selectedText.length > 1) {
    let message = {
      text: selectedText
    }
    chrome.runtime.sendMessage(message, function(response) {
      // console.log($.toastr)
      $.toastr.success(response);
    })
  }
}