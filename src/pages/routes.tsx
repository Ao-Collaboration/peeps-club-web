export interface Route {
	name: string
	path: string
	basePath?: string
}

export const HomeRoute: Route = {
	name: 'Home',
	path: '/',
}

export const MintRoute: Route = {
	name: 'Mint',
	path: '/mint',
}

export const AirplaneRoute: Route = {
	name: 'Airplane',
	path: '/airplane',
}

export const ImmigrationRoute: Route = {
	name: 'Immigration',
	path: '/immigration',
}

export const ImmigrationIntroRoute: Route = {
	name: 'ImmigrationIntro',
	path: '/immigration-intro',
}

export const ImmigrationGateRoute: Route = {
	name: 'ImmigrationGate',
	path: '/immigration-gate',
}

export const WardrobeRoute: Route = {
	name: 'Wardrobe',
	path: '/wardrobe',
}
