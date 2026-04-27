import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/base.service';
import { RubricPerformanceLevelRepository } from '../core/rubric-performance-levels.repository';
import { RubricPerformanceLevelValidation } from '../core/rubric-performance-levels.validation';

import { CreateRubricPerformanceLevelDto, UpdateRubricPerformanceLevelDto } from '../model/rubric-performance-levels.dtos';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class RubricPerformanceLevelService extends BaseService<RubricPerformanceLevelRepository> {
	constructor(
		protected readonly repository: RubricPerformanceLevelRepository,
		protected readonly dataSource: DataSource,
	) {
		super(repository);
	}

	async create(dto: CreateRubricPerformanceLevelDto, manager?: EntityManager) {
		await RubricPerformanceLevelValidation.validateCreate(this.repository, dto);
		return await super.create(dto, manager);
	}

	async update(id: number, dto: UpdateRubricPerformanceLevelDto, manager?: EntityManager) {
		await RubricPerformanceLevelValidation.validateUpdate(this.repository, id, dto);
		return await super.update(id, dto, manager);
	}

	async delete(id: number, manager?: EntityManager) {
		await RubricPerformanceLevelValidation.validateDelete(this.repository, id);
		return await super.delete(id, manager);
	}
}
