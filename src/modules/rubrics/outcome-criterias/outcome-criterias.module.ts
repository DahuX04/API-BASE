import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OutcomeCriteriaEntity } from './model/outcome-criterias.entity';
import { OutcomeCriteriaRepository } from './core/outcome-criterias.repository';
import { OutcomeCriteriaService } from './api/outcome-criterias.service';
import { OutcomeCriteriaController } from './api/outcome-criterias.controller';

@Module({
	imports: [TypeOrmModule.forFeature([OutcomeCriteriaEntity])],
	controllers: [OutcomeCriteriaController],
	providers: [OutcomeCriteriaService, OutcomeCriteriaRepository],
	exports: [OutcomeCriteriaService, OutcomeCriteriaRepository],
})
export class OutcomeCriteriaModule {}
