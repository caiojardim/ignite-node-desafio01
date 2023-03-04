import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const tasks = database.select('tasks')
      res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const task = {
        id: randomUUID(),
        title: req.body.title,
        description: req.body.description,
        completed_at: null,
        created_at: Date.now(),
        updated_at: Date.now()
      }
      database.insert('tasks', task)
      return res.writeHead(201).end()
    } 
  },{
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      console.log(req.params, req.query)
      return res.writeHead(201).end()
    } 
  }
]