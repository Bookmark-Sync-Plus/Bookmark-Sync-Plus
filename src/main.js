function handleChanged(id, changeInfo) {
    console.log("Item: " + id + " changed");
    console.log("Title: " + changeInfo.title);
    console.log("Url: " + changeInfo.url);
}

// listen for bookmarks being updated
browser.bookmarks.onChanged.addListener(listener)

// listen for bookmarks being created
browser.bookmarks.onCreated.addListener(updateActiveTab);

// listen for bookmarks being removed
browser.bookmarks.onRemoved.addListener(updateActiveTab);