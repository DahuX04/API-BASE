export const usersRoutes = {
	users: {
		route: 'users',
		tag: 'Usuarios',
		operation: {
			create: { method: 'POST', route: '/create', summary: 'Registrar usuario' },
			update: { method: 'PUT', route: '/update/:id', summary: 'Actualizar usuario' },
			delete: { method: 'DELETE', route: '/delete/:id', summary: 'Eliminar usuario' },
			getAll: { method: 'GET', route: '/get-all', summary: 'Listar usuarios' },
			getById: { method: 'GET', route: '/get-by-id/:id', summary: 'Obtener usuario' },
			getByFilters: { method: 'POST', route: '/get-by-filters', summary: 'Buscar usuarios' },
		},
	},
};
