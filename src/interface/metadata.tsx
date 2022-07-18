import { CategoryName } from './availableTraits'

export type Trait = {
	trait_type: CategoryName
	value: string
}

export const getTrait = (metadata: Trait[], category: CategoryName) => {
	return metadata.filter(trait => {
		return trait.trait_type === category
	})[0].value
}

export const getTextDescription = (metadata : Trait[]) => {
	let description = `Looking at your peep's face you see a ${getTrait(metadata, 'Skin')} complexion,`
	if(getTrait(metadata, 'Skin Condition') !== 'None'){
		description+= ` with ${getTrait(metadata, 'Skin Condition')}`
	}
	description += ` and big ${getTrait(metadata, 'Eye Colour')} ${getTrait(metadata, 'Eye Style')} eyes.`
	description += ' Their face is framed by their'
	if(getTrait(metadata, 'Facial Hair') !== 'None'){
		description+= ` ${getTrait(metadata, 'Facial Hair')} and`
	}
	description += ` ${getTrait(metadata, 'Hair Colour')} ${getTrait(metadata, 'Hair')}.`
	
	description += ` They have an ${getTrait(metadata, 'Expression')} expression on their face.`
	return description
}

export const defaultPeep: Trait[] = [
	{
		trait_type: 'Tops',
		value: 'Tucked Tank',
	},
	{
		trait_type: 'Bottoms',
		value: 'Skinny Black Jeans',
	},
	{
		trait_type: 'One Piece',
		value: 'None',
	},
	{
		trait_type: 'Clothing Accessory',
		value: 'None',
	},
	{
		trait_type: 'District',
		value: 'Desert',
	},
	{
		trait_type: 'Expression',
		value: 'Meow',
	},
	{
		trait_type: 'Eye Colour',
		value: 'Dark Brown',
	},
	{
		trait_type: 'Eye Outline',
		value: 'Eyelashes',
	},
	{
		trait_type: 'Eye Style',
		value: 'Bow',
	},
	{
		trait_type: 'Facial Hair',
		value: 'None',
	},
	{
		trait_type: 'Front Accessory',
		value: 'None',
	},
	{
		trait_type: 'Hair',
		value: 'Messy Bun',
	},
	{
		trait_type: 'Hair Colour',
		value: 'Grey',
	},
	{
		trait_type: 'Outerwear',
		value: 'None',
	},
	{
		trait_type: 'Pose',
		value: 'Basic',
	},
	{
		trait_type: 'Rear Accessory',
		value: 'None',
	},
	{
		trait_type: 'Skin',
		value: 'Limestone',
	},
	{
		trait_type: 'Skin Condition',
		value: 'None',
	},
	{
		trait_type: 'Time',
		value: 'Night',
	},
	{
		trait_type: 'Top Facial Hair',
		value: 'None',
	},
	{
		trait_type: 'Pronouns',
		value: 'He/Him',
	},
	{
		trait_type: 'Birthday',
		value: '4 February',
	},
	{
		trait_type: 'Name',
		value: '',
	},
	{
		trait_type: 'Shoes',
		value: 'Crocs',
	},
]
