export const typesRoutes = {
	route: 'types',
	tag: 'Tipos',
	operation: {
		create: {
			method: 'POST',
			route: '/create',
			summary: 'Registrar tipo',
		},
		update: {
			method: 'PUT',
			route: '/update/:id',
			summary: 'Actualizar tipo',
			params: [
				{
					name: 'id',
					description: 'ID del Tipo',
					type: Number,
				},
			],
		},
		delete: {
			method: 'DELETE',
			route: '/delete/:id',
			summary: 'Eliminar tipo',
			params: [
				{
					name: 'id',
					description: 'ID del Tipo',
					type: Number,
				},
			],
		},
		getAll: {
			method: 'GET',
			route: '/get-all',
			summary: 'Listar tipos',
		},
		getById: {
			method: 'GET',
			route: '/get-by-id/:id',
			summary: 'Obtener tipo',
			params: [
				{
					name: 'id',
					description: 'ID del Tipo',
					type: Number,
				},
			],
		},
		getByFilters: {
			method: 'POST',
			route: '/get-by-filters',
			summary: 'Buscar tipos',
		},
		getByTypeGroupCode: {
			method: 'GET',
			route: '/get-by-type-group-code/:type_group_code',
			summary: 'Servicio para encontrar tipos según el codigo del grupo de tipos.',
			params: [
				{
					name: 'type_group_code',
					description: 'Código del grupo de tipos.',
					type: String,
				},
			],
		},
	},
};
