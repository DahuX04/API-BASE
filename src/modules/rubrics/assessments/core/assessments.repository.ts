import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseRepostitory } from 'src/commons/base.repository';
import { AssessmentEntity } from '../model/assessments.entity';

export class AssessmentRepository extends BaseRepostitory {
	constructor(
		@InjectRepository(AssessmentEntity)
		repository: Repository<AssessmentEntity>,
		dataSource: DataSource,
	) {
		super(repository, dataSource);
	}
}
