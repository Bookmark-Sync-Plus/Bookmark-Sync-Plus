//compatibility hack
var browser = chrome || browser;
//set badge title text
browser.browserAction.setTitle({
    title: 'Last sync time: ' + 'Never'
});
/*function synctime (second, minute, hour, day, month, year) {
};
var t1 = new synctime(second, minute, hour, day, month, year);*/
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
  "iconUrl": browser.extension.getURL("icons/bookmark_64.png"),
  "title": notifititle
});

browser.browserAction.onClicked.addListener(handleClick);

// listen for bookmarks being updated
browser.bookmarks.onChanged.addListener(listener);

// listen for bookmarks being created
browser.bookmarks.onCreated.addListener(handleCreated);

// listen for bookmarks being removed
browser.bookmarks.onRemoved.addListener(handleRemoved);