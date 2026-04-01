export const ubicationsRoutes = {
	ubications: {
		route: 'ubications',
		tag: 'Ubicaciones',
		operation: {
			create: { method: 'POST', route: '/create', summary: 'Registrar ubicación' },
			update: { method: 'PUT', route: '/update/:id', summary: 'Actualizar ubicación' },
			delete: { method: 'DELETE', route: '/delete/:id', summary: 'Eliminar ubicación' },
			getAll: { method: 'GET', route: '/get-all', summary: 'Listar ubicaciones' },
			getById: { method: 'GET', route: '/get-by-id/:id', summary: 'Obtener ubicación' },
			getByFilters: { method: 'POST', route: '/get-by-filters', summary: 'Buscar ubicaciones' },
		},
	},
};
