import { Body, Controller, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './todo.dto';
import { AuthGuard } from '@nestjs/passport';
import ITodo from './types/ITodo';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('todo')
export class TodoController {
	constructor(private readonly todoService: TodoService) {}


	@Auth()
	@HttpCode(200)
	@Get('/')
	async getAll(): Promise<ITodo[]> {
		return this.todoService.getAllTodos();
	}

	@HttpCode(200)
	@Get(':id')
	async getOne(@Param() params): Promise<ITodo> {
		return this.todoService.getOneById(params.id);
	}

	@HttpCode(200)
	@Post('/create')
	@Auth('admin')
	async create(@Body() dto: TodoDto) {
		return this.todoService.createTodo(dto);
	}

	@HttpCode(200)
	@Post('/complete')
	@Auth('admin')
	async complete(@Body() dto: TodoDto) {
		return this.todoService.completeTodo(dto);
	}
}
