export const criteriaPerformanceLevelsRoutes = {
	criteria_performance_levels: {
		route: 'criteria-performance-levels',
		tag: 'Niveles de desempeño por criterio',
		operation: {
			create: { method: 'POST', route: '/create', summary: 'Registrar nivel de desempeño por criterio' },
			update: { method: 'PUT', route: '/update/:id', summary: 'Actualizar nivel de desempeño por criterio' },
			delete: { method: 'DELETE', route: '/delete/:id', summary: 'Eliminar nivel de desempeño por criterio' },
			getAll: { method: 'GET', route: '/get-all', summary: 'Listar niveles de desempeño por criterio' },
			getById: { method: 'GET', route: '/get-by-id/:id', summary: 'Obtener nivel de desempeño por criterio' },
			getByFilters: { method: 'POST', route: '/get-by-filters', summary: 'Buscar niveles de desempeño por criterio' },
		},
	},
};
