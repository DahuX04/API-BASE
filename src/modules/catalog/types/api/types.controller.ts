import { Body, Param } from '@nestjs/common';
import { BaseController } from 'src/commons/base.controller';
import {
	SwaggerTypeController,
	SwaggerTypeCreate,
	SwaggerTypeUpdate,
	SwaggerTypeDelete,
	SwaggerTypeGetAll,
	SwaggerTypeGetById,
	SwaggerTypeGetByFilters,
	SwaggerGetByTypeGroupCode,
} from './docs/types.swagger';
import { TypeService } from './types.service';
import { CreateTypeDto, UpdateTypeDto, FilterTypeDto } from '../model/types.dtos';
import { parseSuccessResponse } from 'src/libs/global.functions';
import { Public } from 'src/modules/auth/protocols/jwt/decorators/public.decorator';

@SwaggerTypeController()
export class TypeController extends BaseController<TypeService> {
	constructor(private readonly service: TypeService) {
		super(service);
	}

	@SwaggerTypeCreate()
	async create(@Body() dto: CreateTypeDto) {
		return await super.create(dto);
	}

	@SwaggerTypeUpdate()
	async update(@Param('id') id: number, @Body() dto: UpdateTypeDto) {
		return await super.update(id, dto);
	}

	@SwaggerTypeDelete()
	async delete(@Param('id') id: number) {
		return await super.delete(id);
	}

	@SwaggerTypeGetAll()
	async getAll() {
		return await super.getAll();
	}

	@SwaggerTypeGetById()
	async getById(@Param('id') id: number) {
		return await super.getById(id);
	}

	@Public()
	@SwaggerTypeGetByFilters()
	async getByFilters(@Body() dto: FilterTypeDto) {
		return await super.getByFilters(dto);
	}
	@Public()
	@SwaggerGetByTypeGroupCode()
	async getByTypeGroupCode(@Param('type_group_code') type_group_code: string) {
		return parseSuccessResponse(await this.service.getByTypeGroupCode(type_group_code));
	}
}
