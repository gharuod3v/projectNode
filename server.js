import { fastify } from "fastify";
// import { DatabaseMemory } from './database-memory.js';
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify()

const database = new DatabasePostgres()

server.listen({
  port: 3333
})


// POST http://localhost:3333/videos
// PUT  http://localhost:3333/videos/:id


//rotas de chamada do server (fastify)
server.post('/videos', async (request, reply) => {
  const { title, description, duration } = request.body

  console.log({ title, description, duration })

  await database.create({
    title,
    description,
    duration,
  })
  
  return reply.status(201).send()
})

server.get('/videos', async (request) => {  
  const search = request.query.search

  console.log(search)

  const videos = await database.list(search)

  return videos
})

server.put('/videos/:id', async (request, reply) => {
  const videoId = request.params.id
  const { title, description, duration } = request.body
  
  await database.update(videoId, {
    title, description, duration
  })

  return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
  const videoId = request.params.id
  
  await database.delete(videoId)

  return reply.status(204).send()
})