export const ENTITY_CONFIG: Record<
	string,
	{
		entity: string;
		path: string;
		singular: string;
		plural: string;
	}
> = {
	user: {
		entity: 'UserEntity',
		path: 'auth/users',
		singular: 'user',
		plural: 'users',
	},

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
};
