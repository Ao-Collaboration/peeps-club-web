export const partnerExclusives: PartnerInfo[] = [
	{
		name: 'The Kindness Project',
		link: 'https://www.thekindnessprojectnft.com/',
	},
]

export type PartnerInfo = {
	name: string
	link: string
}

export const getPartnerInfo = (name: string) => {
	return partnerExclusives.filter(item => {
		return item.name === name
	})[0]
}
