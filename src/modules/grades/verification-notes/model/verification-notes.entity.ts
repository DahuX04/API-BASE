import { Entity, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { NameColumn, CodeColumn, TextMediumColumn, IntegerFKIDColumn, DecimalColumn } from 'src/commons/configs/db.configs';
import { TypeEntity } from 'src/modules/core/types/model/types.entity';

@Entity({ name: 'verification_notes', schema: 'grades' })
export class VerificationNoteEntity extends BaseEntity {
	// %% ATRIBUTOS
	@CodeColumn()
	code: string;

	@NameColumn({ nullable: false })
	name: string;

	@TextMediumColumn({ nullable: false })
	description: string;

	@DecimalColumn()
	grade: number;

	// @relation: one-to-one
	@IntegerFKIDColumn({ nullable: false })
	grade_type_id: number;
	
	// %% RELACIONES

	@OneToOne(() => TypeEntity, (x) => x.verification_note)
	@JoinColumn({ name: 'grade_type_id' })
	grade_type: TypeEntity;
}
