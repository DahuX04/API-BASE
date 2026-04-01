import { Entity } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { NameColumn, CodeColumn, TextShortColumn } from 'src/commons/configs/db.configs';

@Entity({ name: 'currencies' })
export class CurrencyEntity extends BaseEntity {
	// %% ATRIBUTOS
	@CodeColumn()
	code: string;

	@NameColumn({ nullable: false })
	name: string;

	@TextShortColumn({ nullable: false })
	symbol: string;

	// %% RELACIONES
}
