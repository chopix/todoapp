import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { compare, genSalt, hash } from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';
import { AuthDto } from './auth.dto';
import { AuthModel } from './auth.model';

@Injectable()
export class AuthService {
   constructor(
      @InjectModel(AuthModel) private readonly AuthModel: ModelType<AuthModel>,
      private readonly JwtService: JwtService
   ){

   }

   async register(dto: AuthDto) {
      const oldUserByEmail = await this.AuthModel.findOne({email: dto.email})

      if(oldUserByEmail) throw new BadRequestException('Пользователь с таким эмейлом уже существует.')

      const oldUserByNick = await this.AuthModel.findOne({name: dto.name})
      
      if(oldUserByNick) throw new BadRequestException('Пользователь с таким ником уже существует.')


      const salt = await genSalt(10)

      const newUser = new this.AuthModel({
         email: dto.email,
         name: dto.name,
         password: await hash(dto.password, salt)
      })

      const tokens = await this.issueTokenPain(String(newUser._id), newUser.name)

      await newUser.save();

      return {
         newUser,
         ...tokens
      };

   }

   async login(dto: AuthDto) {
      const user = await this.validateUser(dto)
      //@ts-ignore
      const tokens = await this.issueTokenPain(String(user._id), user.name)
      return {
         user,
         ...tokens
      }
   }

   async validateUser(dto: AuthDto): Promise<AuthDto> {
      const user = await this.AuthModel.findOne({ email: dto.email });
		if (!user) throw new BadRequestException('Пользователь не найден');

		const isValidPassword = await compare(dto.password, user.password);
		if (!isValidPassword) throw new BadRequestException('Пароль неверный');

		return user;
   }

   async issueTokenPain(userId: string, userName:string) {
      const data = {_id: userId, name: userName}

      const refreshToken = await this.JwtService.signAsync(data, {
         expiresIn: '15d'
      })

      const accessToken = await this.JwtService.signAsync(data, {
         expiresIn: '1h'
      })

      return {accessToken, refreshToken}
   }


}
