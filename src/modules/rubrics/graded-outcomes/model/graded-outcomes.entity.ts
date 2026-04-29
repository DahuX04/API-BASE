import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { TextMediumColumn, IntegerFKIDColumn, DecimalColumn } from 'src/commons/configs/db.configs';
import { RubricEntity } from 'src/modules/evaluation/rubrics/model/rubrics.entity';

@Entity({ name: 'graded_outcomes', schema: 'rubrics' })
export class GradedOutcomeEntity extends BaseEntity {
	// %% ATRIBUTOS

	@IntegerFKIDColumn({ nullable: false })
	graded_rubric_id: number;

	@DecimalColumn({ nullable: false })
	outcome_score: number;

	@TextMediumColumn({ nullable: true })
	outcome_comment: string;

	// %% RELACIONES

	@ManyToOne(() => RubricEntity)
	@JoinColumn({ name: 'graded_rubric_id' })
	graded_rubric: RubricEntity;
}
