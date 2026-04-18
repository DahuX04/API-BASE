import { Body, Param } from '@nestjs/common';
import { BaseController } from 'src/commons/base.controller';
import { SwaggerUserController, SwaggerUserCreate, SwaggerUserUpdate, SwaggerUserDelete, SwaggerUserGetAll, SwaggerUserGetById, SwaggerUserGetByFilters } from './docs/users.swagger';
import { UserService } from './users.service';
import { CreateUserDto, UpdateUserDto, FilterUserDto } from '../model/users.dtos';

@SwaggerUserController()
export class UserController extends BaseController<UserService> {
	constructor(private readonly service: UserService) {
		super(service);
	}

	@SwaggerUserCreate()
	async create(@Body() dto: CreateUserDto) {
		return await super.create(dto);
	}

	@SwaggerUserUpdate()
	async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
		return await super.update(id, dto);
	}

	@SwaggerUserDelete()
	async delete(@Param('id') id: number) {
		return await super.delete(id);
	}

	@SwaggerUserGetAll()
	async getAll() {
		return await super.getAll();
	}

	@SwaggerUserGetById()
	async getById(@Param('id') id: number) {
		return await super.getById(id);
	}

	@SwaggerUserGetByFilters()
	async getByFilters(@Body() dto: FilterUserDto) {
		return await super.getByFilters(dto);
	}
}
