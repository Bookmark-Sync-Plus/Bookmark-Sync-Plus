//compatibility hack
var browser = chrome || browser;
//set badge title text
browser.browserAction.setTitle({
    title: 'Last sync time: ' + 'Never'
});

function listener() {}

//option page
function openURL(url) {
    chrome.tabs.create({
        url: url
    })
}

chrome.runtime.onInstalled.addListener(function () {
    browser.runtime.openOptionsPage();
});

function IntervalSync() {

 }
 setInterval(IntervalSync, 60000);

 var syncdate = new Date();

function handleClick() {
    browser.runtime.openOptionsPage();
}

function handleCreated(id, bookmarkInfo) {
    console.log(`New bookmark ID: ${id}`);
    console.log(`New bookmark URL: ${bookmarkInfo.url}`);
    console.log(`New bookmark URL: ${bookmarkInfo.title}`);
}

function handleRemoved(id, bookmarkInfo) {
    console.log(`New bookmark ID: ${id}`);
    console.log(`New bookmark URL: ${bookmarkInfo.url}`);
    console.log(`New bookmark URL: ${bookmarkInfo.title}`);
}

//initial backup


//notification
var notifititle = browser.i18n.getMessage("notificationSyncErrorTitle");
browser.notifications.create({
  "type": "basic",
  "iconUrl": browser.extension.getURL("icons/bookmark_128.png"),
  "title": notifititle
});

browser.browserAction.onClicked.addListener(handleClick);

// listen for bookmarks
browser.bookmarks.onChanged.addListener(listener);
browser.bookmarks.onCreated.addListener(handleCreated);
browser.bookmarks.onRemoved.addListener(handleRemoved);