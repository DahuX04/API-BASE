import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { IntegerFKIDColumn } from 'src/commons/configs/db.configs';
import { CourseSectionEntity } from 'src/modules/academic/course-sections/model/course-sections.entity';
import { StudentEntity } from 'src/modules/academic/students/model/students.entity';

@Entity({ name: 'student_section_enrollments', schema: 'academic' })
export class StudentSectionEnrollmentEntity extends BaseEntity {
	// %% ATRIBUTOS

	@IntegerFKIDColumn({ nullable: false })
	enrolled_student_id: number;

	@IntegerFKIDColumn({ nullable: false })
	course_section_id: number;

	// %% RELACIONES

	@ManyToOne(() => StudentEntity)
	@JoinColumn({ name: 'enrolled_student_id' })
	enrolled_student: StudentEntity;

	@ManyToOne(() => CourseSectionEntity)
	@JoinColumn({ name: 'course_section_id' })
	course_section: CourseSectionEntity;
}
