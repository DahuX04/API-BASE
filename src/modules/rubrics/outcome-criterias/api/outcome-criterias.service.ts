import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/base.service';
import { OutcomeCriteriaRepository } from '../core/outcome-criterias.repository';
import { OutcomeCriteriaValidation } from '../core/outcome-criterias.validation';

import { CreateOutcomeCriteriaDto, UpdateOutcomeCriteriaDto } from '../model/outcome-criterias.dtos';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class OutcomeCriteriaService extends BaseService<OutcomeCriteriaRepository> {
	constructor(
		protected readonly repository: OutcomeCriteriaRepository,
		protected readonly dataSource: DataSource,
	) {
		super(repository);
	}

	async create(dto: CreateOutcomeCriteriaDto, manager?: EntityManager) {
		await OutcomeCriteriaValidation.validateCreate(this.repository, dto);
		return await super.create(dto, manager);
	}

	async update(id: number, dto: UpdateOutcomeCriteriaDto, manager?: EntityManager) {
		await OutcomeCriteriaValidation.validateUpdate(this.repository, id, dto);
		return await super.update(id, dto, manager);
	}

	async delete(id: number, manager?: EntityManager) {
		await OutcomeCriteriaValidation.validateDelete(this.repository, id);
		return await super.delete(id, manager);
	}
}
