import { Entity } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { NameColumn, CodeColumn, TextMediumColumn, IntegerColumn } from 'src/commons/configs/db.configs';

@Entity({ name: 'users', schema: 'organization' })
export class UserEntity extends BaseEntity {
	// %% ATRIBUTOS

	@CodeColumn({ nullable: false })
	document_type_id: number;

	@IntegerColumn({ nullable: false })
	document_code: number;

	@NameColumn({ nullable: false })
	first_name: string;

	@NameColumn({ nullable: false })
	last_name: string;

	@TextMediumColumn({ nullable: false })
	email: string;

	@NameColumn()
	phone: string;

	// %% RELACIONES
}
