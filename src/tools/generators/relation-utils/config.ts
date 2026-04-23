export const ENTITY_CONFIG: Record<
	string,
	{
		entity: string;
		path: string;
		singular: string;
		plural: string;
	}
> = {
	currencies: {
		entity: 'CurrencyEntity',
		path: 'catalog/currencies',
		singular: 'currency',
		plural: 'currencies',
	},

	parameters: {
		entity: 'ParameterEntity',
		path: 'catalog/parameters',
		singular: 'parameter',
		plural: 'parameters',
	},

	type: {
		entity: 'TypeEntity',
		path: 'catalog/types',
		singular: 'type',
		plural: 'types',
	},

	type_group: {
		entity: 'TypeGroupEntity',
		path: 'catalog/type-groups',
		singular: 'type_group',
		plural: 'type_groups',
	},

	ubication: {
		entity: 'UbicationEntity',
		path: 'catalog/ubications',
		singular: 'ubication',
		plural: 'ubications',
	},

	verification_note: {
		entity: 'VerificationNoteEntity',
		path: 'grades/verification-notes',
		singular: 'verification_note',
		plural: 'verification_notes',
	},

	user: {
		entity: 'UserEntity',
		path: 'organization/users',
		singular: 'user',
		plural: 'users',
	},

	staff: {
		entity: 'StaffEntity',
		path: 'organization/staff',
		singular: 'staff',
		plural: 'staffs',
	},

	campus: {
		entity: 'CampusEntity',
		path: 'organization/campuses',
		singular: 'campus',
		plural: 'campuses',
	},

	chart_level: {
		entity: 'ChartLevelEntity',
		path: 'organization/chart-levels',
		singular: 'chart_level',
		plural: 'chart_levels',
	},

	accreditor: {
		entity: 'AccreditorEntity',
		path: 'accreditation/accreditors',
		singular: 'accreditor',
		plural: 'accreditors',
	},

	academic_period: {
		entity: 'AcademicPeriodEntity',
		path: 'academic/academic-periods',
		singular: 'academic_period',
		plural: 'academic_periods',
	},

	program: {
		entity: 'ProgramEntity',
		path: 'academic/programs',
		singular: 'program',
		plural: 'programs',
	},

	course: {
		entity: 'CourseEntity',
		path: 'academic/courses',
		singular: 'course',
		plural: 'courses',
	},

	chart: {
		entity: 'ChartEntity',
		path: 'organization/charts',
		singular: 'chart',
		plural: 'charts',
	},

	commission: {
		entity: 'CommissionEntity',
		path: 'accreditation/commissions',
		singular: 'commission',
		plural: 'commissions',
	},

	student: {
		entity: 'StudentEntity',
		path: 'academic/students',
		singular: 'student',
		plural: 'students',
	},

	study_plan: {
		entity: 'StudyPlanEntity',
		path: 'academic/study-plans',
		singular: 'study_plan',
		plural: 'study_plans',
	},

	professor: {
		entity: 'ProfessorEntity',
		path: 'academic/professors',
		singular: 'professor',
		plural: 'professors',
	},

	program_commission: {
		entity: 'ProgramCommissionEntity',
		path: 'accreditation/program-commissions',
		singular: 'program_commission',
		plural: 'program_commissions',
	},

	study_plan_academic_period: {
		entity: 'StudyPlanAcademicPeriodEntity',
		path: 'academic/study-plan-academic-periods',
		singular: 'study_plan_academic_period',
		plural: 'study_plan_academic_periods',
	},

	outcome: {
		entity: 'OutcomeEntity',
		path: 'accreditation/outcomes',
		singular: 'outcome',
		plural: 'outcomes',
	},

	enrolled_students: {
		entity: 'EnrolledStudentEntity',
		path: 'academic/enrolled-students',
		singular: 'enrolled_student',
		plural: 'enrolled_students',
	},

	study_plan_course: {
		entity: 'StudyPlanCourseEntity',
		path: 'academic/study-plan-courses',
		singular: 'study_plan_course',
		plural: 'study_plan_courses',
	},

	course_section: {
		entity: 'CourseSectionEntity',
		path: 'academic/course-sections',
		singular: 'course_section',
		plural: 'course_sections',
	},

	course_outcome_mapping: {
		entity: 'CourseOutcomeMappingEntity',
		path: 'academic/course-outcome-mappings',
		singular: 'course_outcome_mapping',
		plural: 'course_outcome_mappings',
	},

	student_section_enrollments: {
		entity: 'StudentSectionEnrollmentEntity',
		path: 'academic/student-section-enrollments',
		singular: 'student_section_enrollment',
		plural: 'student_section_enrollements',
	},

};
