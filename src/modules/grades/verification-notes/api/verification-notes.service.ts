import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/base.service';
import { VerificationNoteRepository } from '../core/verification-notes.repository';
import { VerificationNoteValidation } from '../core/verification-notes.validation';

import { CreateVerificationNoteDto, UpdateVerificationNoteDto } from '../model/verification-notes.dtos';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class VerificationNoteService extends BaseService<VerificationNoteRepository> {
	constructor(
		protected readonly repository: VerificationNoteRepository,
		protected readonly dataSource: DataSource,
	) {
		super(repository);
	}

	async create(dto: CreateVerificationNoteDto, manager?: EntityManager) {
		await VerificationNoteValidation.validateCreate(this.repository, dto);
		return await super.create(dto, manager);
	}

	async update(id: number, dto: UpdateVerificationNoteDto, manager?: EntityManager) {
		await VerificationNoteValidation.validateUpdate(this.repository, id, dto);
		return await super.update(id, dto, manager);
	}

	async delete(id: number, manager?: EntityManager) {
		await VerificationNoteValidation.validateDelete(this.repository, id);
		return await super.delete(id, manager);
	}
}
