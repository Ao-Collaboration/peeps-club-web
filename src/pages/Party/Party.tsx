import { ethers } from 'ethers'
import { useCallback, useContext, useEffect, useState } from 'react'
import SVG from 'react-inlinesvg'
import peepsABI from '../../abi/peepsABI.json'
import { host } from '../../config/api'
import { getPeepsContractId } from '../../config/contract'
import { Web3Context } from '../../context/Web3/Web3Context'
import doFetch from '../../utils/doFetch'
import useStyles from './Party.styles'

const NUMBER_PEEPS = 10

const Party = () => {
	const classes = useStyles()
	const { web3Provider } = useContext(Web3Context)
	const [peepImages, setPeepImages] = useState<string[]>([])

	if (
		!web3Provider
	) {
		return <></>
	}

	const signer = web3Provider?.getSigner()
	const peepsContract = new ethers.Contract(
		getPeepsContractId(web3Provider?.network?.chainId),
		peepsABI,
		signer,
	)

	const getRandomPeeps = useCallback(() => {
		const doIt = async () => {
			const totalPeeps = await peepsContract.totalSupply()
			const svgs: string[] = []
			const peepIds: number[] = []
			while(svgs.length < NUMBER_PEEPS) {
				const randomId = Math.floor(Math.random() * totalPeeps)
				if (peepIds.indexOf(randomId) === -1) {
					const uri: string = await peepsContract.tokenURI(randomId)
					const svgId = uri.split(/\/(\d+)/)[1]
					svgs.push(await getPeepFromURI(svgId))
					peepIds.push(randomId)
				}
			}
			setPeepImages(svgs)
		}
		doIt()
	}, [peepImages])

	useEffect(() => {
		if (peepImages.length === 0) {
			getRandomPeeps()
		}
	}, [])

	const getPeepFromURI = async (peepURI: string) => {
		const svg = await doFetch(
			`${host}/peep/${peepURI}.svg`,
			'GET',
			undefined,
			'image/svg+xml',
		)
		return URL.createObjectURL(svg)
	}

	const getRandomPeepStyles = (): React.CSSProperties => {
		return {
			left: `${10 + Math.floor(Math.random() * 60)}%`,
			animationDelay: `0.${Math.floor(Math.random() * 100)}s`,
			animationDuration: `${Math.random() + 0.8}s`,
		}
	}

	return (
		<div className={classes.page}>
			<h2 className={classes.title}>
				{peepImages.length ? 'Party timeeeeeee!!!!!' : 'Get ready to parrrrtyyyyyy'}
			</h2>
			{peepImages.map(svg => (
				<div className={classes.peep} style={getRandomPeepStyles()}>
					<SVG src={svg} />
				</div>
			))}
		</div>
	)
}

export default Party
