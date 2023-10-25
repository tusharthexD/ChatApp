const socket = io();



document.getElementById("chatBox").style.display ="none"
document.querySelector(".sendSection").style.display ="none";


function setName(){
    senderName = document.getElementById("name").value
    if(senderName != null && senderName != ''){

        document.getElementById("namesection").style.display ="none"
        document.getElementById("chatBox").style.display ="flex"
        document.querySelector(".sendSection").style.display ="block";
        }
    
}



var senderName = null


function sendMsg(){
    var msg = document.getElementById('msgInput').value
    
if(msg != "" && msg != null){
    socket.emit('randommessage',{sender: senderName, message: msg});
    const mynode = document.createElement("div");

    mynode.innerHTML = `<div class="mychats" ><h5>${senderName}</h5><p>${msg}</p></div>` 

document.getElementById("chatBox").appendChild(mynode);}
document.getElementById('msgInput').value = ""

scrollToEnd()

}

socket.on('randommessage', function(data) {
    
    const node = document.createElement("div");
    
    node.innerHTML = `<div class="chats" ><h5>${data.sender}</h5><p>${data.message}</p></div>` 
    
    
    document.getElementById("chatBox").appendChild(node);
    scrollToEnd()
    
})


function scrollToEnd(){
    var chatList = document.getElementById("chatBox");
	chatList.scrollTop = chatList.scrollHeight;
}
