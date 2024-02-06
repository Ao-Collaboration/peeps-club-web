import { Trait } from './metadata'

// Note: This matches the first category (excluding hidden)
export type CategorySelection =
	| 'Accessory'
	| 'Face'
	| 'Clothing'
	| 'Pose'
	| 'Location'

export const removeLocationTraits = (traits: Trait[]) =>
	traits.filter(t => !t.categories?.includes('Location'))
