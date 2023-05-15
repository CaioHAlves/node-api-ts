import { Router } from 'express'

import { UserCreate } from '../controllers/user/create'

const router = Router()


router.post("/create", UserCreate.create)

export default router