import { Entity } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { NameColumn, TextMediumColumn, DecimalColumn } from 'src/commons/configs/db.configs';

@Entity({ name: 'performance_levels', schema: 'rubrics' })
export class PerformanceLevelEntity extends BaseEntity {
	// %% ATRIBUTOS

	@NameColumn({ nullable: false })
	name: string;

	@TextMediumColumn({ nullable: true })
	description: string;

	@DecimalColumn({ nullable: false })
	min_score: number;

	@DecimalColumn({ nullable: false })
	max_score: number;

	@NameColumn({ nullable: false })
	evaluation_type: string;

	@NameColumn({ nullable: false })
	color: string;

	// %% RELACIONES
}
