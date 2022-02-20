let firstload = true;

let data = {
    master: true,
    styles: [
        {
            font: "Default",
            size: 12,
            color: "#000000",
            selectedSize: "",
            selectedColor: "",
            applyTo: "all",
        },
    ],
    links: [],
    custom: [],
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.requestVariables) {
        chrome.runtime.sendMessage(data);
    } else {
        data = request;
    }
    console.log(data);
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true,
        },
        tabs => {
            console.log(tabs);
            chrome.tabs.sendMessage(tabs[0].id, data);
        }
    );
});
