var on = false;
var set = true
var newURL = "https://flashnotes-test.firebaseapp.com";

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
    var timer = setTimeout(popdown, 20000);
  }
}

function popdown()
{
  var all;

  chrome.windows.getAll({populate:true},function(windows){
    windows.forEach(function(window){
      window.tabs.forEach(function(tab){
        if (tab.url == "https://flashnotes-test.firebaseapp.com/" ||
          tab.url == "https://flashnotes-test.firebaseapp.com/?mode=select" ||
          tab.url == "https://flashnotes-test.firebaseapp.com/interface/homepage.html" ||
          tab.url == "https://www.accountchooser.com/redirect.html#flashnotes-test.firebaseapp.com" ||
          tab.url == "https://18edir.github.io/flashnotes/Games/BlackJack/blackjack.html?" ||
          tab.url == "https://18edir.github.io/flashnotes/Games/Tetris/Tetris.html?" ||
          tab.url == "https://18edir.github.io/flashnotes/Games/Dodge/dodge.html?" ||
          tab.url == "https://18edir.github.io/flashnotes/Games/Hangman/hangman.html?" ||
          tab.url == "https://18edir.github.io/flashnotes/Games/Tic-Tac-Toe/TicTacToeIAI.html?" ||
          tab.url == "https://18edir.github.io/flashnotes/Games/VirtualPet/main.html?")
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
