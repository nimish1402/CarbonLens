chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received product data in background script:", request);
    sendResponse({ status: "success", data: request });
});