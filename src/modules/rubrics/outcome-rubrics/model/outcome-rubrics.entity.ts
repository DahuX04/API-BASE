import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { IntegerFKIDColumn, IntegerColumn, DecimalColumn, BooleanColumn } from 'src/commons/configs/db.configs';
import { OutcomeEntity } from 'src/modules/accreditation/outcomes/model/outcomes.entity';
import { RubricEntity } from 'src/modules/evaluation/rubrics/model/rubrics.entity';

@Entity({ name: 'outcome_rubrics', schema: 'rubrics' })
export class OutcomeRubricEntity extends BaseEntity {
	// %% ATRIBUTOS

	@IntegerFKIDColumn({ nullable: false })
	rubric_id: number;

	@IntegerFKIDColumn({ nullable: false })
	outcome_id: number;

	@DecimalColumn({ nullable: false })
	outcome_score: number;

	@IntegerColumn({ nullable: false })
	max_level: number;

	@BooleanColumn({ nullable: false, withDefault: true, default: true })
	is_visible: boolean;

	// %% RELACIONES

	@ManyToOne(() => RubricEntity)
	@JoinColumn({ name: 'rubric_id' })
	rubric: RubricEntity;

	@ManyToOne(() => OutcomeEntity)
	@JoinColumn({ name: 'outcome_id' })
	outcome: OutcomeEntity;
}
