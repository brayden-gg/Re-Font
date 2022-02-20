let master;
let elements = {
    all: ["*"],
    para: ["p"],
    link: ["a"],
    list: ["li"],
    strong: ["b", "strong"],
    ital: ["i", "em"],
    sup: ["sup"],
    code: ["code"],
    input: ["form", "input"],
    head: ["h1", "h2", "h3", "h4", "h5", "h6"],
    // TODO: add ability for custom CSS selectors (possibly by right clicking an html element)
};

let styles = [];
let links = [];
let rels = ["Arial+Black", "Calibri", "Century+Gothic", "Comic+Sans+MS", "Consolas", "Courier", "Courier+New", "Garamond", "Georgia", "Gill+Sans", "Helvetica", "Helvetica+Neue", "Impact", "Lato", "Lucida+Sans", "Open+Sans", "Oswald", "Palatino", "Raleway", "Roboto", "Raleway", "Tahoma", "Times", "Times+New+Roman", "Trebuchet+MS", "Space+Mono", "Verdana"];
let addedStyles = [];

let preconnect1 = document.createElement("link");
preconnect1.setAttribute("rel", "preconnect");
preconnect1.setAttribute("href", "https://fonts.googleapis.com");
preconnect1.setAttribute("crossorigin", "");
document.head.appendChild(preconnect1);
links.push(preconnect1);

let preconnect2 = document.createElement("link");
preconnect2.setAttribute("rel", "preconnect");
preconnect2.setAttribute("href", "https://fonts.gstatic.com");
preconnect2.setAttribute("crossorigin", "");
document.head.appendChild(preconnect2);
links.push(preconnect2);

for (let rel of rels) {
    let link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", "https://fonts.googleapis.com/css?family=" + rel);
    document.head.appendChild(link);
    links.push(link);
}

function reFont() {
    // remove existing styles
    console.log(addedStyles.map(e => e.innerHTML));
    for (let addedStyle of addedStyles) {
        document.head.removeChild(addedStyle);
    }
    addedStyles = [];
    for (let style of styles) {
        for (let tagName of elements[style.applyTo]) {
            let newStyle = document.createElement("style");

            newStyle.innerHTML = `${tagName} {` + "\n";

            // change value to new ones
            if (style.font !== "Default") {
                // applyToStyle.fontFamily = style.font;
                newStyle.innerHTML += `font-family: "${style.font}" !important;` + "\n";
            }
            if (style.selectedSize == "Custom") {
                // applyToStyle.fontSize = style.fontSize + "px";
                newStyle.innerHTML += `font-size: ${style.size}px !important;` + "\n";
            }
            if (style.selectedSize == "Random") {
                // applyToStyle.fontSize = Math.random() * 10 + 10 + "px";
                newStyle.innerHTML += `font-size: ${Math.random() * 10 + 10}px !important;` + "\n";
            }
            if (style.selectedColor == "Custom") {
                // applyToStyle.color = style.color;
                newStyle.innerHTML += `color: ${style.color} !important;` + "\n";
            }
            if (style.selectedColor == "Random") {
                let rand = Math.floor(Math.random() * 16777215);
                // applyToStyle.color = "#" + rand.toString(16);
                newStyle.innerHTML += `color: #${rand.toString(16)} !important;` + "\n";
            }
            newStyle.innerHTML += "}";

            addedStyles.push(newStyle);
            document.head.appendChild(newStyle);
        }
    }
    console.log("reFonted");
}

chrome.runtime.sendMessage({
    requestVariables: true,
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    master = request.master;

    for (let i = 0; i < links.length; i++) {
        if (request.links.includes(links[i].getAttribute("href"))) {
            document.head.removeChild(links[i]);
            links.splice(i, 1);
        }
    }

    for (let i = 0; i < request.links.length; i++) {
        let link = document.createElement("link");
        links.push(link);
        document.head.appendChild(link);
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", request.links[i]);
        console.log(request.links);
    }

    if (master) {
        styles = request.styles;
    } else {
        styles = [
            {
                font: "Default",
                size: 12,
                color: "#000000",
                selectedSize: "",
                selectedColor: "",
                applyTo: "all",
            },
        ];
    }
    console.log(request);

    reFont();
});
window.onLoad = reFont;
