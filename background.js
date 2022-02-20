let firstload = true;
let data = {
  master: true,
  font: "Default",
  size: "",
  color: "",
  selectedSize: "",
  selectedColor: "",
  links: [],
  custom: []
};


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.requestVariables) {
    chrome.runtime.sendMessage(data);
  } else {
    data = request;
  }
  console.log(data);
  let info = {
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(info, tabs => chrome.tabs.sendMessage(tabs[0].id, data, () => console.log("submitted")));
});

// chrome.tabs.onUpdated.addListener(function(){
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {font: font, size: size, color: color, selectedSize: selectedSize, selectedColor: selectedColor}, function(response) {
//
// console.log("load");
//     });
//   });
// });