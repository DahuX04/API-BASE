export const currenciesRoutes = {
	currencies: {
		route: 'currencies',
		tag: 'Monedas',
		operation: {
			create: { method: 'POST', route: '/create', summary: 'Registrar moneda' },
			update: { method: 'PUT', route: '/update/:id', summary: 'Actualizar moneda' },
			delete: { method: 'DELETE', route: '/delete/:id', summary: 'Eliminar moneda' },
			getAll: { method: 'GET', route: '/get-all', summary: 'Listar monedas' },
			getById: { method: 'GET', route: '/get-by-id/:id', summary: 'Obtener moneda' },
			getByFilters: { method: 'POST', route: '/get-by-filters', summary: 'Buscar monedas' },
		},
	},
};
