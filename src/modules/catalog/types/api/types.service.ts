import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/base.service';
import { TypeRepository } from '../core/types.repository';
import { TypeValidation } from '../core/types.validation';

/* REPOSITORIO EXTERNO */

import { CreateTypeDto, UpdateTypeDto } from '../model/types.dtos';
import { DataSource, EntityManager } from 'typeorm';
import { TypeGroupService } from '../../type-groups/api/type-groups.service';

@Injectable()
export class TypeService extends BaseService<TypeRepository> {
	constructor(
		protected readonly repository: TypeRepository,
		protected readonly dataSource: DataSource,
		private readonly typeGroupService: TypeGroupService,
	) {
		super(repository);
	}

	async create(dto: CreateTypeDto, manager?: EntityManager) {
		await TypeValidation.validateCreate(this.repository, this.typeGroupService, dto);
		return await super.create(dto, manager);
	}

	async update(id: number, dto: UpdateTypeDto, manager?: EntityManager) {
		await TypeValidation.validateUpdate(this.repository, this.typeGroupService, id, dto);
		return await super.update(id, dto, manager);
	}

	async delete(id: number, manager?: EntityManager) {
		await TypeValidation.validateDelete(this.repository, id);
		return await super.delete(id, manager);
	}

	async getByTypeGroupCode(type_group_code: string) {
		return await this.repository.getByTypeGroupCode(type_group_code);
	}
}
