import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/base.service';
import { GradedCriteriaRepository } from '../core/graded-criteria.repository';
import { GradedCriteriaValidation } from '../core/graded-criteria.validation';

import { CreateGradedCriteriaDto, UpdateGradedCriteriaDto } from '../model/graded-criteria.dtos';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class GradedCriteriaService extends BaseService<GradedCriteriaRepository> {
	constructor(
		protected readonly repository: GradedCriteriaRepository,
		protected readonly dataSource: DataSource,
	) {
		super(repository);
	}

	async create(dto: CreateGradedCriteriaDto, manager?: EntityManager) {
		await GradedCriteriaValidation.validateCreate(this.repository, dto);
		return await super.create(dto, manager);
	}

	async update(id: number, dto: UpdateGradedCriteriaDto, manager?: EntityManager) {
		await GradedCriteriaValidation.validateUpdate(this.repository, id, dto);
		return await super.update(id, dto, manager);
	}

	async delete(id: number, manager?: EntityManager) {
		await GradedCriteriaValidation.validateDelete(this.repository, id);
		return await super.delete(id, manager);
	}
}
