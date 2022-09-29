import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthModel } from "./auth.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(private readonly configService: ConfigService, @InjectModel(AuthModel) private readonly AuthModel: ModelType<AuthModel>) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: true,
         secretOrKey: 'asd32jnmjiesajdi213jdfg@@1212!!38**&^!sadl,dflpwe'
      })
   }

   async validate(_id: string, name: string) {
      return this.AuthModel.findById(_id).exec()
   }
}