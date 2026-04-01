export const verificationNotesRoutes = {
	verification_notes: {
		route: 'verification-notes',
		tag: 'Notas de verificación',
		operation: {
			create: { method: 'POST', route: '/create', summary: 'Registrar nota' },
			update: { method: 'PUT', route: '/update/:id', summary: 'Actualizar nota' },
			delete: { method: 'DELETE', route: '/delete/:id', summary: 'Eliminar nota' },
			getAll: { method: 'GET', route: '/get-all', summary: 'Listar notas' },
			getById: { method: 'GET', route: '/get-by-id/:id', summary: 'Obtener nota' },
			getByFilters: { method: 'POST', route: '/get-by-filters', summary: 'Buscar notas' },
		},
	},
};
