import { fastify } from "fastify";
import { DatabaseMemory } from './database-memory.js';

const server = fastify()

const database = new DatabaseMemory()

server.listen({
  port: 3333
})


// POST http://localhost:3333/videos
// PUT  http://localhost:3333/videos/:id


//rotas de chamada do server (fastify)
server.post('/videos', (request, reply) => {
  const { title, description, duration } = request.body

  console.log({ title, description, duration })

  database.create({
    title,
    description,
    duration,
  })
  
  return reply.status(201).send()
})

server.get('/videos', (request) => {  
  const search = request.query.search

  console.log(search)

  const videos = database.list(search)

  return videos
})

server.put('/videos/:id', (request, reply) => {
  const videoId = request.params.id
  const { title, description, duration } = request.body
  
 database.update(videoId, {
    title, description, duration
  })

  return reply.status(204).send()
})

server.delete('/videos/:id', (request, reply) => {
  const videoId = request.params.id
  
  database.delete(videoId)

  return reply.status(204).send()
})