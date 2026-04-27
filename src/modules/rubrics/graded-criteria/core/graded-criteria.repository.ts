import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseRepostitory } from 'src/commons/base.repository';
import { GradedCriteriaEntity } from '../model/graded-criteria.entity';

export class GradedCriteriaRepository extends BaseRepostitory {
	constructor(
		@InjectRepository(GradedCriteriaEntity)
		repository: Repository<GradedCriteriaEntity>,
		dataSource: DataSource,
	) {
		super(repository, dataSource);
	}
}
