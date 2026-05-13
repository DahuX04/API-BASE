import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseRepostitory } from 'src/commons/base.repository';
import { UserEntity } from '../model/users.entity';

export class UserRepository extends BaseRepostitory {
	constructor(
		@InjectRepository(UserEntity)
		repository: Repository<UserEntity>,
		dataSource: DataSource,
	) {
		super(repository, dataSource);
	}

	async findOneByEmailWithPassword(email: string) {
		const repo = this.dataSource.getRepository(UserEntity);
		return repo
			.createQueryBuilder('user')
			.addSelect('user.password')
			.where('user.email = :email', { email })
			.andWhere('user.is_active = :isActive', { isActive: true })
			.getOne();
	}
}
