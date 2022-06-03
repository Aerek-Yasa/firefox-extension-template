const storedBackgroundMessages = [];

browser.commands.onCommand.addListener(async (name) => {
    if (name === "example_shortcut") { // Specified in the manifest file.
        const tabs = await browser.tabs.query({
            currentWindow: true,
            active: true
        });
        if (tabs.length === 0) {
            return;
        }
        const tab = tabs[0]; // there can only be 1 active tab.
        browser.tabs.sendMessage(tab.id, {
            "id": "BACKGROUND_SCRIPT_MESSAGE",
            "message": "[EXAMPLE SHORTCUT WAS ACTIVATED]"
        });
    }
});


browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.id && message.id === "CONTENT_SCRIPT_MESSAGE") {
        storedBackgroundMessages.push(message); 
    }
    if (message.message && message.message === "GET_STORED_BACKGROUND_MESSAGES") {
        sendResponse(storedBackgroundMessages);
    }
});

console.log("This is a log from the background script");