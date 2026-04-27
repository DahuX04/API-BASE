export const outcomeCriteriasRoutes = {
	outcome_criterias: {
		route: 'outcome-criterias',
		tag: 'Criterios de outcome',
		operation: {
			create: { method: 'POST', route: '/create', summary: 'Registrar criterio de outcome' },
			update: { method: 'PUT', route: '/update/:id', summary: 'Actualizar criterio de outcome' },
			delete: { method: 'DELETE', route: '/delete/:id', summary: 'Eliminar criterio de outcome' },
			getAll: { method: 'GET', route: '/get-all', summary: 'Listar criterios de outcome' },
			getById: { method: 'GET', route: '/get-by-id/:id', summary: 'Obtener criterio de outcome' },
			getByFilters: { method: 'POST', route: '/get-by-filters', summary: 'Buscar criterios de outcome' },
		},
	},
};
