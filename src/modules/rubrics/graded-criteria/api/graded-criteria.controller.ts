import { Body, Param } from '@nestjs/common';
import { BaseController } from 'src/commons/base.controller';
import {
	SwaggerGradedCriteriaController,
	SwaggerGradedCriteriaCreate,
	SwaggerGradedCriteriaUpdate,
	SwaggerGradedCriteriaDelete,
	SwaggerGradedCriteriaGetAll,
	SwaggerGradedCriteriaGetById,
	SwaggerGradedCriteriaGetByFilters,
} from './docs/graded-criteria.swagger';
import { GradedCriteriaService } from './graded-criteria.service';
import { CreateGradedCriteriaDto, UpdateGradedCriteriaDto, FilterGradedCriteriaDto } from '../model/graded-criteria.dtos';

@SwaggerGradedCriteriaController()
export class GradedCriteriaController extends BaseController<GradedCriteriaService> {
	constructor(private readonly service: GradedCriteriaService) {
		super(service);
	}

	@SwaggerGradedCriteriaCreate()
	async create(@Body() dto: CreateGradedCriteriaDto) {
		return await super.create(dto);
	}

	@SwaggerGradedCriteriaUpdate()
	async update(@Param('id') id: number, @Body() dto: UpdateGradedCriteriaDto) {
		return await super.update(id, dto);
	}

	@SwaggerGradedCriteriaDelete()
	async delete(@Param('id') id: number) {
		return await super.delete(id);
	}

	@SwaggerGradedCriteriaGetAll()
	async getAll() {
		return await super.getAll();
	}

	@SwaggerGradedCriteriaGetById()
	async getById(@Param('id') id: number) {
		return await super.getById(id);
	}

	@SwaggerGradedCriteriaGetByFilters()
	async getByFilters(@Body() dto: FilterGradedCriteriaDto) {
		return await super.getByFilters(dto);
	}
}
