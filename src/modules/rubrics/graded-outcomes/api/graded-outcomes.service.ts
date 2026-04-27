import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/base.service';
import { GradedOutcomeRepository } from '../core/graded-outcomes.repository';
import { GradedOutcomeValidation } from '../core/graded-outcomes.validation';

import { CreateGradedOutcomeDto, UpdateGradedOutcomeDto } from '../model/graded-outcomes.dtos';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class GradedOutcomeService extends BaseService<GradedOutcomeRepository> {
	constructor(
		protected readonly repository: GradedOutcomeRepository,
		protected readonly dataSource: DataSource,
	) {
		super(repository);
	}

	async create(dto: CreateGradedOutcomeDto, manager?: EntityManager) {
		await GradedOutcomeValidation.validateCreate(this.repository, dto);
		return await super.create(dto, manager);
	}

	async update(id: number, dto: UpdateGradedOutcomeDto, manager?: EntityManager) {
		await GradedOutcomeValidation.validateUpdate(this.repository, id, dto);
		return await super.update(id, dto, manager);
	}

	async delete(id: number, manager?: EntityManager) {
		await GradedOutcomeValidation.validateDelete(this.repository, id);
		return await super.delete(id, manager);
	}
}
