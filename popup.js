document.addEventListener("DOMContentLoaded", () => {

const HF_TOKEN = "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";
const result = document.getElementById("result");

/* ---------------- AI SUMMARIZER ---------------- */

document.getElementById("summary").onclick = async () => {

result.innerText = "Extracting article and generating summary...";

const [tab] = await chrome.tabs.query({
active: true,
currentWindow: true
});

/* inject readability */

await chrome.scripting.executeScript({
target: { tabId: tab.id },
files: ["readability.js"]
});

/* extract article */

chrome.scripting.executeScript({
target: { tabId: tab.id },
function: () => {

const docClone = document.cloneNode(true);
const article = new Readability(docClone).parse();

if (!article) return null;

return {
title: article.title,
content: article.textContent
};

}

}, async (results) => {

try {

const article = results[0].result;

if (!article) {
result.innerText = "No readable article found.";
return;
}

/* limit text size for API */

const text = article.content.substring(0,3000);

const prompt =
"Provide a detailed summary of the following article in about 10-15 lines:\n\n" +
text;

const response = await fetch(
"https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
{
method: "POST",
headers: {
"Authorization": `Bearer ${HF_TOKEN}`,
"Content-Type": "application/json"
},
body: JSON.stringify({
inputs: prompt,
parameters: {
max_length: 400,
min_length: 200,
do_sample: false
},
options: { wait_for_model: true }
})
});

const data = await response.json();

console.log("HF response:", data);

let summary = "";

if (Array.isArray(data) && data[0].summary_text) {
summary = data[0].summary_text;
}
else if (data.error) {
summary = "API Error: " + data.error;
}
else {
summary = "Unexpected response format.";
}

result.innerHTML =
"<b>" + article.title + "</b><br><br>" + summary;

}
catch (err) {

console.error(err);
result.innerText = "Error generating summary.";

}

});

};


/* ---------------- FOCUS MODE ---------------- */

document.getElementById("focus").onclick = async () => {

const [tab] = await chrome.tabs.query({
active: true,
currentWindow: true
});

await chrome.scripting.executeScript({
target: { tabId: tab.id },
files: ["readability.js"]
});

chrome.scripting.executeScript({
target: { tabId: tab.id },
function: () => {

const docClone = document.cloneNode(true);
const article = new Readability(docClone).parse();

if (!article) {
alert("Unable to extract readable article.");
return;
}

/* clear page */

document.body.innerHTML = "";

/* reader layout */

const container = document.createElement("div");

container.style.maxWidth = "750px";
container.style.margin = "40px auto";
container.style.padding = "40px";
container.style.fontSize = "20px";
container.style.lineHeight = "1.8";
container.style.fontFamily = "Georgia, serif";
container.style.background = "#fdf6e3";

/* title */

const title = document.createElement("h1");
title.innerText = article.title;

/* content */

const content = document.createElement("div");
content.innerHTML = article.content;

container.appendChild(title);
container.appendChild(content);

document.body.appendChild(container);

}
});

};


/* ---------------- BIONIC READING ---------------- */

document.getElementById("bionic").onclick = async () => {

const [tab] = await chrome.tabs.query({
active: true,
currentWindow: true
});

chrome.scripting.executeScript({
target: { tabId: tab.id },
function: () => {

document.querySelectorAll("p").forEach(p => {

const words = p.innerText.split(" ");

const formatted = words.map(word => {

const half = Math.ceil(word.length / 2);

return "<b>" + word.substring(0, half) + "</b>" + word.substring(half);

}).join(" ");

p.innerHTML = formatted;

});

}
});

};
/* ---------------- ADVANCED READING GUIDE ---------------- */

document.getElementById("highlight").onclick = async () => {

const [tab] = await chrome.tabs.query({
active:true,
currentWindow:true
});

chrome.scripting.executeScript({
target:{tabId:tab.id},
function:()=>{

/* create dark overlay */

let overlayTop = document.getElementById("guide-top");
let overlayBottom = document.getElementById("guide-bottom");
let guide = document.getElementById("guide-line");

if(!guide){

overlayTop = document.createElement("div");
overlayBottom = document.createElement("div");
guide = document.createElement("div");

overlayTop.id="guide-top";
overlayBottom.id="guide-bottom";
guide.id="guide-line";

/* style overlays */

overlayTop.style.position="fixed";
overlayTop.style.left="0";
overlayTop.style.width="100%";
overlayTop.style.background="rgba(0,0,0,0.55)";
overlayTop.style.pointerEvents="none";
overlayTop.style.zIndex="999998";

overlayBottom.style.position="fixed";
overlayBottom.style.left="0";
overlayBottom.style.width="100%";
overlayBottom.style.background="rgba(0,0,0,0.55)";
overlayBottom.style.pointerEvents="none";
overlayBottom.style.zIndex="999998";

/* reading line */

guide.style.position="fixed";
guide.style.left="0";
guide.style.width="100%";
guide.style.height="34px";
guide.style.background="rgba(255, 255, 255, 0.35)";
guide.style.pointerEvents="none";
guide.style.zIndex="999999";

/* append */

document.body.appendChild(overlayTop);
document.body.appendChild(overlayBottom);
document.body.appendChild(guide);

}

/* move guide with mouse */

document.addEventListener("mousemove",(e)=>{

const y=e.clientY;

guide.style.top=(y-17)+"px";

overlayTop.style.top="0";
overlayTop.style.height=(y-17)+"px";

overlayBottom.style.top=(y+17)+"px";
overlayBottom.style.height=(window.innerHeight-(y+17))+"px";

});

}
});

};
/* ---------------- ADVANCED SENTENCE READER ---------------- */

document.getElementById("sentenceread").onclick = async () => {

const [tab] = await chrome.tabs.query({
active:true,
currentWindow:true
});

/* inject readability */

await chrome.scripting.executeScript({
target:{tabId:tab.id},
files:["readability.js"]
});

chrome.scripting.executeScript({
target:{tabId:tab.id},
function:()=>{

const docClone=document.cloneNode(true);
const article=new Readability(docClone).parse();

if(!article){
alert("No readable article found.");
return;
}

/* split sentences */

const sentences=article.textContent
.replace(/\n+/g," ")
.match(/[^.!?]+[.!?]+/g)||[];

let index=0;
let speed=2000;
let playing=true;

/* clear page */

document.body.innerHTML="";

/* main container */

const container=document.createElement("div");

container.style.display="flex";
container.style.flexDirection="column";
container.style.alignItems="center";
container.style.justifyContent="center";
container.style.height="100vh";
container.style.background="linear-gradient(135deg,#0f2027,#203a43,#2c5364)";
container.style.color="white";
container.style.fontFamily="Arial";
container.style.padding="40px";

/* title */

const title=document.createElement("div");
title.innerText=article.title;
title.style.fontSize="20px";
title.style.opacity="0.7";
title.style.marginBottom="20px";

container.appendChild(title);

/* sentence display */

const sentenceBox=document.createElement("div");

sentenceBox.style.fontSize="36px";
sentenceBox.style.textAlign="center";
sentenceBox.style.maxWidth="900px";
sentenceBox.style.lineHeight="1.6";
sentenceBox.style.marginBottom="30px";

container.appendChild(sentenceBox);

/* progress bar */

const progress=document.createElement("div");
progress.style.width="80%";
progress.style.height="6px";
progress.style.background="#555";
progress.style.borderRadius="4px";

const progressFill=document.createElement("div");
progressFill.style.height="6px";
progressFill.style.width="0%";
progressFill.style.background="#00e5ff";
progressFill.style.borderRadius="4px";

progress.appendChild(progressFill);

container.appendChild(progress);

/* controls */

const controls=document.createElement("div");
controls.style.marginTop="30px";
controls.style.display="flex";
controls.style.gap="20px";

/* buttons */

function makeButton(text){

const btn=document.createElement("button");

btn.innerText=text;
btn.style.padding="10px 16px";
btn.style.fontSize="16px";
btn.style.border="none";
btn.style.borderRadius="6px";
btn.style.cursor="pointer";
btn.style.background="#00e5ff";
btn.style.color="#000";

return btn;

}

const prevBtn=makeButton("prev");
const playBtn=makeButton("play");
const nextBtn=makeButton("Next");

controls.appendChild(prevBtn);
controls.appendChild(playBtn);
controls.appendChild(nextBtn);

container.appendChild(controls);

/* speed slider */

const speedLabel=document.createElement("div");
speedLabel.innerText="Speed: 2 sec";

const slider=document.createElement("input");
slider.type="range";
slider.min="500";
slider.max="5000";
slider.value="2000";

slider.oninput=()=>{
speed=slider.value;
speedLabel.innerText="Speed: "+(speed/1000)+" sec";
};

container.appendChild(speedLabel);
container.appendChild(slider);

document.body.appendChild(container);

/* sentence loop */

function updateSentence(){

sentenceBox.innerText=sentences[index];

progressFill.style.width=
((index+1)/sentences.length*100)+"%";

}

/* autoplay */

function loop(){

if(!playing) return;

index++;

if(index>=sentences.length){
playing=false;
return;
}

updateSentence();

setTimeout(loop,speed);

}

/* controls */

playBtn.onclick=()=>{

playing=!playing;

playBtn.innerText=playing?"Pause":"play";

if(playing) loop();

};

nextBtn.onclick=()=>{

if(index<sentences.length-1){
index++;
updateSentence();
}

};

prevBtn.onclick=()=>{

if(index>0){
index--;
updateSentence();
}

};

/* start */

updateSentence();
setTimeout(loop,speed);

}
});

};
/* ---------------- REMOVE DISTRACTIONS ---------------- */

document.getElementById("clean").onclick = async () => {

const [tab] = await chrome.tabs.query({
active: true,
currentWindow: true
});

chrome.scripting.executeScript({
target: { tabId: tab.id },
function: () => {

/* common distraction selectors */

const selectors = [
"nav",
"header",
"footer",
"aside",
".sidebar",
".ads",
".ad",
".advertisement",
".banner",
".popup",
".modal",
".cookie",
".comments",
".social",
".share",
".newsletter",
".subscribe",
".recommend",
".related",
".promo",
".sponsored",
"iframe"
];

/* remove them */

selectors.forEach(selector=>{
document.querySelectorAll(selector).forEach(el=>{
el.style.display="none";
});
});

/* remove floating elements */

document.querySelectorAll("*").forEach(el=>{

const style = window.getComputedStyle(el);

if(
style.position === "fixed" &&
parseInt(style.zIndex) > 100
){
el.style.display="none";
}

});

}
});

};

/* ---------------- TEXT TO SPEECH ---------------- */

document.getElementById("tts").onclick = async () => {

const [tab] = await chrome.tabs.query({
active:true,
currentWindow:true
});

/* inject readability */

await chrome.scripting.executeScript({
target:{tabId:tab.id},
files:["readability.js"]
});

chrome.scripting.executeScript({
target:{tabId:tab.id},
function:()=>{

const docClone = document.cloneNode(true);
const article = new Readability(docClone).parse();

if(!article){
alert("No readable article found.");
return;
}

/* stop any previous speech */

speechSynthesis.cancel();

/* prepare speech */

const text = article.textContent.substring(0,5000);

const utterance = new SpeechSynthesisUtterance(text);

utterance.rate = 1;
utterance.pitch = 1;
utterance.volume = 1;

/* optional: choose voice */

const voices = speechSynthesis.getVoices();
if(voices.length>0){
utterance.voice = voices[0];
}

/* speak */

speechSynthesis.speak(utterance);

}
});

};

document.getElementById("stoptts").onclick = async () => {

const [tab] = await chrome.tabs.query({
active:true,
currentWindow:true
});

chrome.scripting.executeScript({
target:{tabId:tab.id},
function:()=>{

speechSynthesis.cancel();

}
});

};

/* ---------------- DIGIT HIGHLIGHTER ---------------- */

document.getElementById("highlightDigits").onclick = async () => {

const [tab] = await chrome.tabs.query({
active:true,
currentWindow:true
});

chrome.scripting.executeScript({
target:{tabId:tab.id},
function: highlightDigits
});

};

function highlightDigits(){

const regex = /\d+/g;

function walk(node){

if(node.nodeType === 3){

if(regex.test(node.nodeValue)){

const span=document.createElement("span");

span.innerHTML=node.nodeValue.replace(regex,(num)=>{
return `<span style="background:#ffeb3b;color:#000;padding:2px;border-radius:3px;font-weight:bold;">${num}</span>`;
});

node.parentNode.replaceChild(span,node);

}

}

else if(node.nodeType===1 && node.childNodes && !["SCRIPT","STYLE"].includes(node.tagName)){

for(let i=0;i<node.childNodes.length;i++){
walk(node.childNodes[i]);
}

}

}

walk(document.body);

}

/* ---------------- RESET PAGE ---------------- */

document.getElementById("reset").onclick = async () => {

const [tab] = await chrome.tabs.query({
active: true,
currentWindow: true
});

chrome.tabs.reload(tab.id);

};

});