import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { IntegerFKIDColumn } from 'src/commons/configs/db.configs';
import { StudyPlanCourseEntity } from 'src/modules/academic/study-plan-courses/model/study-plan-courses.entity';
import { TypeEntity } from 'src/modules/core/types/model/types.entity';

@Entity({ name: 'assessments', schema: 'rubrics' })
export class AssessmentEntity extends BaseEntity {
	// %% ATRIBUTOS

	@IntegerFKIDColumn({ nullable: false })
	study_plan_course_id: number;

	@IntegerFKIDColumn({ nullable: false })
	type_id: number;

	// %% RELACIONES

	@ManyToOne(() => StudyPlanCourseEntity)
	@JoinColumn({ name: 'study_plan_course_id' })
	study_plan_course: StudyPlanCourseEntity;

	@ManyToOne(() => TypeEntity)
	@JoinColumn({ name: 'type_id' })
	type: TypeEntity;
}
