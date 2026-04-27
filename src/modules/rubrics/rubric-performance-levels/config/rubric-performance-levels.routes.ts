export const rubricPerformanceLevelsRoutes = {
	rubric_performance_levels: {
		route: 'rubric-performance-levels',
		tag: 'Niveles de desempeño por rúbrica',
		operation: {
			create: { method: 'POST', route: '/create', summary: 'Registrar nivel de desempeño en rúbrica' },
			update: { method: 'PUT', route: '/update/:id', summary: 'Actualizar nivel de desempeño en rúbrica' },
			delete: { method: 'DELETE', route: '/delete/:id', summary: 'Eliminar nivel de desempeño en rúbrica' },
			getAll: { method: 'GET', route: '/get-all', summary: 'Listar niveles de desempeño por rúbrica' },
			getById: { method: 'GET', route: '/get-by-id/:id', summary: 'Obtener nivel de desempeño por rúbrica' },
			getByFilters: { method: 'POST', route: '/get-by-filters', summary: 'Buscar niveles de desempeño por rúbrica' },
		},
	},
};
