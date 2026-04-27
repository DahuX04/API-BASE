import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GradedCriteriaEntity } from './model/graded-criteria.entity';
import { GradedCriteriaRepository } from './core/graded-criteria.repository';
import { GradedCriteriaService } from './api/graded-criteria.service';
import { GradedCriteriaController } from './api/graded-criteria.controller';

@Module({
	imports: [TypeOrmModule.forFeature([GradedCriteriaEntity])],
	controllers: [GradedCriteriaController],
	providers: [GradedCriteriaService, GradedCriteriaRepository],
	exports: [GradedCriteriaService, GradedCriteriaRepository],
})
export class GradedCriteriaModule {}
