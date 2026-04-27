import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssessmentEntity } from './model/assessments.entity';
import { AssessmentRepository } from './core/assessments.repository';
import { AssessmentService } from './api/assessments.service';
import { AssessmentController } from './api/assessments.controller';

@Module({
	imports: [TypeOrmModule.forFeature([AssessmentEntity])],
	controllers: [AssessmentController],
	providers: [AssessmentService, AssessmentRepository],
	exports: [AssessmentService, AssessmentRepository],
})
export class AssessmentModule {}
