import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseRepostitory } from 'src/commons/base.repository';
import { RubricPerformanceLevelEntity } from '../model/rubric-performance-levels.entity';

export class RubricPerformanceLevelRepository extends BaseRepostitory {
	constructor(
		@InjectRepository(RubricPerformanceLevelEntity)
		repository: Repository<RubricPerformanceLevelEntity>,
		dataSource: DataSource,
	) {
		super(repository, dataSource);
	}
}
