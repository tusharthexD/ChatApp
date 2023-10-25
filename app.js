import express from 'express';
import { createServer } from 'node:http'
import { join } from 'node:path'
import { Server } from 'socket.io'


const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 3000
var rooms = []


app.use(express.static("public"))

io.on('connection', (socket) => {

  socket.on("createRoom", ()=>{
    const roomUniqueId = makeid(6)
    rooms[roomUniqueId] = {}
    socket.join(roomUniqueId)

    socket.emit("newRoom", {roomUniqueId: roomUniqueId})
   })

   socket.on("joinRoom", (data)=>{
    if(rooms[data.roomUniqueId] != null){
     socket.join(data.roomUniqueId)
     socket.to(data.roomUniqueId).emit("roomCreated", {})
     socket.emit("roomCreated")
    }
    })

  socket.on("chat message", (data)=>{
        
      socket.to(data.roomUniqueId).emit("chat message", data)
        
    
      }) 
    
  socket.on("randommessage", (data)=>{
        socket.broadcast.emit('randommessage', data);
      }) 

  });  

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/rooms', (req, res) => {
  res.render('chat.ejs')
})

app.get('/randomGC', (req, res) => {
  res.render('randomgroupchat.ejs')
})

app.get('/*', (req, res) => {
 res.redirect("/")
})



function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});