import { Router } from 'express'

import { UserCreate } from '../controllers/user/create'

const router = Router()

router.post("/create", (req, res) => {
  UserCreate.create(req.body)
    .then((user) => {
      return res.status(user.code).json(user)
    })
    .catch(err => res.status(err.code).json(err))
})

export default router