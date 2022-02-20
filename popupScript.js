let addFont = document.getElementById('addFont');
let pressRefreshElt = document.getElementsByClassName('pressRefresh');
let bookmarklet = document.getElementById('bookmarklet');
let select = document.getElementById('dropdown');
let input = document.getElementsByTagName('input');
let refresh = document.getElementById('refresh');
let selectedColor = document.getElementsByName('color');
let selectedSize = document.getElementsByName('size');
let setNumber = document.getElementById('setNumber');
let selectNumber = document.getElementById('selectNumber');
let setColor = document.getElementById('setColor');
let selectColor = document.getElementById('selectColor');
let customFont = document.getElementById('customFont');
let customLink = document.getElementById('customLink');
let hide = document.getElementById('hide');
let hideText = document.getElementById('hideText');
let option = document.getElementsByTagName('option');
let sizeForm = document.getElementById('size');
let colorForm = document.getElementById('color');
let question = document.getElementById('question');
let createBook = document.getElementById('createBook');

let data = {
  master: true,
  font: "Default",
  size: "",
  color: "",
  links: [],
  custom: []
};
let rels = ["Arial Black", "Calibri", "Century Gothic", "Comic Sans MS", "Consolas",
  "Courier", "Courier New", "Garamond", "Georgia", "Gill Sans", "Helvetica", "Helvetica Neue", "Impact",
  "Lato", "Lucida Sans", "Open Sans", "Oswald", "Palatino", "Raleway", "Roboto", "Raleway", "Tahoma", "Times", "Times New Roman",
  "Trebuchet MS", "Space Mono", "Verdana"
];
let presetFonts = ["Apple Chancery", "Arial", "Arial Black", "Baskerville", "Book Antiqua", "Bookman", "Calibri", "Century Gothic", "Comic Sans MS", "Consolas",
  "Courier", "Courier New", "Cursive", "Fantasy", "Gadget", "Garamond", "Geneva", "Georgia", "Gill Sans", "Helvetica",
  "Helvetica Neue", "Impact", "Lato", "Lucida Sans", "Lucida Grande", "Lucida Sans Unicode", "Monospace", "Myriad Pro", "Open Sans", "Oswald", "Palatino",
  "Palatino Linotype", "Papyrus", "Raleway", "Roboto", "Raleway", "Tahoma", "Times", "Times New Roman",
  "Trebuchet MS", "Space Mono", "Symbol", "Verdana", "Webdings", "Wingdings", "Zapfino"
];
let actualFonts = [];
for (elt of presetFonts) {
  if (doesFontExist(presetFonts[presetFonts.indexOf(elt)]) || rels.includes(presetFonts[presetFonts.indexOf(elt)])) {
    let newOpt = document.createElement('option');
    newOpt.appendChild(document.createTextNode(elt));
    select.appendChild(newOpt);
    newOpt.value = elt;
    actualFonts.push(elt);
  }
}

let newOpt = document.createElement('option');
newOpt.appendChild(document.createTextNode('--Add Font--'));
select.appendChild(newOpt);
newOpt.value = "Custom";



chrome.runtime.sendMessage({
  requestVariables: true
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.font) {
    data = request;
    for (i = 0; i < data.custom.length; i++) {
      let newOpt = document.createElement('option');
      newOpt.appendChild(document.createTextNode(data.custom[i]));
      select.appendChild(newOpt);
      newOpt.value = data.custom[i];
    }
    console.log(data);
  }

  select.value = data.font;
  input[0].checked = data.master;
  for (elt of selectedColor) {
    if (elt.value == selectedColor) {
      elt.checked = true;
    }
  }
  for (elt of selectedSize) {
    if (elt.value == selectedSize) {
      elt.checked = true;
    }
  }
  if (data.size) {
    setNumber.value = data.size;
  }
  if (data.color) {
    setColor.value = data.color;
  }
});

bookmarklet.style.display = 'none';

createBook.addEventListener('change', () => {
  let href = "javascript:(() => {let all = document.getElementsByTagName('*');for (elt of all){";
  href += data.font && data.font !== "Custom" ? "elt.style.fontFamily = '" + data.font + "';" : ""
  href += selectedSize == "Custom" ? "elt.style.fontSize = " + data.size + ";" : (data.selectedSize == "Random" ? "elt.style.fontSize=(Math.random()*10)+10+'px';" : "");
  href += selectedColor == "Custom" ? "elt.style.color = " + data.color + ";" : (data.selectedColor == "Random" ? "let rand = (Math.floor(Math.random()*16777215)); elt.style.color= '#'+rand.toString(16);" : "")
  href += "}})()";
  bookmarklet.setAttribute('href', href);
  bookmarklet.style.display = 'block';
  console.log(href);
});


addFont.addEventListener('click', () => {
  data.link.push(customLink.value);
  data.custom.push(customFont.value);

  let newOpt = document.createElement('option');
  newOpt.appendChild(document.createTextNode(data.custom[data.custom.indexOf(customFont.value)]));
  select.appendChild(newOpt);
  newOpt.value = data.custom[data.custom.indexOf(customFont.value)];

  select.value = data.custom[data.custom.indexOf(customFont.value)];
  hide.style.display = "none";
  pressRefresh();
});

function dropdownChange() {
  bookmarklet.style.display = 'none';
  if (select.value === "Custom") {
    hide.style.display = "block";
  } else {
    hide.style.display = "none";
  }
  pressRefresh();
}

function pressRefresh(tab) {
  if (select.value == "Custom") {
    data.font = customFont.value;
  } else {
    data.font = select.value;
  }
  if (setNumber.value > 0) {
    setNumber.value = +(Math.abs(input[4].value)).toFixed(1);
    if (selectNumber.checked) {
      data.size = setNumber.value;
    }
  }
  for (elt of selectedSize) {
    if (elt.checked) {
      selectedSize = elt.value;
    }
  }
  data.color = setColor.value;
  for (let elt of selectedColor) {
    if (elt.checked) {
      selectedColor = elt.value;
    }
  }

  data.master = input[0].checked;
  chrome.runtime.sendMessage(data);
  console.log(data);
  bookmarklet.style.display = 'none';
}

function doesFontExist(fontName) { //Function is from https://gist.github.com/alloyking/4154494
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  let text = "abcdefghijklmnopqrstuvwxyz0123456789";
  context.font = "72px monospace";
  let baselineSize = context.measureText(text).width;
  context.font = "72px '" + fontName + "', monospace";
  let newSize = context.measureText(text).width;
  delete canvas;
  return newSize == baselineSize;
}

for (let elt of pressRefreshElt){
  elt.addEventListener('change', pressRefresh);
}

select.addEventListener('change', dropdownChange);

question.addEventListener('click', ()=>alert(`Bookmarklets allow you to execute code without even downloading anything. If you find a style you like, click "Create Bookmarklet" and drag it to your bookmarks bar. You can change the name and even share it with your firends, regardless of whether they have Re-Font installed. However, the websites will go back to normal when you refresh the page.`));

