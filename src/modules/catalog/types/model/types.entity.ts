import { Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { NameColumn, CodeColumn, IntegerFKIDColumn, BooleanColumn } from 'src/commons/configs/db.configs';
import { TypeGroupEntity } from 'src/modules/catalog/type-groups/model/type-groups.entity';
import { VerificationNoteEntity } from 'src/modules/grades/verification-notes/model/verification-notes.entity';

@Entity({ name: 'types' })
export class TypeEntity extends BaseEntity {
	// %% ATRIBUTOS
	// @relation: one-to-many
	@IntegerFKIDColumn()
	type_group_id: number;

	@CodeColumn()
	code: string;

	@NameColumn({ nullable: false })
	name: string;

	@BooleanColumn({ nullable: false, withDefault: true, default: false })
	is_editable: boolean;

	// %% RELACIONES

	@ManyToOne(() => TypeGroupEntity)
	@JoinColumn({ name: 'type_group_id' })
	type_group: TypeGroupEntity;

	@OneToOne(() => VerificationNoteEntity, (x) => x.grade_type)
	verification_note: VerificationNoteEntity;
}
