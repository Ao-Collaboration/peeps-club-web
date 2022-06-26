export interface Category {
    category: CategoryName
    items: TraitOption[]
}

export interface TraitOption {
    name: string
    exclusive?: boolean
}

export type CategoryName = 'District' | 'Time' | 'Clothes' | 'Outerwear' | 'Pose' | 'Rear Accessory' | 'Skin Condition' | 'Hair' | 'Hair Colour' | 'Expression' | 'Eye Colour' | 'Eye Style' | 'Clothing Accessory' | 'Facial Hair' | 'Eye Outline' | 'Top Facial Hair' | 'Front Accessory' | 'Skin' | 'Head' | 'Eye Whites'