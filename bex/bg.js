chrome.contextMenus.create({
  id: "saveImage",
  title: "Save Image",
  contexts: ["image"],
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveImage" && info.srcUrl) {
    fetch("http://localhost:7777/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: info.srcUrl }),
    })
  }
})
