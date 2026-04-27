import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OutcomeRubricEntity } from './model/outcome-rubrics.entity';
import { OutcomeRubricRepository } from './core/outcome-rubrics.repository';
import { OutcomeRubricService } from './api/outcome-rubrics.service';
import { OutcomeRubricController } from './api/outcome-rubrics.controller';

@Module({
	imports: [TypeOrmModule.forFeature([OutcomeRubricEntity])],
	controllers: [OutcomeRubricController],
	providers: [OutcomeRubricService, OutcomeRubricRepository],
	exports: [OutcomeRubricService, OutcomeRubricRepository],
})
export class OutcomeRubricModule {}
