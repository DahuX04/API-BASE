export const routes = {
	route: 'parameters',
	tag: 'Parámetros del Sistema',
	operation: {
		create: { method: 'POST', route: '/create', summary: 'Registrar parámetro' },
		update: { method: 'PUT', route: '/update/:id', summary: 'Actualizar parámetro' },
		delete: { method: 'DELETE', route: '/delete/:id', summary: 'Eliminar parámetro' },
		getAll: { method: 'GET', route: '/get-all', summary: 'Listar parámetros' },
		getById: { method: 'GET', route: '/get-by-id/:id', summary: 'Obtener parámetro por ID' },
		getByFilters: { method: 'POST', route: '/get-by-filters', summary: 'Buscar parámetros' },
		reset: {
			method: 'POST',
			route: '/reset/:tenant',
			summary: 'Restablecer parámetros',
			params: [
				{
					name: 'tenant',
					description: 'Tenant del centro médico',
					type: String,
				},
			],
		},
	},
};
