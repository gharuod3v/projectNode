import { randomUUID } from 'node:crypto'
import { sql } from './db.js'

export class DatabasePostgres {
  #videos = new Map()

 async list(search) {
   let videos
   
   if (search) {
    videos = await sql`
      SELECT * from videos WHERE title ILIKE "%${search}%"
    `
   } else {
    videos = await sql`
      SELECT * from videos
    `
   }

   return videos
  }

  async create(video) {
    const videoId = randomUUID()
    const { title, description, duration } = video

    await sql`
      INSERT into videos (id, title, description, duration) 
      VALUES (${videoId}, ${title}, ${description}, ${duration})
    `
    .then(() => {
      console.log('Video criado com sucesso!')
    })
  }

  update(id, video) {

  }

  delete(id) {

  }
}