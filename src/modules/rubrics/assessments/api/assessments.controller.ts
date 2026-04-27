import { Body, Param } from '@nestjs/common';
import { BaseController } from 'src/commons/base.controller';
import {
	SwaggerAssessmentController,
	SwaggerAssessmentCreate,
	SwaggerAssessmentUpdate,
	SwaggerAssessmentDelete,
	SwaggerAssessmentGetAll,
	SwaggerAssessmentGetById,
	SwaggerAssessmentGetByFilters,
} from './docs/assessments.swagger';
import { AssessmentService } from './assessments.service';
import { CreateAssessmentDto, UpdateAssessmentDto, FilterAssessmentDto } from '../model/assessments.dtos';

@SwaggerAssessmentController()
export class AssessmentController extends BaseController<AssessmentService> {
	constructor(private readonly service: AssessmentService) {
		super(service);
	}

	@SwaggerAssessmentCreate()
	async create(@Body() dto: CreateAssessmentDto) {
		return await super.create(dto);
	}

	@SwaggerAssessmentUpdate()
	async update(@Param('id') id: number, @Body() dto: UpdateAssessmentDto) {
		return await super.update(id, dto);
	}

	@SwaggerAssessmentDelete()
	async delete(@Param('id') id: number) {
		return await super.delete(id);
	}

	@SwaggerAssessmentGetAll()
	async getAll() {
		return await super.getAll();
	}

	@SwaggerAssessmentGetById()
	async getById(@Param('id') id: number) {
		return await super.getById(id);
	}

	@SwaggerAssessmentGetByFilters()
	async getByFilters(@Body() dto: FilterAssessmentDto) {
		return await super.getByFilters(dto);
	}
}
