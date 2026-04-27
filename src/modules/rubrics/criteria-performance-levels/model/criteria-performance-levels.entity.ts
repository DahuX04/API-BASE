import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { IntegerFKIDColumn } from 'src/commons/configs/db.configs';
import { OutcomeCriteriaEntity } from 'src/modules/rubrics/outcome-criterias/model/outcome-criterias.entity';
import { PerformanceLevelEntity } from 'src/modules/rubrics/performance-levels/model/performance-levels.entity';

@Entity({ name: 'criteria_performance_levels', schema: 'rubrics' })
export class CriteriaPerformanceLevelEntity extends BaseEntity {
	// %% ATRIBUTOS

	@IntegerFKIDColumn({ nullable: false })
	outcome_criteria_id: number;

	@IntegerFKIDColumn({ nullable: false })
	performance_level_id: number;

	// %% RELACIONES

	@ManyToOne(() => OutcomeCriteriaEntity)
	@JoinColumn({ name: 'outcome_criteria_id' })
	outcome_criteria: OutcomeCriteriaEntity;

	@ManyToOne(() => PerformanceLevelEntity)
	@JoinColumn({ name: 'performance_level_id' })
	performance_level: PerformanceLevelEntity;
}
