import { Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { NameColumn, CodeColumn, TextMediumColumn, IntegerFKIDColumn, DecimalColumn } from 'src/commons/configs/db.configs';
import { TypeEntity } from 'src/modules/catalog/types/model/types.entity';
import { UbicationEntity } from 'src/modules/catalog/ubications/model/ubications.entity';

@Entity({ name: 'verification_notes' })
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

	// @relation: one-to-many
	@IntegerFKIDColumn({ nullable: false })
	ubication_id: number;

	// %% RELACIONES

	@OneToOne(() => TypeEntity, (x) => x.verification_note)
	@JoinColumn({ name: 'grade_type_id' })
	grade_type: TypeEntity;

	@ManyToOne(() => UbicationEntity)
	@JoinColumn({ name: 'ubication_id' })
	ubication: UbicationEntity;
}
