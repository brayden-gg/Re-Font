
function doesFontExist(fontName) { //Function is from https://gist.github.com/alloyking/4154494
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var text = "abcdefghijklmnopqrstuvwxyz0123456789";
    context.font = "72px monospace";
    var baselineSize = context.measureText(text).width;
    context.font = "72px '" + fontName + "', monospace";
    var newSize = context.measureText(text).width;
    delete canvas;
    if (newSize == baselineSize) {
        return false;
    } else {
        return true;
    }
}
var question = document.getElementById('question');
var bookmarklet = document.getElementById('bookmarklet');
var createBook = document.getElementById('createBook');
var select = document.getElementById('dropdown');
var input = document.getElementsByTagName('input');
var refresh=document.getElementById('refresh');
var colorCheck = document.getElementsByName('color');
var sizeCheck= document.getElementsByName('size');
var setNumber=document.getElementById('setNumber');
var selectNumber=document.getElementById('selectNumber');
var setColor=document.getElementById('setColor');
var selectColor=document.getElementById('selectColor');
var customFont=document.getElementById('customFont');
var customLink=document.getElementById('customLink');
var hide=document.getElementById('hide');
var addFont=document.getElementById('addFont');
var hideText=document.getElementById('hideText');
var option = document.getElementsByTagName('option');
var sizeForm = document.getElementById('size');
var colorForm = document.getElementById('color');
var font ="";
var size="";
var color="";
var selectedColor;
var selectedSize;
var link =[];
var custom = [];
var master;
var rels = ["Arial Black","Calibri","Century Gothic","Comic Sans MS","Consolas",
"Courier","Courier New","Garamond","Georgia","Gill Sans","Helvetica","Helvetica Neue","Impact",
"Lato","Lucida Sans","Open Sans","Oswald","Palatino","Raleway","Roboto","Raleway","Tahoma","Times","Times New Roman",
"Trebuchet MS","Space Mono","Verdana"];
var presetFonts = ["Apple Chancery","Arial","Arial Black","Baskerville","Book Antiqua","Bookman","Calibri","Century Gothic","Comic Sans MS","Consolas",
"Courier","Courier New","Cursive","Fantasy","Gadget","Garamond","Geneva","Georgia","Gill Sans","Helvetica",
"Helvetica Neue","Impact","Lato","Lucida Sans","Lucida Grande","Lucida Sans Unicode","Monospace","Myriad Pro","Open Sans","Oswald","Palatino",
"Palatino Linotype","Papyrus","Raleway","Roboto","Raleway","Tahoma","Times","Times New Roman",
"Trebuchet MS","Space Mono","Symbol","Verdana","Webdings","Wingdings","Zapfino"];
var actualFonts = new Array;
for (elt of presetFonts){
  if(doesFontExist(presetFonts[presetFonts.indexOf(elt)])||rels.includes(presetFonts[presetFonts.indexOf(elt)])){
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
function pressRefresh(tab){
  if(select.value=="Custom"){
    font=customFont.value;
  }else{
    font=select.value;
  }
  if(setNumber.value>0){
  setNumber.value=+(Math.abs(input[4].value)).toFixed(1);
  if(selectNumber.checked==true){
        size=setNumber.value;
  }
}
    for (elt of sizeCheck){
        if (elt.checked==true){
        selectedSize=elt.value;
        }
    }
    color=setColor.value;
    for (let elt of colorCheck){
        if (elt.checked==true){
            selectedColor = elt.value;
        }
    }
var msg = {master:input[0].checked, font: font,size: size, color: color, sizeCheck: selectedSize, colorCheck: selectedColor, link: link,custom:custom};
chrome.runtime.sendMessage(msg);
console.log(msg);
bookmarklet.style.display = 'none';
}




window.onload = function(){

chrome.runtime.sendMessage({requestVariables: true});
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if(request.font!==undefined){
    custom = request.custom;
    link = request.link;

    master = request.master;
    font= request.font;

  if(font==""){
  font="Default";
  }
    size= request.size;
    color= request.color;
    selectedColor= request.colorCheck;
    selectedSize= request.sizeCheck;
    for (i=0;i<custom.length;i++){
      let newOpt = document.createElement('option');
      newOpt.appendChild(document.createTextNode(custom[i]));
      select.appendChild(newOpt);
      newOpt.value = custom[i];
    }
    console.log(request);
  }

    select.value=font;
    input[0].checked=master;
    for (elt of colorCheck){
              if (elt.value==selectedColor){
                elt.checked=true;
                }
      }
      for (elt of sizeCheck){
                if (elt.value==selectedSize){
                  elt.checked=true;
                  }
        }
        setNumber.value=size;
        setColor.value=color;
});
bookmarklet.style.display = 'none';
var inHref = {};

createBook.addEventListener("click", function(){
  inHref = {
    begin:"javascript:(function(){var all = document.getElementsByTagName('*');for (elt of all){",
  font:(function(){
    if(font!==undefined&&font!=="Custom"){
      return "elt.style.fontFamily = '"+font+"';";
    }else{
      return "";
    }
  })(),
  size:(function(){
    if(selectedSize=="Custom"){
      return "elt.style.fontSize = "+size+";";
    }else if(selectedSize=="Random"){
      return "elt.style.fontSize=(Math.random()*10)+10+'px';";
    }else{
      return "";
    }
  })(),
  color:(function(){
    if(selectedColor=="Custom"){
      return "elt.style.color = "+color+";";
    }else if(selectedColor == "Random"){
      return "let rand = (Math.floor(Math.random()*16777215)); elt.style.color= '#'+rand.toString(16);";
    }else{
      return "";
    }
  })(),
  end:"}})()"};
  bookmarklet.setAttribute('href',inHref.begin+inHref.font+inHref.size+inHref.color+inHref.end);
  bookmarklet.style.display = 'block';
  console.log(inHref.begin+inHref.font+inHref.size+inHref.color+inHref.end);

});
question.addEventListener("click", function(){
alert("Bookmarklets allow you to execute code without even downloading anything. If you find a style you like, click \"Create Bookmarklet\" and drag it to your bookmarks bar. You can change the name and even share it with your firends, regardless of wheather they have Re-Font installed. However, the websites will go back to normal when you refresh the page.");
});
addFont.addEventListener("click", function(){
  link.push(customLink.value);
  custom.push(customFont.value);
  // for (i=0;i<custom.length;i++){
    let newOpt = document.createElement('option');
    newOpt.appendChild(document.createTextNode(custom[custom.indexOf(customFont.value)]));
    select.appendChild(newOpt);
    newOpt.value = custom[custom.indexOf(customFont.value)];
  // }
  select.value=custom[custom.indexOf(customFont.value)];
  hide.style.display="none";
  pressRefresh();
});

select.addEventListener("change", function(){
  bookmarklet.style.display = 'none';
  if(select.value==="Custom"){
    hide.style.display="block";
  }else{
    hide.style.display="none";
  }
pressRefresh();
});
let listeners = [setNumber, setColor, sizeForm, colorForm, input[0]];
for (elt of listeners){
  elt.addEventListener("change", pressRefresh);
}
