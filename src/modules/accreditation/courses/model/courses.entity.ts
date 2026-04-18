import { Entity } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { NameColumn, TextMediumColumn } from 'src/commons/configs/db.configs';

@Entity({ name: 'courses', schema: 'organization' })
export class CourseEntity extends BaseEntity {
	// %% ATRIBUTOS

	@NameColumn({ nullable: false })
	name: string;

	@TextMediumColumn({ nullable: false })
	description: string;

	@TextMediumColumn({ nullable: false })
	learning_outcome: string;

	// %% RELACIONES
}
