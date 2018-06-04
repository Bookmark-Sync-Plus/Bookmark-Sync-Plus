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

browser.browserAction.onClicked.addListener(handleClick);
//OAuth

// listen for bookmarks being updated
browser.bookmarks.onChanged.addListener(listener);

// listen for bookmarks being created
browser.bookmarks.onCreated.addListener(listener);

function handleCreated(id, bookmarkInfo) {
    console.log(`New bookmark ID: ${id}`);
    console.log(`New bookmark URL: ${bookmarkInfo.url}`);
    console.log(`New bookmark URL: ${bookmarkInfo.title}`);
}
browser.bookmarks.onCreated.addListener(handleCreated);

// listen for bookmarks being removed
browser.bookmarks.onRemoved.addListener(listener);

function handleRemoved(id, bookmarkInfo) {
    console.log(`New bookmark ID: ${id}`);
    console.log(`New bookmark URL: ${bookmarkInfo.url}`);
    console.log(`New bookmark URL: ${bookmarkInfo.title}`);
}
browser.bookmarks.onRemoved.addListener(handleRemoved);

//get bookmark properties
/*function handleChanged(id, changeInfo) {
    console.log("Item: " + id + " changed");
    console.log("Title: " + changeInfo.title);
    console.log("Url: " + changeInfo.url);
}
*/