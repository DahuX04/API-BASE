import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/base.service';
import { UbicationRepository } from '../core/ubications.repository';
import { UbicationValidation } from '../core/ubications.validation';

import { CreateUbicationDto, UpdateUbicationDto } from '../model/ubications.dtos';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class UbicationService extends BaseService<UbicationRepository> {
	constructor(
		protected readonly repository: UbicationRepository,
		protected readonly dataSource: DataSource,
	) {
		super(repository);
	}

	async create(dto: CreateUbicationDto, manager?: EntityManager) {
		await UbicationValidation.validateCreate(this.repository, dto);
		return await super.create(dto, manager);
	}

	async update(id: number, dto: UpdateUbicationDto, manager?: EntityManager) {
		await UbicationValidation.validateUpdate(this.repository, id, dto);
		return await super.update(id, dto, manager);
	}

	async delete(id: number, manager?: EntityManager) {
		await UbicationValidation.validateDelete(this.repository, id);
		return await super.delete(id, manager);
	}
}
