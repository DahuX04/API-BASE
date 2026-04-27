import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/base.service';
import { CriteriaPerformanceLevelRepository } from '../core/criteria-performance-levels.repository';
import { CriteriaPerformanceLevelValidation } from '../core/criteria-performance-levels.validation';

import { CreateCriteriaPerformanceLevelDto, UpdateCriteriaPerformanceLevelDto } from '../model/criteria-performance-levels.dtos';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class CriteriaPerformanceLevelService extends BaseService<CriteriaPerformanceLevelRepository> {
	constructor(
		protected readonly repository: CriteriaPerformanceLevelRepository,
		protected readonly dataSource: DataSource,
	) {
		super(repository);
	}

	async create(dto: CreateCriteriaPerformanceLevelDto, manager?: EntityManager) {
		await CriteriaPerformanceLevelValidation.validateCreate(this.repository, dto);
		return await super.create(dto, manager);
	}

	async update(id: number, dto: UpdateCriteriaPerformanceLevelDto, manager?: EntityManager) {
		await CriteriaPerformanceLevelValidation.validateUpdate(this.repository, id, dto);
		return await super.update(id, dto, manager);
	}

	async delete(id: number, manager?: EntityManager) {
		await CriteriaPerformanceLevelValidation.validateDelete(this.repository, id);
		return await super.delete(id, manager);
	}
}
