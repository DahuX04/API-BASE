import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseRepostitory } from 'src/commons/base.repository';
import { CriteriaPerformanceLevelEntity } from '../model/criteria-performance-levels.entity';

export class CriteriaPerformanceLevelRepository extends BaseRepostitory {
	constructor(
		@InjectRepository(CriteriaPerformanceLevelEntity)
		repository: Repository<CriteriaPerformanceLevelEntity>,
		dataSource: DataSource,
	) {
		super(repository, dataSource);
	}
}
