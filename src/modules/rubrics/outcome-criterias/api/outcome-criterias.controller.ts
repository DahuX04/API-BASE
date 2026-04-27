import { Body, Param } from '@nestjs/common';
import { BaseController } from 'src/commons/base.controller';
import {
	SwaggerOutcomeCriteriaController,
	SwaggerOutcomeCriteriaCreate,
	SwaggerOutcomeCriteriaUpdate,
	SwaggerOutcomeCriteriaDelete,
	SwaggerOutcomeCriteriaGetAll,
	SwaggerOutcomeCriteriaGetById,
	SwaggerOutcomeCriteriaGetByFilters,
} from './docs/outcome-criterias.swagger';
import { OutcomeCriteriaService } from './outcome-criterias.service';
import { CreateOutcomeCriteriaDto, UpdateOutcomeCriteriaDto, FilterOutcomeCriteriaDto } from '../model/outcome-criterias.dtos';

@SwaggerOutcomeCriteriaController()
export class OutcomeCriteriaController extends BaseController<OutcomeCriteriaService> {
	constructor(private readonly service: OutcomeCriteriaService) {
		super(service);
	}

	@SwaggerOutcomeCriteriaCreate()
	async create(@Body() dto: CreateOutcomeCriteriaDto) {
		return await super.create(dto);
	}

	@SwaggerOutcomeCriteriaUpdate()
	async update(@Param('id') id: number, @Body() dto: UpdateOutcomeCriteriaDto) {
		return await super.update(id, dto);
	}

	@SwaggerOutcomeCriteriaDelete()
	async delete(@Param('id') id: number) {
		return await super.delete(id);
	}

	@SwaggerOutcomeCriteriaGetAll()
	async getAll() {
		return await super.getAll();
	}

	@SwaggerOutcomeCriteriaGetById()
	async getById(@Param('id') id: number) {
		return await super.getById(id);
	}

	@SwaggerOutcomeCriteriaGetByFilters()
	async getByFilters(@Body() dto: FilterOutcomeCriteriaDto) {
		return await super.getByFilters(dto);
	}
}
