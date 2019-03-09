window.addEventListener('mouseup', selectedWord);

function selectedWord() {
  let selectedText = window.getSelection().toString().trim()
  if (selectedText.length > 1) {
    let message = {
      text: selectedText
    }
    chrome.runtime.sendMessage(message, function(response) {
      if (response !== 'Disabled') {
        $.toastr.success(response);
      }
    })
  }
}
