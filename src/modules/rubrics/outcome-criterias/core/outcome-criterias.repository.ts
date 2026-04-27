import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseRepostitory } from 'src/commons/base.repository';
import { OutcomeCriteriaEntity } from '../model/outcome-criterias.entity';

export class OutcomeCriteriaRepository extends BaseRepostitory {
	constructor(
		@InjectRepository(OutcomeCriteriaEntity)
		repository: Repository<OutcomeCriteriaEntity>,
		dataSource: DataSource,
	) {
		super(repository, dataSource);
	}
}
