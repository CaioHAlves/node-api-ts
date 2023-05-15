import { Request, Response } from 'express'
import { User } from '../../models/user'

export class UserCreate {
  static async create(req: Request, res: Response) {
    const { name, password } = req.body

    User.create({
      name, password
    })
      .then(() => {
        return res.status(200).json({
          name, password
        })
      })
      .catch(() => {
        return res.status(422).json({
          message: "nao deu"
        })
      })
  }
}