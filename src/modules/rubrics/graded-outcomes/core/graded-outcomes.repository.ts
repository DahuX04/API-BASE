import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseRepostitory } from 'src/commons/base.repository';
import { GradedOutcomeEntity } from '../model/graded-outcomes.entity';

export class GradedOutcomeRepository extends BaseRepostitory {
	constructor(
		@InjectRepository(GradedOutcomeEntity)
		repository: Repository<GradedOutcomeEntity>,
		dataSource: DataSource,
	) {
		super(repository, dataSource);
	}
}
