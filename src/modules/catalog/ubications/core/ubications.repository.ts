import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseRepostitory } from 'src/commons/base.repository';
import { UbicationEntity } from '../model/ubications.entity';

export class UbicationRepository extends BaseRepostitory {
	constructor(
		@InjectRepository(UbicationEntity)
		repository: Repository<UbicationEntity>,
		dataSource: DataSource,
	) {
		super(repository, dataSource);
	}
}
