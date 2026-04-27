import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/base.service';
import { AssessmentRepository } from '../core/assessments.repository';
import { AssessmentValidation } from '../core/assessments.validation';

import { CreateAssessmentDto, UpdateAssessmentDto } from '../model/assessments.dtos';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class AssessmentService extends BaseService<AssessmentRepository> {
	constructor(
		protected readonly repository: AssessmentRepository,
		protected readonly dataSource: DataSource,
	) {
		super(repository);
	}

	async create(dto: CreateAssessmentDto, manager?: EntityManager) {
		await AssessmentValidation.validateCreate(this.repository, dto);
		return await super.create(dto, manager);
	}

	async update(id: number, dto: UpdateAssessmentDto, manager?: EntityManager) {
		await AssessmentValidation.validateUpdate(this.repository, id, dto);
		return await super.update(id, dto, manager);
	}

	async delete(id: number, manager?: EntityManager) {
		await AssessmentValidation.validateDelete(this.repository, id);
		return await super.delete(id, manager);
	}
}
