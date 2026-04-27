import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { IntegerFKIDColumn } from 'src/commons/configs/db.configs';
import { PerformanceLevelEntity } from 'src/modules/rubrics/performance-levels/model/performance-levels.entity';

@Entity({ name: 'rubric_performance_levels', schema: 'rubrics' })
export class RubricPerformanceLevelEntity extends BaseEntity {
	// %% ATRIBUTOS

	@IntegerFKIDColumn({ nullable: false })
	rubric_id: number;

	@IntegerFKIDColumn({ nullable: false })
	performance_level_id: number;

	// %% RELACIONES

	@ManyToOne(() => PerformanceLevelEntity)
	@JoinColumn({ name: 'performance_level_id' })
	performance_level: PerformanceLevelEntity;
}
