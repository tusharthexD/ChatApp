const socket = io();
var senderName = null
var roomUniqueId = null


document.getElementById("Initial").style.display ="none"
document.getElementById("chatBox").style.display ="none"
document.querySelector(".sendSection").style.display ="none";


function setName(){
    senderName = document.getElementById("name").value
    if(senderName != null && senderName != ''){

    document.getElementById("namesection").style.display ="none"
    document.getElementById("Initial").style.display ="block"
    }
}

function createRoom(){
    socket.emit("createRoom")
    console.log("impressed")
}


function joinRoom(){
    roomUniqueId = document.getElementById("roomUniqueId").value
    socket.emit("joinRoom", {roomUniqueId: roomUniqueId})
  }
  

socket.on("newRoom", (data)=>{
    console.log("im activate")
    roomUniqueId = data.roomUniqueId
    document.getElementById("Initial").style.display = "none";
    document.getElementById("waitingArea").style.display = "block";
    document.getElementById("waitingArea").innerHTML = `<div id="waitingarea"><h3>Waiting for your friend to join please share the code with your friend "<span id="roomcode" >${roomUniqueId}</span>"</h3><button class="btn2" onclick="copyToClipboard('#roomcode')">Copy Code</button></div>`;
})
function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
  }
  

socket.on("roomCreated", ()=>{
   document.getElementById("waitingArea").style.display ="none"
   document.getElementById("Initial").style.display = "none";  
   document.getElementById("chatBox").style.display ="flex"
document.querySelector(".sendSection").style.display ="block";                 
})

function sendMsg(){
    var msg = document.getElementById('msgInput').value
    

if(msg != "" && msg != null){
    socket.emit('chat message',{sender: senderName, message: msg, roomUniqueId: roomUniqueId});
    const mynode = document.createElement("div");

    mynode.innerHTML = `<div class="mychats" ><h5>${senderName}</h5><p>${msg}</p></div>` 

document.getElementById("chatBox").appendChild(mynode);}
document.getElementById('msgInput').value = ""

scrollToEnd()

}

function scrollToEnd(){
    var chatList = document.getElementById("chatBox");
	chatList.scrollTop = chatList.scrollHeight;
}


socket.on('chat message', function(data) {
console.log("yes my turn")

const node = document.createElement("div");

node.innerHTML = `<div class="chats" ><h5>${data.sender}</h5><p>${data.message}</p></div>` 


document.getElementById("chatBox").appendChild(node);
scrollToEnd()

 })