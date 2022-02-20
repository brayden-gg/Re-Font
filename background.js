var firstload=true;
var font = "Default";
var sizeCheck = "";
var colorCheck = "";
var size="";
var color="";
var link =[];
var custom = [];
var master = true;
//var variables = {font:"",sizeCheck:"",colorCheck:"",size:"",color:""};
chrome.runtime.onMessage.addListener(recieve);

function recieve(request, sender, sendResponse) {
    if(request.requestVariables!==undefined){

        chrome.runtime.sendMessage({master:master,message: "You're Welcome", font: font, size: size, color: color, sizeCheck: sizeCheck, colorCheck: colorCheck, link: link,custom: custom});
        console.log({master:master,font: font, size: size, color: color, sizeCheck: sizeCheck, colorCheck: colorCheck,link: link,custom: custom});
        (function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {master:master,message: "You're Welcome",font: font, size: size, color: color, sizeCheck: sizeCheck, colorCheck: colorCheck,link: link,custom: custom}, function(response) {
            console.log("submitted");

            });
          });
        })()
    }else{
      master = request.master;
      font = request.font;
      size = request.size;
      color = request.color;
      colorCheck = request.colorCheck;
      sizeCheck = request.sizeCheck;
      link = request.link;
      custom =request.custom;
      console.log(request);
      (function(){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {master:master,font: font, size: size, color: color, sizeCheck: sizeCheck, colorCheck: colorCheck,link: link,custom: custom}, function(response) {
          console.log("submitted");

          });
        });
      })();

}
}


// chrome.tabs.onUpdated.addListener(function(){
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {font: font, size: size, color: color, sizeCheck: sizeCheck, colorCheck: colorCheck}, function(response) {
//
// console.log("load");
//     });
//   });
// });
