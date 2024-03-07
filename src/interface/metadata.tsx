export type Trait = {
	name: string
	label?: string
	tags?: string[]
	categories?: string[]
	exclusive?: {
		projectName: string
		projectLink: string
	}
}

export const getTrait = (metadata: Trait[], category: string) => {
	const trait = metadata.find(trait =>
		trait.categories?.includes(category),
	)?.name
	if (!trait) {
		// eslint-disable-next-line no-console
		console.error(`Unable to find ${category} in`, metadata)
	}
	return trait ?? '' // FIXME Error handle instead
}

export const traitsToMetadata = (traits: Trait[]) =>
	traits.map(t => ({
		value: t.name,
		trait_type: t.categories?.join(' - ') ?? '',
	}))

//FIXME Default Peep values
export const DEFAULT_PEEP: Trait[] = [
	{
		name: 'Desert',
		categories: ['District'],
	},
	{
		name: 'Night',
		categories: ['Time'],
	},
	{
		name: 'Black Tank Top',
		categories: ['Clothing', 'Tops', 'Tank Top'],
	},
	{
		name: 'Skinny Jeans',
		categories: ['Clothing', 'Bottoms', 'Pants'],
	},
	{
		name: 'Meow',
		categories: ['Face', 'Expression'],
	},
	{
		name: 'Dark Brown Eye Colour',
		categories: ['Face', 'Eyes', 'Colour'],
	},
	{
		name: 'Classic Eyelashes',
		categories: ['Face', 'Eyes', 'Lashes'],
	},
	{
		name: 'Bow',
		categories: ['Face', 'Eyes', 'Style'],
	},
	{
		name: 'Messy Bun',
		categories: ['Face', 'Hair', 'Style'],
	},
	{
		name: 'Grey Hair Colour',
		categories: ['Face', 'Hair', 'Colour'],
	},
	{
		name: 'Basic',
		categories: ['Pose'],
	},
	{
		name: 'Limestone',
		categories: ['Face', 'Skin', 'Tone'],
	},
	{
		categories: ['Pronouns'],
		name: 'They/Them',
	},
	{
		categories: ['Birthday'],
		name: '4 February',
	},
	{
		categories: ['Name'],
		name: '',
	},
]
