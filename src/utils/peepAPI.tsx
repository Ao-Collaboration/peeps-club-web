import { Contract } from 'ethers'
import { host } from '../config/api'
import doFetch from './doFetch'

export const getPeepSvgFromId = async (peepsContract: Contract, peepId: number) => {
	const uri: string = await peepsContract.tokenURI(peepId)
	const svgId = uri.split(/\/(\d+)/)[1]
	const svg = await doFetch(
		`${host}/peep/${svgId}.svg`,
		'GET',
		undefined,
		'image/svg+xml',
	)
	return URL.createObjectURL(svg)
}

