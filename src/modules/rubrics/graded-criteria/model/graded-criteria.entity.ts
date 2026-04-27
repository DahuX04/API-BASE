import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { IntegerFKIDColumn, DecimalColumn } from 'src/commons/configs/db.configs';
import { GradedOutcomeEntity } from 'src/modules/rubrics/graded-outcomes/model/graded-outcomes.entity';
import { OutcomeCriteriaEntity } from 'src/modules/rubrics/outcome-criterias/model/outcome-criterias.entity';

@Entity({ name: 'graded_criteria', schema: 'rubrics' })
export class GradedCriteriaEntity extends BaseEntity {
	// %% ATRIBUTOS

	@IntegerFKIDColumn({ nullable: false })
	graded_outcome_id: number;

	@IntegerFKIDColumn({ nullable: false })
	outcome_criteria_id: number;

	@DecimalColumn({ nullable: false })
	criteria_score: number;

	// %% RELACIONES

	@ManyToOne(() => GradedOutcomeEntity)
	@JoinColumn({ name: 'graded_outcome_id' })
	graded_outcome: GradedOutcomeEntity;

	@ManyToOne(() => OutcomeCriteriaEntity)
	@JoinColumn({ name: 'outcome_criteria_id' })
	outcome_criteria: OutcomeCriteriaEntity;
}
