import { Entity } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { CodeColumn, TextLargeColumn, TextFullColumn, BooleanColumn } from 'src/commons/configs/db.configs';

@Entity({ name: 'parameters' })
export class ParameterEntity extends BaseEntity {
	// %% ATRIBUTOS
	@CodeColumn()
	code: string;

	@TextFullColumn({ nullable: false })
	value: string;

	@TextLargeColumn({ nullable: true })
	description?: string;

	@BooleanColumn()
	is_json: boolean;

	@BooleanColumn()
	is_encrypted: boolean;

	// %% RELACIONES
}
