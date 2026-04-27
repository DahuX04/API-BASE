import { Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { NameColumn, CodeColumn, TextMediumColumn, IntegerFKIDColumn } from 'src/commons/configs/db.configs';
import { TypeGroupEntity } from 'src/modules/core/type-groups/model/type-groups.entity';
import { VerificationNoteEntity } from 'src/modules/grades/verification-notes/model/verification-notes.entity';

@Entity({ name: 'types', schema: 'core' })
export class TypeEntity extends BaseEntity {
	// %% ATRIBUTOS

	@IntegerFKIDColumn({ nullable: false })
	type_group_id: string;

	@CodeColumn({ nullable: false })
	code: string;

	@NameColumn({ nullable: false })
	name: string;

	@TextMediumColumn({ nullable: true })
	description: string;

	// %% RELACIONES

	@ManyToOne(() => TypeGroupEntity)
	@JoinColumn({ name: 'type_group_id' })
	type_group: TypeGroupEntity;

	@OneToOne(() => VerificationNoteEntity, (x) => x.grade_type)
	verification_note: VerificationNoteEntity;
}
