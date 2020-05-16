import { Request, Response } from 'express'
import createUser from './services/CreateUser'

export function helloWorld(request: Request, response: Response) {
  const user = createUser({ 
    name: 'Roberto', 
    email: 'contato@roberto.com', 
    password: '123456', 
    techs: ['Node', { title: 'JS', experience: 100 }]
  })

  return response.json({ user })
}