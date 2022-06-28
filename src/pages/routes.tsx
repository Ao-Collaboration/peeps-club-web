export interface Route {
	name: string
	path: string
	basePath?: string
}

export const HomeRoute: Route = {
	name: 'Home',
	path: '/',
}

export const AirplaneRoute: Route = {
	name: 'Airplane',
	path: '/airplane',
}

export const ImmigrationRoute: Route = {
	name: 'Immigration',
	path: '/immigration',
}

export const WardrobeRoute: Route = {
	name: 'Wardrobe',
	path: '/wardrobe',
}
