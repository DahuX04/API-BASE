import { Entity } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { TextMediumColumn, IntegerFKIDColumn, DecimalColumn } from 'src/commons/configs/db.configs';

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
}
