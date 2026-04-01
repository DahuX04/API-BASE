import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseRepostitory } from 'src/commons/base.repository';
import { VerificationNoteEntity } from '../model/verification-notes.entity';

export class VerificationNoteRepository extends BaseRepostitory {
	constructor(
		@InjectRepository(VerificationNoteEntity)
		repository: Repository<VerificationNoteEntity>,
		dataSource: DataSource,
	) {
		super(repository, dataSource);
	}
}
