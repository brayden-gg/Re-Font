function doesFontExist(fontName) {
    //Function is from https://gist.github.com/alloyking/4154494
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    let text = "abcdefghijklmnopqrstuvwxyz0123456789";
    context.font = "72px monospace";
    let baselineSize = context.measureText(text).width;
    context.font = "72px '" + fontName + "', monospace";
    let newSize = context.measureText(text).width;
    delete canvas;
    if (newSize == baselineSize) {
        return false;
    } else {
        return true;
    }
}

let elements = {
    newStyle: document.getElementById("newStyle"),
    masterBox: document.getElementById("masterBox"),
    outerDiv: document.getElementById("outerDiv"),
    question: document.getElementById("question"),
    bookmarklet: document.getElementById("bookmarklet"),
    createBook: document.getElementById("createBook"),
    // refresh: document.getElementsByClassName('refresh'),
};

let rels = ["Arial Black", "Calibri", "Century Gothic", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Garamond", "Georgia", "Gill Sans", "Helvetica", "Helvetica Neue", "Impact", "Lato", "Lucida Sans", "Open Sans", "Oswald", "Palatino", "Raleway", "Roboto", "Raleway", "Tahoma", "Times", "Times New Roman", "Trebuchet MS", "Space Mono", "Verdana"];
let presetFonts = ["Apple Chancery", "Arial", "Arial Black", "Baskerville", "Book Antiqua", "Bookman", "Calibri", "Century Gothic", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Cursive", "Fantasy", "Gadget", "Garamond", "Geneva", "Georgia", "Gill Sans", "Helvetica", "Helvetica Neue", "Impact", "Lato", "Lucida Sans", "Lucida Grande", "Lucida Sans Unicode", "Monospace", "Myriad Pro", "Open Sans", "Oswald", "Palatino", "Palatino Linotype", "Papyrus", "Raleway", "Roboto", "Raleway", "Tahoma", "Times", "Times New Roman", "Trebuchet MS", "Space Mono", "Symbol", "Verdana", "Webdings", "Wingdings", "Zapfino"];
let links = [];
let custom = [];
let master;

let styles = [];

function start() {
    outerDiv.innerHTML = "";

    for (let i = 0; i < styles.length; i++) {
        let style = styles[i];
        outerDiv.appendChild(style.elt);

        style.deleteStyle.addEventListener("click", () => {
            styles.splice(i, 1);
            console.log(i);
            start();
            pressRefresh();
        });

        style.dropdown.addEventListener("change", function () {
            bookmarklet.style.display = "none";
            style.hide.style.display = style.dropdown.value === "Custom" ? "block" : "none";
            if (style.dropdown.value != "Custom") {
                pressRefresh();
            }
        });

        style.addFont.addEventListener("click", function () {
            let font = style.customFont.value;

            links.push(style.customLink.value);
            custom.push(font);

            let newOpt = document.createElement("option");
            newOpt.innerText = font;
            newOpt.value = font;
            style.dropdown.appendChild(newOpt);

            style.dropdown.value = font;
            style.hide.style.display = "none";
            pressRefresh();
        });

        for (let option of style.colorFormOptions) {
            option.addEventListener("change", () => {
                style.selectedColor = option.value;
                pressRefresh();
            });
        }

        for (let option of style.sizeFormOptions) {
            option.addEventListener("change", () => {
                style.selectedSize = option.value;
                pressRefresh();
            });
        }

        style.applyToSelect.addEventListener("change", pressRefresh);
        style.setNumber.addEventListener("change", pressRefresh);
        style.setColor.addEventListener("change", pressRefresh);
    }

    elements.masterBox.checked = master;
}

function addStyle() {
    let add = new StyleBox({
        font: "",
        size: 12,
        color: "#000",
        applyTo: "all",
        selectedColor: "",
        selectedSize: "",
    });
    styles.push(add);

    start();
    pressRefresh();
}

function pressRefresh() {
    for (let style of styles) {
        style.send();
        style.update();
    }
    let msg = {
        master: masterBox.checked,
        styles,
        links,
        custom,
    };
    chrome.runtime.sendMessage(msg);
    bookmarklet.style.display = "none";
}

function createBook() {
    // let href = "javascript:(function(){let all = document.getElementsByTagName('*');for (let elt of all){" +
    //   styles[i].font !== undefined && styles[i].font !== "Custom" ? "elt.style.fontFamily = '" + styles[i].font + "';" : "" +
    //   styles[i].selectedSize == "Custom" ? "elt.style.fontSize = " + styles[i].size + ";" : styles[i].selectedSize == "Random" ? "elt.style.fontSize=(Math.random()*10)+10+'px';" : "" +
    //   styles[i].selectedColor == "Custom" ? "elt.style.color = " + stylescolor + ";" : styles[i].selectedColor == "Random" ? "let rand = (Math.floor(Math.random()*16777215)); elt.style.color= '#'+rand.toString(16);" : "" +
    //   "}})()"

    let href = `javascript:(()=>{
        let styles = ${JSON.stringify(styles)};
        let rels = ["Arial+Black", "Calibri", "Century+Gothic", "Comic+Sans+MS", "Consolas", "Courier", "Courier+New", "Garamond", "Georgia", "Gill+Sans", "Helvetica", "Helvetica+Neue", "Impact", "Lato", "Lucida+Sans", "Open+Sans", "Oswald", "Palatino", "Raleway", "Roboto", "Raleway", "Tahoma", "Times", "Times+New+Roman", "Trebuchet+MS", "Space+Mono", "Verdana"];
        let links = ${JSON.stringify(links)};

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
        };

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
        }
        

        for (let style of styles) {
            for (let tagName of elements[style.applyTo]) {
                let newStyle = document.createElement("style");

                newStyle.innerHTML = tagName + " {";

                if (style.font !== "Default") {
                    newStyle.innerHTML += 'font-family: "' + style.font + '" !important;'
                }
                if (style.selectedSize == "Custom") {
                    newStyle.innerHTML += 'font-size: ' + style.size + 'px !important;'
                }
                if (style.selectedSize == "Random") {
                    newStyle.innerHTML += 'font-size: ' + Math.random() * 10 + 10 + 'px !important;'
                }
                if (style.selectedColor == "Custom") {
                    newStyle.innerHTML += 'color: ' + style.color + ' !important;'
                }
                if (style.selectedColor == "Random") {
                    let rand = Math.floor(Math.random() * 16777215);
                    newStyle.innerHTML += 'color: #' + rand.toString(16) + ' !important;';
                }
                newStyle.innerHTML += "}";

                document.head.appendChild(newStyle);
                console.log(newStyle.innerHTML)
            }
        }

    })()`;

    bookmarklet.setAttribute("href", encodeURI(href));
    bookmarklet.style.display = "block";
}

question.addEventListener("click", function () {
    alert('Bookmarklets allow you to execute code temporarily without downloading anything. If you find a style you like, click "Create Bookmarklet" and drag it to your bookmarks bar. You can change the name and share it with your firends, even if they don\'t have Re-Font installed. However, the websites will go back to normal when you refresh the page.');
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    styles = request.styles.map(e => new StyleBox(e));
    custom = request.custom;
    links = request.links;
    master = request.master;
    for (let style of styles) {
        if (style.font !== undefined) {
            style.font = style.font || "Default";

            for (let j = 0; j < custom.length; j++) {
                let newOpt = document.createElement("option");
                newOpt.innerText = custom[j];
                style.dropdown.appendChild(newOpt);
                newOpt.value = custom[j];
            }

            style.update();
            // style.send();
        }
    }

    for (let style of styles) {
        style.update();
        // style.send();
    }
    start();
});

bookmarklet.style.display = "none";
elements.newStyle.addEventListener("click", addStyle);
elements.masterBox.addEventListener("click", pressRefresh);
elements.createBook.addEventListener("click", createBook);

chrome.runtime.sendMessage({
    requestVariables: true,
});
