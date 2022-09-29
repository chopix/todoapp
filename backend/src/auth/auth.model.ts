import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

export interface AuthModel extends Base {}

export class AuthModel extends TimeStamps {
	@prop({unique: true})
	email: string;

   @prop()
   name: string

	@prop()
	password: string;

	@prop({default: 1})
	role: number;
}
