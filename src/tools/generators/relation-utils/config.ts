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

	campuse: {
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
		path: 'organization/accreditors',
		singular: 'accreditor',
		plural: 'accreditors',
	},

	academic_period: {
		entity: 'AcademicPeriodEntity',
		path: 'organization/academic-periods',
		singular: 'academic_period',
		plural: 'academic_periods',
	},

	program: {
		entity: 'ProgramEntity',
		path: 'organization/programs',
		singular: 'program',
		plural: 'programs',
	},

	course: {
		entity: 'CourseEntity',
		path: 'organization/courses',
		singular: 'course',
		plural: 'courses',
	},

	chart: {
		entity: 'ChartEntity',
		path: 'organization/charts',
		singular: 'chart',
		plural: 'charts',
	},
};
