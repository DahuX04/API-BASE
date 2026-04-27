import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/base.service';
import { OutcomeRubricRepository } from '../core/outcome-rubrics.repository';
import { OutcomeRubricValidation } from '../core/outcome-rubrics.validation';

import { CreateOutcomeRubricDto, UpdateOutcomeRubricDto } from '../model/outcome-rubrics.dtos';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class OutcomeRubricService extends BaseService<OutcomeRubricRepository> {
	constructor(
		protected readonly repository: OutcomeRubricRepository,
		protected readonly dataSource: DataSource,
	) {
		super(repository);
	}

	async create(dto: CreateOutcomeRubricDto, manager?: EntityManager) {
		await OutcomeRubricValidation.validateCreate(this.repository, dto);
		return await super.create(dto, manager);
	}

	async update(id: number, dto: UpdateOutcomeRubricDto, manager?: EntityManager) {
		await OutcomeRubricValidation.validateUpdate(this.repository, id, dto);
		return await super.update(id, dto, manager);
	}

	async delete(id: number, manager?: EntityManager) {
		await OutcomeRubricValidation.validateDelete(this.repository, id);
		return await super.delete(id, manager);
	}
}
