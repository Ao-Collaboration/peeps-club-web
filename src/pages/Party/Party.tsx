import { ethers } from 'ethers'
import { useCallback, useContext, useEffect, useState } from 'react'
import SVG from 'react-inlinesvg'
import peepsABI from '../../abi/peepsABI.json'
import Loading from '../../components/Loading/Loading'
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

	if (!web3Provider) {
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
			const peepIds: number[] = []
			const svgTasks: Promise<string>[] = []

			// Get random owner peep
			const addr = await signer.getAddress()
			const walletBal = await peepsContract.balanceOf(addr)
			if (walletBal > 0) {
				const randomIdx = Math.floor(Math.random() * walletBal)
				const randomId = await peepsContract.tokenOfOwnerByIndex(
					addr,
					randomIdx,
				)
				svgTasks.push(getPeepSvgFromId(randomId))
				peepIds.push(randomId)
			}
			// Get random peeps
			while (svgTasks.length < NUMBER_PEEPS) {
				const randomId = Math.floor(Math.random() * totalPeeps)
				if (peepIds.indexOf(randomId) === -1) {
					svgTasks.push(getPeepSvgFromId(randomId))
					peepIds.push(randomId)
				}
			}

			const svgs = await Promise.all(svgTasks)
			setPeepImages(svgs)
		}
		doIt()
	}, [peepImages])

	useEffect(() => {
		if (peepImages.length === 0) {
			getRandomPeeps()
		}
	}, [])

	const getPeepSvgFromId = async (peepId: number) => {
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

	const getRandomPeepStyles = (): React.CSSProperties => {
		return {
			left: `${10 + Math.floor(Math.random() * 60)}%`,
			animationDelay: `0.${Math.floor(Math.random() * 100)}s`,
			animationDuration: `${Math.random() + 0.8}s`,
		}
	}

	return (
		<div className={peepImages.length ? classes.page : classes.pageLoading}>
			<h2 className={classes.title}>
				{peepImages.length
					? 'Party timeeeeeee!!!!!'
					: 'Get ready to parrrrtyyyyyy'}
			</h2>
			{peepImages.length ? (
				peepImages.map(svg => (
					<div className={classes.peep} style={getRandomPeepStyles()}>
						<SVG src={svg} />
					</div>
				))
			) : (
				<Loading />
			)}
		</div>
	)
}

export default Party
