import { Entity } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { TextMediumColumn } from 'src/commons/configs/db.configs';

@Entity({ name: 'actions', schema: 'improvement' })
export class ActionEntity extends BaseEntity {
	// %% ATRIBUTOS

	@TextMediumColumn({ nullable: false })
	description: string;

	// %% RELACIONES
}
