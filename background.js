// listening to new tab open
chrome.tabs.onUpdated.addListener(function (tabId, tabInfo, tab) {
  if (tabInfo.status == 'complete') {
    var match = tab.url.match('https?:\/\/portal.aiub.edu/*');
    if(match){
      chrome.tabs.executeScript({
        file: 'content-portal.js'
      });
    }
  }
});

// message from content-portal
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if (sender.tab.url.match('https?:\/\/portal.aiub.edu/*') && request.aiub_portal_data) {
    // change for prod
    var url = 'http://localhost:3000/apd';
    var apd_xhr = new XMLHttpRequest();
    var data = JSON.stringify(request.aiub_portal_data);
    console.log(data);
    apd_xhr.open("POST", url, true);
    apd_xhr.setRequestHeader( "Content-Type", "application/json" );
    apd_xhr.send({data: '123'});
  }
  sendResponse(true);
});
