import { Body, Param } from '@nestjs/common';
import { BaseController } from 'src/commons/base.controller';
import {
	SwaggerOutcomeRubricController,
	SwaggerOutcomeRubricCreate,
	SwaggerOutcomeRubricUpdate,
	SwaggerOutcomeRubricDelete,
	SwaggerOutcomeRubricGetAll,
	SwaggerOutcomeRubricGetById,
	SwaggerOutcomeRubricGetByFilters,
} from './docs/outcome-rubrics.swagger';
import { OutcomeRubricService } from './outcome-rubrics.service';
import { CreateOutcomeRubricDto, UpdateOutcomeRubricDto, FilterOutcomeRubricDto } from '../model/outcome-rubrics.dtos';

@SwaggerOutcomeRubricController()
export class OutcomeRubricController extends BaseController<OutcomeRubricService> {
	constructor(private readonly service: OutcomeRubricService) {
		super(service);
	}

	@SwaggerOutcomeRubricCreate()
	async create(@Body() dto: CreateOutcomeRubricDto) {
		return await super.create(dto);
	}

	@SwaggerOutcomeRubricUpdate()
	async update(@Param('id') id: number, @Body() dto: UpdateOutcomeRubricDto) {
		return await super.update(id, dto);
	}

	@SwaggerOutcomeRubricDelete()
	async delete(@Param('id') id: number) {
		return await super.delete(id);
	}

	@SwaggerOutcomeRubricGetAll()
	async getAll() {
		return await super.getAll();
	}

	@SwaggerOutcomeRubricGetById()
	async getById(@Param('id') id: number) {
		return await super.getById(id);
	}

	@SwaggerOutcomeRubricGetByFilters()
	async getByFilters(@Body() dto: FilterOutcomeRubricDto) {
		return await super.getByFilters(dto);
	}
}
