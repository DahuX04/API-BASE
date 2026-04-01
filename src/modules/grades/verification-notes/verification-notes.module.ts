import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* ENTITY */
import { VerificationNoteEntity } from './model/verification-notes.entity';

/* CORE */
import { VerificationNoteRepository } from './core/verification-notes.repository';

/* API */
import { VerificationNoteService } from './api/verification-notes.service';
import { VerificationNoteController } from './api/verification-notes.controller';

@Module({
	imports: [TypeOrmModule.forFeature([VerificationNoteEntity])],
	controllers: [VerificationNoteController],
	providers: [VerificationNoteService, VerificationNoteRepository],
	exports: [VerificationNoteService, VerificationNoteRepository],
})
export class VerificationNoteModule {}
