export const outcomeRubricsRoutes = {
	outcome_rubrics: {
		route: 'outcome-rubrics',
		tag: 'Outcomes de rúbrica',
		operation: {
			create: { method: 'POST', route: '/create', summary: 'Registrar outcome de rúbrica' },
			update: { method: 'PUT', route: '/update/:id', summary: 'Actualizar outcome de rúbrica' },
			delete: { method: 'DELETE', route: '/delete/:id', summary: 'Eliminar outcome de rúbrica' },
			getAll: { method: 'GET', route: '/get-all', summary: 'Listar outcomes de rúbrica' },
			getById: { method: 'GET', route: '/get-by-id/:id', summary: 'Obtener outcome de rúbrica' },
			getByFilters: { method: 'POST', route: '/get-by-filters', summary: 'Buscar outcomes de rúbrica' },
		},
	},
};
