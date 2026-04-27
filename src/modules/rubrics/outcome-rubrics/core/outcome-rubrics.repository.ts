import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseRepostitory } from 'src/commons/base.repository';
import { OutcomeRubricEntity } from '../model/outcome-rubrics.entity';

export class OutcomeRubricRepository extends BaseRepostitory {
	constructor(
		@InjectRepository(OutcomeRubricEntity)
		repository: Repository<OutcomeRubricEntity>,
		dataSource: DataSource,
	) {
		super(repository, dataSource);
	}
}
