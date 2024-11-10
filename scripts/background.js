
chrome.runtime.onInstalled.addListener(() => {

    const fileUrl = chrome.runtime.getURL('ctoe_dict.json');

    // Fetch and parse the JSON file
    fetch(fileUrl)
        .then(ctoe => {
            let ctoe_dict= {};
            for(key in ctoe){
              
                let definition = ctoe[key]["English"];
                ctoe_dict
                [ctoe[key]["simplified"]] = definition;
            }

            chrome.storage.local.set({ ctoe_dict: ctoe }, () => {
                console.log('Chinese-to-English dictionary loaded.');
              });
        })
        .catch(error => {
        console.error('Error fetching or parsing the JSON file:', error);
        });
})

chrome.runtime.onInstalled.addListener(function (){
    chrome.contextMenus.create({
        id: "def",
        title: "Define",
        contexts: ['selection'],
    });
})
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "def" && info.selectionText) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["scripts/content.js"]
      });
    }
  });


