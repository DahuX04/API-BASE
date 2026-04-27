export const gradedOutcomesRoutes = {
	graded_outcomes: {
		route: 'graded-outcomes',
		tag: 'Outcomes calificados',
		operation: {
			create: { method: 'POST', route: '/create', summary: 'Registrar outcome calificado' },
			update: { method: 'PUT', route: '/update/:id', summary: 'Actualizar outcome calificado' },
			delete: { method: 'DELETE', route: '/delete/:id', summary: 'Eliminar outcome calificado' },
			getAll: { method: 'GET', route: '/get-all', summary: 'Listar outcomes calificados' },
			getById: { method: 'GET', route: '/get-by-id/:id', summary: 'Obtener outcome calificado' },
			getByFilters: { method: 'POST', route: '/get-by-filters', summary: 'Buscar outcomes calificados' },
		},
	},
};
