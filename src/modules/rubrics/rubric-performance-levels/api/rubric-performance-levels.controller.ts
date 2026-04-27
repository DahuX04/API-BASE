import { Body, Param } from '@nestjs/common';
import { BaseController } from 'src/commons/base.controller';
import {
	SwaggerRubricPerformanceLevelController,
	SwaggerRubricPerformanceLevelCreate,
	SwaggerRubricPerformanceLevelUpdate,
	SwaggerRubricPerformanceLevelDelete,
	SwaggerRubricPerformanceLevelGetAll,
	SwaggerRubricPerformanceLevelGetById,
	SwaggerRubricPerformanceLevelGetByFilters,
} from './docs/rubric-performance-levels.swagger';
import { RubricPerformanceLevelService } from './rubric-performance-levels.service';
import { CreateRubricPerformanceLevelDto, UpdateRubricPerformanceLevelDto, FilterRubricPerformanceLevelDto } from '../model/rubric-performance-levels.dtos';

@SwaggerRubricPerformanceLevelController()
export class RubricPerformanceLevelController extends BaseController<RubricPerformanceLevelService> {
	constructor(private readonly service: RubricPerformanceLevelService) {
		super(service);
	}

	@SwaggerRubricPerformanceLevelCreate()
	async create(@Body() dto: CreateRubricPerformanceLevelDto) {
		return await super.create(dto);
	}

	@SwaggerRubricPerformanceLevelUpdate()
	async update(@Param('id') id: number, @Body() dto: UpdateRubricPerformanceLevelDto) {
		return await super.update(id, dto);
	}

	@SwaggerRubricPerformanceLevelDelete()
	async delete(@Param('id') id: number) {
		return await super.delete(id);
	}

	@SwaggerRubricPerformanceLevelGetAll()
	async getAll() {
		return await super.getAll();
	}

	@SwaggerRubricPerformanceLevelGetById()
	async getById(@Param('id') id: number) {
		return await super.getById(id);
	}

	@SwaggerRubricPerformanceLevelGetByFilters()
	async getByFilters(@Body() dto: FilterRubricPerformanceLevelDto) {
		return await super.getByFilters(dto);
	}
}
