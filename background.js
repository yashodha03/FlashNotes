var on = false;
var set = true
var newURL = "https://18edir.github.io/edr48.github.io/auth/authentication.html";

function updatebadge()
{
  on = !on
  if(on == true)
  {
    chrome.browserAction.setBadgeText({"text": "On"});
    setTimeout(popup, 3000);
  }
  if(on == false)
  {
    chrome.browserAction.setBadgeText({"text": "Off"});
  }
}

function popup()
{
  if(on == true)
  {
    chrome.tabs.create({url:newURL});
    var timer = setTimeout(popdown, 3000);
  }
}

function popdown()
{
  var all;

  chrome.windows.getAll({populate:true},function(windows){
    windows.forEach(function(window){
      window.tabs.forEach(function(tab){
        if (tab.url == "https://18edir.github.io/edr48.github.io/auth/authentication.html");
        {
          all = tab.id;
        }
      });
    });
  });

  chrome.tabs.getSelected(function(tab) {
    chrome.tabs.remove(all, function() { });
  });

  var timer = setTimeout(popup, 3000);
}


if(set == true)
{
  chrome.browserAction.setBadgeText({"text": "Off"});
  set = false;
}
chrome.browserAction.onClicked.addListener(updatebadge);
