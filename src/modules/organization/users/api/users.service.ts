import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/base.service';
import { UserRepository } from '../core/users.repository';
import { UserValidation } from '../core/users.validation';

import { CreateUserDto, UpdateUserDto } from '../model/users.dtos';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class UserService extends BaseService<UserRepository> {
	constructor(
		protected readonly repository: UserRepository,
		protected readonly dataSource: DataSource,
	) {
		super(repository);
	}

	async create(dto: CreateUserDto, manager?: EntityManager) {
		await UserValidation.validateCreate(this.repository, dto);
		return await super.create(dto, manager);
	}

	async update(id: number, dto: UpdateUserDto, manager?: EntityManager) {
		await UserValidation.validateUpdate(this.repository, id, dto);
		return await super.update(id, dto, manager);
	}

	async delete(id: number, manager?: EntityManager) {
		await UserValidation.validateDelete(this.repository, id);
		return await super.delete(id, manager);
	}
}
