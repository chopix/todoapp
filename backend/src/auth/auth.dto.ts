import { IsEmail, IsString } from "class-validator"
import { ObjectId } from "mongoose"

export class AuthDto {
   @IsEmail({
      message: 'Неправильный ввод эмейла'
   })
   email: string

   @IsString()
   password: string

   name?: string
}