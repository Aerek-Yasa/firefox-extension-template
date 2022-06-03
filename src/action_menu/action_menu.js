browser.runtime.sendMessage({
    "id": "ACTION_MENU_MESSAGE",
    "message": "GET_STORED_BACKGROUND_MESSAGES"
}).then((response) => {
    for (const message of response) {
        const elem = document.createElement("div");
        elem.textContent = message.id + " : "  + message.message;
        document.body.appendChild(elem);
    }
});
console.log("This is a log from the action menu");