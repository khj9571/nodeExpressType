import { Request, Response } from 'express'

export function echo(req: Request, res: Response) {
  res.json(req.query)
}

let getUser = (req: Request , res: Response) => {

  console.log('파라메터')
  console.log(req.params)
  console.log(req.query)
  console.log(req.path)
  res.json({
    name:'홍길동',
    age:12
  })
}

let createUser = (req: Request , res: Response) => {
  res.json('createUser')  
}

let updateUser = (req: Request , res: Response) => {
  res.json('updateUser')  
}

let deleteUser = (req: Request, res: Response) => {
 res.json('updateUser')   
}


export default {
  getUser : getUser,
  createUser : createUser,
  updateUser : updateUser,
  deleteUser : deleteUser
}