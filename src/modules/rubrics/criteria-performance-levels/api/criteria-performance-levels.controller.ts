import { Body, Param } from '@nestjs/common';
import { BaseController } from 'src/commons/base.controller';
import {
	SwaggerCriteriaPerformanceLevelController,
	SwaggerCriteriaPerformanceLevelCreate,
	SwaggerCriteriaPerformanceLevelUpdate,
	SwaggerCriteriaPerformanceLevelDelete,
	SwaggerCriteriaPerformanceLevelGetAll,
	SwaggerCriteriaPerformanceLevelGetById,
	SwaggerCriteriaPerformanceLevelGetByFilters,
} from './docs/criteria-performance-levels.swagger';
import { CriteriaPerformanceLevelService } from './criteria-performance-levels.service';
import { CreateCriteriaPerformanceLevelDto, UpdateCriteriaPerformanceLevelDto, FilterCriteriaPerformanceLevelDto } from '../model/criteria-performance-levels.dtos';

@SwaggerCriteriaPerformanceLevelController()
export class CriteriaPerformanceLevelController extends BaseController<CriteriaPerformanceLevelService> {
	constructor(private readonly service: CriteriaPerformanceLevelService) {
		super(service);
	}

	@SwaggerCriteriaPerformanceLevelCreate()
	async create(@Body() dto: CreateCriteriaPerformanceLevelDto) {
		return await super.create(dto);
	}

	@SwaggerCriteriaPerformanceLevelUpdate()
	async update(@Param('id') id: number, @Body() dto: UpdateCriteriaPerformanceLevelDto) {
		return await super.update(id, dto);
	}

	@SwaggerCriteriaPerformanceLevelDelete()
	async delete(@Param('id') id: number) {
		return await super.delete(id);
	}

	@SwaggerCriteriaPerformanceLevelGetAll()
	async getAll() {
		return await super.getAll();
	}

	@SwaggerCriteriaPerformanceLevelGetById()
	async getById(@Param('id') id: number) {
		return await super.getById(id);
	}

	@SwaggerCriteriaPerformanceLevelGetByFilters()
	async getByFilters(@Body() dto: FilterCriteriaPerformanceLevelDto) {
		return await super.getByFilters(dto);
	}
}
