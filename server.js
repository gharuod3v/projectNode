// import { createServer } from 'node:http'

// const server = createServer((req, res) => {
//   res.write('testando script do node')

//   return res.end()
// })

// server.listen(3333) //localhost:3333

import { fastify } from "fastify";

const server = fastify()

server.get('/', () => {
  return 'testando rota raiz'
})

server.get('/hello', () => {
  return 'Essa já é a rota do Hello world'
})

server.get('/teste', () => {
  return 'Essa rota é só um terceiro exemplo'
})

server.listen({
  port: 3333
})