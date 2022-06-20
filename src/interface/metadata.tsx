export interface Metadata {
	name?: string
	district?: string
	pronouns?: string
	birthDay?: number
	birthMonth?: number
	appearance?: Appearance
}

export interface Appearance {
	skinTone: string
	skinConditions?: string
	facialHair?: string
	eyeColour: string
	eyeStyle: string
	eyeOutline?: string
	hairColor: string
	hairStyle: string
	expression: string
	outerwear?: string
	accessory?: string
	clothes?: string
	pose?: string
}

export const defaultPeepMetadata: Metadata = {
	birthDay: 1,
	birthMonth: 1,
	pronouns: 'They/Them',
	district: 'Desert',
	name: '',
	appearance: {
		expression: 'Meow',
		eyeColour: 'Dark Brown',
		eyeStyle: 'Bow',
		hairColor: 'Grey',
		hairStyle: 'Messy Bun',
		skinTone: 'Limestone',
		facialHair: 'None',
		skinConditions: 'None',
		eyeOutline: 'Eyelashes',
		outerwear: 'None',
		accessory: 'None',
		clothes: 'Tucked Tank and Skinny Black Jeans',
		pose: 'Basic'
	}
}
