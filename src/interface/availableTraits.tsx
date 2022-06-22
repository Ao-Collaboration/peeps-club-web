export interface Category{
    category: string
    items: TraitOption[]
}

export interface TraitOption{
    name: string
    exclusive?: boolean
}
