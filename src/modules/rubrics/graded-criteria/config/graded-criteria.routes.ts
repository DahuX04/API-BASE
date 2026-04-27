export const gradedCriteriaRoutes = {
	graded_criteria: {
		route: 'graded-criteria',
		tag: 'Criterios calificados',
		operation: {
			create: { method: 'POST', route: '/create', summary: 'Registrar criterio calificado' },
			update: { method: 'PUT', route: '/update/:id', summary: 'Actualizar criterio calificado' },
			delete: { method: 'DELETE', route: '/delete/:id', summary: 'Eliminar criterio calificado' },
			getAll: { method: 'GET', route: '/get-all', summary: 'Listar criterios calificados' },
			getById: { method: 'GET', route: '/get-by-id/:id', summary: 'Obtener criterio calificado' },
			getByFilters: { method: 'POST', route: '/get-by-filters', summary: 'Buscar criterios calificados' },
		},
	},
};
