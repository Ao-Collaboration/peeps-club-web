import { CategoryName } from './availableTraits'

export type Trait = {
	trait_type: CategoryName
	value: string
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
