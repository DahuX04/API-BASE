import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseRepostitory } from 'src/commons/base.repository';
import { CurrencyEntity } from '../model/currencies.entity';

export class CurrencyRepository extends BaseRepostitory {
	constructor(
		@InjectRepository(CurrencyEntity)
		repository: Repository<CurrencyEntity>,
		dataSource: DataSource,
	) {
		super(repository, dataSource);
	}
}
