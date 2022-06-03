document.body.innerHTML = ""; // Clear
const inputField = document.createElement("input");
inputField.type = "text";
inputField.id = "input";
inputField.style.width = "100%";
inputField.placeholder = "Type message here";
const outputField = document.createElement("div");
outputField.id = "output";
const button = document.createElement("button");
button.style.cursor = "pointer";
button.style.border = "1px solid black";
button.onclick = sendMessageToBackground;
button.textContent = "Click here to send message to background";
document.body.appendChild(inputField);
document.body.appendChild(outputField);
document.body.appendChild(button);
browser.runtime.onMessage.addListener(handleMessage);

function sendMessageToBackground() {
    const inputField = document.getElementById("input");
    const message = inputField.value;
    browser.runtime.sendMessage({
        "id": "CONTENT_SCRIPT_MESSAGE",
        "message": message
    });
}

function handleMessage(message) {
    if (message.id && message.id === "BACKGROUND_SCRIPT_MESSAGE") {
        const outputField = document.getElementById("output");
        const elem = document.createElement("div");
        elem.textContent = message.id + " : " + message.message;
        outputField.appendChild(elem);
    }
}

console.log("This is a log from the content script");