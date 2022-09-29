import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

export interface TodoModel extends Base {}

export class TodoModel extends TimeStamps {
	@prop()
	title: string;

	@prop({ default: false })
	isDone: boolean;

	@prop()
	whoCreated: string;
}
