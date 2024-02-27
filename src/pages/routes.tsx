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

export const ImmigrationIntroRoute: Route = {
	name: 'ImmigrationIntro',
	path: '/immigration-intro',
}

export const ImmigrationGateRoute: Route = {
	name: 'ImmigrationGate',
	path: '/immigration-gate',
}

export const ImmigrationExitRoute: Route = {
	name: 'Immigration Exit',
	path: '/immigration-exit',
}

export const WardrobeRoute: Route = {
	name: 'Wardrobe',
	path: '/wardrobe',
}

export const MirrorRoute: Route = {
	name: 'Mirror',
	path: '/mirror',
}

export const MirrorPeepSelectRoute: Route = {
	name: 'My Peeps',
	path: '/my-peeps',
}

export const YourPeepRoute: Route = {
	name: 'Welcome',
	path: '/welcome',
}

export const YourOffChainPeepRoute: Route = {
	name: 'New Peep',
	path: '/new-peep',
}

export const PartyRoute: Route = {
	name: 'Party',
	path: '/party',
}

export const ProfileRoute: Route = {
	name: 'Profile',
	path: '/profile',
}
