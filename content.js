var all = document.getElementsByTagName("*");
let data = {
  font: "Default",
  color: "",
  size: "",
  links: [],
}

var rels = ["Arial+Black", "Calibri", "Century+Gothic", "Comic+Sans+MS", "Consolas",
  "Courier", "Courier+New", "Garamond", "Georgia", "Gill+Sans", "Helvetica", "Helvetica+Neue", "Impact",
  "Lato", "Lucida+Sans", "Open+Sans", "Oswald", "Palatino", "Raleway", "Roboto", "Raleway", "Tahoma", "Times", "Times+New+Roman",
  "Trebuchet+MS", "Space+Mono", "Verdana"
];


for (i = 0; i < rels.length; i++) {
  data.links.push(document.createElement('link'));
  document.head.appendChild(data.links[i]);
  data.links[i].setAttribute('rel', 'stylesheet');
  data.links[i].setAttribute('type', 'text/css');
  data.links[i].setAttribute('href', 'https://fonts.googleapis.com/css?family=' + rels[i]);
}

function reFont() {
  for (instances of all) {
    instances.style.fontFamily = "";
    if (data.font !== "Default") {
      instances.style.fontFamily = data.font;
    }
    instances.style.fontSize = "";
    if (data.selectedSize == "Custom") {
      instances.style.fontSize = data.size + "px";
    }
    if (data.selectedSize == "Random") {
      instances.style.fontSize = (Math.random() * 10) + 10 + "px";
    }
    instances.style.color = "";
    if (data.selectedColor == "Custom") {
      instances.style.color = data.color;
    }
    if (data.selectedColor == "Random") {
      let rand = (Math.floor(Math.random() * 16777215));
      instances.style.color = '#' + rand.toString(16);

    }
  }
  console.log('reFonted')
}

chrome.runtime.sendMessage({
  requestVariables: true
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  data.master = request.master;
  if (request.font) {
    if (request.links.length !== 0) {
      data.links.push(document.createElement('link'));
      document.head.appendChild(data.links[data.links.length - 1]);
      data.links[links.length - 1].setAttribute('rel', 'stylesheet');
      data.links[links.length - 1].setAttribute('type', 'text/css');
      data.links[links.length - 1].setAttribute('href', request.links[request.font.indexOf(request.font)]);
      console.log(request.links);
      console.log(request.font);
      console.log(request.font.indexOf(request.font));
    }
  }
  if (data.master) {
    data = request;
  } else {
    data = {
      font: "Default",
      color: "",
      selectedSize: "",
      selectedColor: "",
      size: "",
    }
  }
  console.log(data);

  reFont();

});
reFont();