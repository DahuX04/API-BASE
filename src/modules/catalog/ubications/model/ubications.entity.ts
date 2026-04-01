import { Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { NameColumn, CodeColumn, IntegerFKIDColumn } from 'src/commons/configs/db.configs';
import { VerificationNoteEntity } from 'src/modules/grades/verification-notes/model/verification-notes.entity';

@Entity({ name: 'ubications' })
export class UbicationEntity extends BaseEntity {
	// %% ATRIBUTOS
	@IntegerFKIDColumn({ nullable: true })
	root_ubication_id?: number;

	@CodeColumn()
	code: string;

	@NameColumn({ nullable: false })
	name: string;

	// %% RELACIONES

	@ManyToOne(() => UbicationEntity)
	@JoinColumn({ name: 'root_ubication_id' })
	root_ubication: UbicationEntity;

	@OneToMany(() => VerificationNoteEntity, (x) => x.ubication)
	verification_notes: VerificationNoteEntity[];
}
