//set badge title text
function synctime (second, minute, hour, day, month, year) {
}
var t1 = new synctime(second, minute, hour, day, month, year);
browser.browserAction.setTitle({
    title: 'Last sync time: ' + 'Never'
});

//get bookmark properties
function handleChanged(id, changeInfo) {
    console.log("Item: " + id + " changed");
    console.log("Title: " + changeInfo.title);
    console.log("Url: " + changeInfo.url);
}

// listen for bookmarks being updated
browser.bookmarks.onChanged.addListener(listener)

// listen for bookmarks being created
browser.bookmarks.onCreated.addListener(listener);

// listen for bookmarks being removed
browser.bookmarks.onRemoved.addListener(listener);