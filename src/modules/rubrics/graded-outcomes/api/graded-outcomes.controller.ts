import { Body, Param } from '@nestjs/common';
import { BaseController } from 'src/commons/base.controller';
import {
	SwaggerGradedOutcomeController,
	SwaggerGradedOutcomeCreate,
	SwaggerGradedOutcomeUpdate,
	SwaggerGradedOutcomeDelete,
	SwaggerGradedOutcomeGetAll,
	SwaggerGradedOutcomeGetById,
	SwaggerGradedOutcomeGetByFilters,
} from './docs/graded-outcomes.swagger';
import { GradedOutcomeService } from './graded-outcomes.service';
import { CreateGradedOutcomeDto, UpdateGradedOutcomeDto, FilterGradedOutcomeDto } from '../model/graded-outcomes.dtos';

@SwaggerGradedOutcomeController()
export class GradedOutcomeController extends BaseController<GradedOutcomeService> {
	constructor(private readonly service: GradedOutcomeService) {
		super(service);
	}

	@SwaggerGradedOutcomeCreate()
	async create(@Body() dto: CreateGradedOutcomeDto) {
		return await super.create(dto);
	}

	@SwaggerGradedOutcomeUpdate()
	async update(@Param('id') id: number, @Body() dto: UpdateGradedOutcomeDto) {
		return await super.update(id, dto);
	}

	@SwaggerGradedOutcomeDelete()
	async delete(@Param('id') id: number) {
		return await super.delete(id);
	}

	@SwaggerGradedOutcomeGetAll()
	async getAll() {
		return await super.getAll();
	}

	@SwaggerGradedOutcomeGetById()
	async getById(@Param('id') id: number) {
		return await super.getById(id);
	}

	@SwaggerGradedOutcomeGetByFilters()
	async getByFilters(@Body() dto: FilterGradedOutcomeDto) {
		return await super.getByFilters(dto);
	}
}
