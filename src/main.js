//compatibility hack
const g = chrome || browser;

async function reset() {
    await g.storage.local.clear()
}

async function setUser(user) {
    console.log(`set user => ${user}`)
    await browser.storage.local.set({ user })
}

/**
 * Get user from storage
 * 
 * @returns {object}
 */
async function getUser() {
    return (await browser.storage.local.get('user'))['user']
}

async function setBookmarks(bookmarks) {
    await browser.storage.local.set({
        bookmarks
    })
}

/**
 * Get all bookmarks
 * 
 * @returns {array}
 */
async function getBookmarks() {
    return (await browser.storage.local.get('bookmarks')).bookmarks
}

async function addBookmark(value) {
    const marks = await getBookmarks()

    await setBookmarks(
        [value, ...(Array.isArray(marks) ? marks :[])]
    )
} 

async function removeBookmark(id) {
    await setBookmarks(
        (await getBookmarks()).filter(item => item.id !== id)
    )
}

async function resetBookmark() {
    await this.setBookmarks([])
}

addBookmark({id: 123, value: 'test'})
    .then(() => getBookmarks())
    .then(marks => console.log(marks))

function listener() {}

//option page
function openURL(url) {
    chrome.tabs.create({
        url: url
    })
}

chrome.runtime.onInstalled.addListener(function () {
    g.runtime.openOptionsPage();
});

// function IntervalSync() {

//  }
//  setInterval(IntervalSync, 60000);

//  var syncdate = new Date();

function handleClick() {
    g.runtime.openOptionsPage();
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
var notifititle = g.i18n.getMessage("notificationSyncErrorTitle");
g.notifications.create({
  "type": "basic",
  "iconUrl": g.extension.getURL("icons/bookmark_128.png"),
  "title": notifititle
});

g.browserAction.onClicked.addListener(handleClick);

console.log("hi")
// listen for bookmarks
g.bookmarks.onChanged.addListener(listener);
g.bookmarks.onCreated.addListener(handleCreated);
g.bookmarks.onRemoved.addListener(handleRemoved);