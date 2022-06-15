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
    hairColor: string
    hairStyle: string
}