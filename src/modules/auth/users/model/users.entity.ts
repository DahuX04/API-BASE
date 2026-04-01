import { Entity } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { EmailColumn, PasswordColumn, BooleanColumn } from 'src/commons/configs/db.configs';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
	// %% ATRIBUTOS
	@EmailColumn({ unique: true })
	email: string;

	@PasswordColumn({ nullable: true })
	password?: string;

	@BooleanColumn()
	is_admin: boolean;

	// %% RELACIONES
}
