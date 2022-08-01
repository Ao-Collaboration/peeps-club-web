export interface Category {
	category: CategoryName
	items: TraitOption[]
}

export interface TraitOption {
	name: string
	exclusive?: string
	isAvailable?: boolean
	link?: string
}

export type CategoryName =
	| 'District'
	| 'Time'
	| 'Tops'
	| 'Bottoms'
	| 'One Piece'
	| 'Outerwear'
	| 'Pose'
	| 'Rear Accessory'
	| 'Skin Condition'
	| 'Hair'
	| 'Hair Colour'
	| 'Expression'
	| 'Eye Colour'
	| 'Eye Style'
	| 'Clothing Accessory'
	| 'Facial Hair'
	| 'Eye Outline'
	| 'Front Accessory'
	| 'Skin'
	| 'Pronouns'
	| 'Birthday'
	| 'Name'
	| 'Shoes'
