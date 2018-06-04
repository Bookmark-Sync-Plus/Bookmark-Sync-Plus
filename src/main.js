//set badge title text
browser.browserAction.setTitle({
    title: 'Last sync time: ' + 'Never'
});
/*function synctime (second, minute, hour, day, month, year) {
};
var t1 = new synctime(second, minute, hour, day, month, year);*/

//option page
function handleClick() {
    browser.runtime.openOptionsPage();
   }
browser.browserAction.onClicked.addListener(handleClick);
//OAuth

// listen for bookmarks being updated
browser.bookmarks.onChanged.addListener(listener);

// listen for bookmarks being created
browser.bookmarks.onCreated.addListener(listener);

// listen for bookmarks being removed
browser.bookmarks.onRemoved.addListener(listener);


//get bookmark properties
function handleChanged(id, changeInfo) {
    console.log("Item: " + id + " changed");
    console.log("Title: " + changeInfo.title);
    console.log("Url: " + changeInfo.url);
}