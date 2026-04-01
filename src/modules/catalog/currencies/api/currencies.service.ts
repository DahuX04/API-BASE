import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/base.service';
import { CurrencyRepository } from '../core/currencies.repository';
import { CurrencyValidation } from '../core/currencies.validation';

import { CreateCurrencyDto, UpdateCurrencyDto } from '../model/currencies.dtos';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class CurrencyService extends BaseService<CurrencyRepository> {
	constructor(
		protected readonly repository: CurrencyRepository,
		protected readonly dataSource: DataSource,
	) {
		super(repository);
	}

	async create(dto: CreateCurrencyDto, manager?: EntityManager) {
		await CurrencyValidation.validateCreate(this.repository, dto);
		return await super.create(dto, manager);
	}

	async update(id: number, dto: UpdateCurrencyDto, manager?: EntityManager) {
		await CurrencyValidation.validateUpdate(this.repository, id, dto);
		return await super.update(id, dto, manager);
	}

	async delete(id: number, manager?: EntityManager) {
		await CurrencyValidation.validateDelete(this.repository, id);
		return await super.delete(id, manager);
	}
}
