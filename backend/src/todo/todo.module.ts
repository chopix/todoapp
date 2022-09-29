import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { TodoModel } from './todo.model';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	controllers: [TodoController],
	providers: [TodoService],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: TodoModel,
				schemaOptions: {
					collection: 'Todo',
				},
			},
		]),
		ConfigModule,
	],
})
export class TodoModule {}
