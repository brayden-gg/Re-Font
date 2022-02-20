var master;
var sizeCheck;
var colorCheck;
var all = document.getElementsByTagName("*");
var font="";
var color="";
var size="";
var links = [];
var rels = ["Arial+Black","Calibri","Century+Gothic","Comic+Sans+MS","Consolas",
"Courier","Courier+New","Garamond","Georgia","Gill+Sans","Helvetica","Helvetica+Neue","Impact",
"Lato","Lucida+Sans","Open+Sans","Oswald","Palatino","Raleway","Roboto","Raleway","Tahoma","Times","Times+New+Roman",
"Trebuchet+MS","Space+Mono","Verdana"];
let oldStyle = [];

for (i=0;i<rels.length;i++){
links.push(document.createElement('link'));
document.head.appendChild(links[i]);
links[i].setAttribute('rel', 'stylesheet');
links[i].setAttribute('type', 'text/css');
links[i].setAttribute('href', 'https://fonts.googleapis.com/css?family='+rels[i]);
}


for(let i = 0; i < all.length; i++){
  oldStyle[i] = {
    fontFamily: all[i].style.fontFamily,
    fontSize: all[i].style.fontSize,
    color: all[i].style.color,
  };
}
reFont();

function reFont(){
    for (let i = 0; i < all.length; i++){
      let instances = all[i];
      if(oldStyle[i]){
        instances.style.fontFamily = oldStyle[i].fontFamily;
        instances.style.fontSize = oldStyle[i].fontSize;
        instances.style.color = oldStyle[i].color;
      }else{
        instances.style.fontFamily = "";
        instances.style.fontSize = "";
        instances.style.color = "";
      }

      if(font!=="Default" && master){
          instances.style.fontFamily= font;
        }
        if(sizeCheck=="Custom" && master){
        instances.style.fontSize=size+"px";
        }
        if(sizeCheck=="Random" && master){
            instances.style.fontSize=(Math.random()*10)+10+"px";
        }
        if(colorCheck=="Custom" && master){
            instances.style.color= color;
        }
        if(colorCheck=="Random" && master){
            let rand = (Math.floor(Math.random()*16777215));
            instances.style.color= '#'+rand.toString(16);

      }
    }
console.log('reFonted')
}

chrome.runtime.sendMessage({requestVariables: true});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  master = request.master;
    if(request.font!==undefined){
      if(request.link.length!==0){
        links.push(document.createElement('link'));
        document.head.appendChild(links[links.length-1]);
        links[links.length-1].setAttribute('rel', 'stylesheet');
        links[links.length-1].setAttribute('type', 'text/css');
        links[links.length-1].setAttribute('href', request.link[request.font.indexOf(request.font)]);
      }
    }
    if(master==true){
    font = request.font;
    color = request.color;
    sizeCheck=request.sizeCheck;
    colorCheck=request.colorCheck;
    size = request.size;
  }else{
    font = "Default";
    color = "";
    sizeCheck="";
    colorCheck="";
    size = "";
  }

  reFont();

});

