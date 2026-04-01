import { Body, Param } from '@nestjs/common';
import { BaseController } from 'src/commons/base.controller';
import { ParameterService } from './parameters.service';
import * as Swagger from './docs/parameters.swagger';
import { CreateParameterDto, UpdateParameterDto, FilterParameterDto } from '../model/parameters.dtos';
import { Public } from 'src/modules/auth/protocols/jwt/decorators/public.decorator';

@Swagger.SwaggerParameterController()
export class ParameterController extends BaseController<ParameterService> {
	constructor(private readonly service: ParameterService) {
		super(service);
	}

	@Swagger.SwaggerParameterCreate()
	async create(@Body() dto: CreateParameterDto) {
		return await super.create(dto);
	}

	@Swagger.SwaggerParameterUpdate()
	async update(@Param('id') id: number, @Body() dto: UpdateParameterDto) {
		return await super.update(id, dto);
	}

	@Swagger.SwaggerParameterDelete()
	async delete(@Param('id') id: number) {
		return await super.delete(id);
	}
	@Public()
	@Swagger.SwaggerParameterGetAll()
	async getAll() {
		return await super.getAll();
	}
	@Public()
	@Swagger.SwaggerParameterGetById()
	async getById(@Param('id') id: number) {
		return await super.getById(id);
	}
	@Public()
	@Swagger.SwaggerParameterGetByFilters()
	async getByFilters(@Body() dto: FilterParameterDto) {
		return await super.getByFilters(dto);
	}
	@Public()
	@Swagger.SwaggerParameterReset()
	async reset(@Param('tenant') tenant: string) {
		return await this.service.resetParameters(tenant);
	}
}
