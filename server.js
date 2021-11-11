'use strict'

const app = require('express')
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors:{origin: '*'}})
const PORT = 3001

io.on('connection', socket => {
  console.log(`Connected client : ${socket.id}`)

  // Join Room Handler
  socket.on('join', room => {
    socket.join(room)
    console.log(`User joined room: ${room}`)
  })
  
  // Leave Room Handler
  socket.on('leave', room => {
    socket.leave(room)
    console.log(`User left room: ${room}`)
  })

  // Message Handler
  socket.on('send-message', payload => {
    console.log('payload: ', payload)
    io.to(payload.room).emit('send-message', payload)
  })

  // User closes the window
  socket.on('disconnect', function(){
    console.log(`User disconnected: ${socket.id}`)
  })
})

server.listen(PORT, ()=>{
  console.log(`chat server @ PORT: ${PORT}...`)
})
