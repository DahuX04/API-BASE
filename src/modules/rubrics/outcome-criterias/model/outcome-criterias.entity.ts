import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { NameColumn, TextMediumColumn, IntegerFKIDColumn, DecimalColumn } from 'src/commons/configs/db.configs';
import { OutcomeRubricEntity } from 'src/modules/rubrics/outcome-rubrics/model/outcome-rubrics.entity';

@Entity({ name: 'outcome_criterias', schema: 'rubrics' })
export class OutcomeCriteriaEntity extends BaseEntity {
	// %% ATRIBUTOS

	@IntegerFKIDColumn({ nullable: false })
	outcome_rubric_id: number;

	@NameColumn({ nullable: false })
	name: string;

	@TextMediumColumn({ nullable: true })
	description: string;

	@DecimalColumn({ nullable: false })
	max_value: number;

	// %% RELACIONES

	@ManyToOne(() => OutcomeRubricEntity)
	@JoinColumn({ name: 'outcome_rubric_id' })
	outcome_rubric: OutcomeRubricEntity;
}
