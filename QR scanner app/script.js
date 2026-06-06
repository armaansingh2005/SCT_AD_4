const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");

tabs.forEach(tab=>{
tab.addEventListener("click",()=>{

tabs.forEach(t=>t.classList.remove("active"));
contents.forEach(c=>c.classList.remove("active"));

tab.classList.add("active");

document
.getElementById(tab.dataset.tab)
.classList.add("active");
});
});

const result = document.getElementById("result");
const historyList = document.getElementById("historyList");

function saveHistory(text){

let history =
JSON.parse(localStorage.getItem("qrHistory")) || [];

history.unshift(text);

history = history.slice(0,20);

localStorage.setItem(
"qrHistory",
JSON.stringify(history)
);

renderHistory();
}

function renderHistory(){

historyList.innerHTML="";

const history =
JSON.parse(localStorage.getItem("qrHistory")) || [];

history.forEach(item=>{

const li=document.createElement("li");

li.textContent=item;

historyList.appendChild(li);
});
}

renderHistory();

function onScanSuccess(decodedText){

result.textContent=decodedText;

saveHistory(decodedText);
}

const scanner =
new Html5QrcodeScanner(
"reader",
{
fps:10,
qrbox:250
}
);

scanner.render(onScanSuccess);

document
.getElementById("copyScan")
.addEventListener("click",()=>{

navigator.clipboard.writeText(
result.textContent
);

alert("Copied");
});

document
.getElementById("openLink")
.addEventListener("click",()=>{

const text=result.textContent;

if(text.startsWith("http")){
window.open(text,"_blank");
}
});

const qrDiv =
document.getElementById("qrcode");

document
.getElementById("generateBtn")
.addEventListener("click",()=>{

const text =
document.getElementById("qrText").value;

qrDiv.innerHTML="";

new QRCode(qrDiv,{
text:text,
width:250,
height:250
});

saveHistory("Generated: "+text);
});

document
.getElementById("downloadBtn")
.addEventListener("click",()=>{

const img =
document.querySelector("#qrcode img");

if(!img) return;

const a=document.createElement("a");

a.href=img.src;

a.download="qrcode.png";

a.click();
});