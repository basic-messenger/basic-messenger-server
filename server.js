'use strict'

const app = require('express')
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors:{origin: '*'}})
const PORT = 8000

io.on('connection', socket => {
  console.log(`connected client : ${socket.id}`)

  socket.on('client-chatter', (payload) => {
    console.log('payload: ',payload)
    io.emit('client-chatter',payload)
  })

  socket.on('disconnect', ()=>{
    console.log(`disconnected client: ${socket.id}`)
    io.emit('disconect', `${socket.id} has disconected`)
  })

})

server.listen(PORT, ()=>{
  console.log(`chat server @ PORT: ${PORT}...`)
})
