import { Controller, Post, Body, Route, Tags } from 'tsoa'
import { User } from '../../models/user'
interface CreateUserRequest {
  name: string
  password: string
}

interface CreateUserResponse {
  user?: Omit<CreateUserRequest, "password">
  message?: string
  code: number
}

@Route("users")
@Tags("Users")
export class UserCreate extends Controller {
  @Post('/create')
  static async create(@Body() body: CreateUserRequest): Promise<CreateUserResponse> {
    
    const { name, password } = body

    return User.create({
      name, password
    })
      .then(() => {
        return {
          user: {
            name
          },
          message: "Create",
          code: 200
        }
      })
      .catch(() => {
        return {
          message: "Erro ao criar usuario",
          code: 422
        }
      })
  }
}