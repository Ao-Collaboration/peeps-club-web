export type Trait = {
	name: string
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
	},
	{
		name: 'Skinny Jeans',
	},
	{
		name: 'Meow',
	},
	{
		name: 'Dark Brown',
	},
	{
		name: 'Classic Eyelashes',
	},
	{
		name: 'Bow',
	},
	{
		name: 'Messy Bun',
	},
	{
		name: 'Grey Hair',
	},
	{
		name: 'Basic',
	},
	{
		name: 'Limestone',
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
