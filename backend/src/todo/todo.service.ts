import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { TodoModel } from './todo.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TodoDto } from './todo.dto';
import ITodo from './types/ITodo';

@Injectable()
export class TodoService {
	constructor(
		@InjectModel(TodoModel) private readonly TodoModel: ModelType<TodoModel>
	) {}

	async getAllTodos():Promise<ITodo[]> {
		return this.TodoModel.find();
	}

	async getOneById(_id: string): Promise<ITodo> {
		return this.TodoModel.findById(_id);
	}

	async createTodo(dto: TodoDto) {
		const newTodo = new this.TodoModel({
			title: dto.title,
		});
		return newTodo.save();
	}

	async completeTodo(dto: TodoDto) {
		const currentTodo = await this.TodoModel.findOne({
			title: dto.title,
		}).exec();
		if (!currentTodo) {
			return {
				status: false,
				message: 'Задание не найдено',
			};
		}
		switch (currentTodo.isDone) {
			case false:
				currentTodo.isDone = true;
				break;
			case true:
				currentTodo.isDone = false;
				break;
			default:
				return 'пошёл нахуй';
		}
		return currentTodo.save();
	}
}
