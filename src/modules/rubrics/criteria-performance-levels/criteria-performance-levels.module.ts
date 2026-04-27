import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CriteriaPerformanceLevelEntity } from './model/criteria-performance-levels.entity';
import { CriteriaPerformanceLevelRepository } from './core/criteria-performance-levels.repository';
import { CriteriaPerformanceLevelService } from './api/criteria-performance-levels.service';
import { CriteriaPerformanceLevelController } from './api/criteria-performance-levels.controller';

@Module({
	imports: [TypeOrmModule.forFeature([CriteriaPerformanceLevelEntity])],
	controllers: [CriteriaPerformanceLevelController],
	providers: [CriteriaPerformanceLevelService, CriteriaPerformanceLevelRepository],
	exports: [CriteriaPerformanceLevelService, CriteriaPerformanceLevelRepository],
})
export class CriteriaPerformanceLevelModule {}
