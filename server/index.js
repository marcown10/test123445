import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

app.use(cors())
app.use(express.json())

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected')

  socket.on('createPost', (postData) => {
    io.emit('newPost', postData)
  })

  socket.on('addComment', (commentData) => {
    io.emit('newComment', commentData)
  })

  socket.on('likePost', (likeData) => {
    io.emit('postLiked', likeData)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
