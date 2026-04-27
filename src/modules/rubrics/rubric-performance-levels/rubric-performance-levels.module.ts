import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RubricPerformanceLevelEntity } from './model/rubric-performance-levels.entity';
import { RubricPerformanceLevelRepository } from './core/rubric-performance-levels.repository';
import { RubricPerformanceLevelService } from './api/rubric-performance-levels.service';
import { RubricPerformanceLevelController } from './api/rubric-performance-levels.controller';

@Module({
	imports: [TypeOrmModule.forFeature([RubricPerformanceLevelEntity])],
	controllers: [RubricPerformanceLevelController],
	providers: [RubricPerformanceLevelService, RubricPerformanceLevelRepository],
	exports: [RubricPerformanceLevelService, RubricPerformanceLevelRepository],
})
export class RubricPerformanceLevelModule {}
