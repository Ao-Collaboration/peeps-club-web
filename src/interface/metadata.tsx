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

export const getTopDescription = (metadata: Trait[]) => {
	// FIXME This is broken with the new category system - probably need overhaul
	let description = `Looking at ${getTrait(
		metadata,
		'Name',
	)}'s face you see a ${getTrait(metadata, 'Skin')} complexion,`
	if (getTrait(metadata, 'Skin Condition') !== 'None') {
		description += ` with ${getTrait(metadata, 'Skin Condition')}`
	}
	description += ` and big ${getTrait(metadata, 'Eye Colour')} ${getTrait(
		metadata,
		'Eye Style',
	)} eyes.`
	description += ' Their face is framed by their'
	if (getTrait(metadata, 'Facial Hair') !== 'None') {
		description += ` ${getTrait(metadata, 'Facial Hair')} and`
	}
	description += ` ${getTrait(metadata, 'Hair Colour')} ${getTrait(
		metadata,
		'Hair',
	)}.`

	description += ` They have an ${getTrait(
		metadata,
		'Expression',
	)} expression on their face.`
	return description
}

export const getFullDescription = (metadata: Trait[]) => {
	// FIXME This is broken with the new category system - probably need overhaul
	let description = getTopDescription(metadata)
	description += ` In their ${getTrait(
		metadata,
		'Pose',
	)} pose, they are rocking a pair of ${getTrait(metadata, 'Shoes')} and`
	if (getTrait(metadata, 'One Piece') !== 'None') {
		description += ` are wearing a ${getTrait(metadata, 'One Piece')}.`
	} else {
		description += ` are wearing a ${getTrait(metadata, 'Tops')} and ${getTrait(
			metadata,
			'Bottoms',
		)}.`
	}
	description += ` In the background you can see the ${getTrait(
		metadata,
		'District',
	)}.`
	return description
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
