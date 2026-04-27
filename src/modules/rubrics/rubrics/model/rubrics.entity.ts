import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { TextMediumColumn, IntegerFKIDColumn, DecimalColumn, BooleanColumn } from 'src/commons/configs/db.configs';
import { AssessmentEntity } from 'src/modules/rubrics/assessments/model/assessments.entity';

@Entity({ name: 'rubrics', schema: 'rubrics' })
export class RubricEntity extends BaseEntity {
	// %% ATRIBUTOS

	@IntegerFKIDColumn({ nullable: false })
	assessment_id: number;

	@TextMediumColumn({ nullable: true })
	description: string;

	@BooleanColumn({ nullable: false, withDefault: false, default: false })
	is_graded_score: boolean;

	@BooleanColumn({ nullable: false, withDefault: false, default: false })
	is_editable: boolean;

	@DecimalColumn({ nullable: false })
	max_score: number;

	// %% RELACIONES

	@ManyToOne(() => AssessmentEntity)
	@JoinColumn({ name: 'assessment_id' })
	assessment: AssessmentEntity;
}
