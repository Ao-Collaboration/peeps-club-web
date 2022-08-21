import { ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { getPeepsContractId } from '../../config/contract'
import { Web3Context } from '../../context/Web3/Web3Context'
import peepsABI from '../../abi/peepsABI.json'
import { ProfileContext } from '../../context/Profile/ProfileContext'
import Loading from '../../components/Loading/Loading'
import doFetch from '../../utils/doFetch'
import { getTrait } from '../../interface/metadata'
import useStyles from './MirrorPeepSelect.styles'
import { host } from '../../config/api'
import Button from '../../components/Button/Button'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { useNavigate } from 'react-router-dom'
import { MirrorRoute } from '../routes'

interface PeepDisplayInfo {
	name: string
	image: string
	uri: string
	tokenId: number
}

const MirrorPeepSelect = () => {
	const classes = useStyles()
	const { web3Provider } = useContext(Web3Context)
	const { profile, setProfile } = useContext(ProfileContext)
	const { setMetadata } = useContext(MetadataContext)
	const [loadingMessage, setLoadingMessage] = useState('')
	const [tokenIds, setTokenIds] = useState<number[]>([])
	const [peepURIs, setPeepURIs] = useState<string[]>([])
	const [peepDisplayInfo, setPeepDisplayInfo] = useState<PeepDisplayInfo[]>([])
	const navigate = useNavigate()

	if (!web3Provider || !profile || !setMetadata || !setProfile) {
		return <></>
	}

	const signer = web3Provider.getSigner()
	const peepContract = new ethers.Contract(
		getPeepsContractId(web3Provider.network?.chainId),
		peepsABI,
		signer,
	)

	useEffect(() => {
		const getTokenIds = async () => {
			const numTokens: number = await peepContract.balanceOf(profile.address)
			const tokenIds = []
			for (let i = 0; i < numTokens; i++) {
				setLoadingMessage(`Rounding up your Peeps (${i + 1}/${numTokens})`)
				const tokenId = await peepContract.tokenOfOwnerByIndex(
					profile.address,
					i,
				)
				tokenIds.push(tokenId.toNumber())
			}
			setTokenIds(tokenIds)
		}
		getTokenIds()
	}, [])

	useEffect(() => {
		const getURIs = async () => {
			const uriList: string[] = []
			for (let i = 0; i < tokenIds.length; i++) {
				setLoadingMessage(
					`Finding related metadata (${i + 1}/${tokenIds.length})`,
				)
				const uri = await peepContract.tokenURI(tokenIds[i])
				uriList.push(uri)
			}
			setPeepURIs(uriList)
		}
		getURIs()
	}, [tokenIds])

	useEffect(() => {
		const getMetadata = async () => {
			const infoList: PeepDisplayInfo[] = []
			for (let i = 0; i < peepURIs.length; i++) {
				setLoadingMessage(`Downloading Metadata (${i + 1}/${peepURIs.length})`)
				const uriNumber = peepURIs[i].replace(/[^0-9]/g, '')
				const metadata = await doFetch(`${host}/peep/${uriNumber}.json`, 'GET')
				const name = getTrait(metadata.attributes, 'Name')
				infoList.push({
					name: name,
					image: metadata.image,
					uri: uriNumber,
					tokenId: tokenIds[i],
				})
			}
			setPeepDisplayInfo(infoList)
		}
		getMetadata()
	}, [peepURIs])

	const updatePeep = async (info: PeepDisplayInfo) => {
		const metadata = await doFetch(
			`${host}/peep/${info.uri}.json?all=true`,
			'GET',
		)
		setMetadata(metadata.attributes)
		setProfile({ address: profile.address, id: info.uri })
		navigate(MirrorRoute.path, { state: { tokenId: info.tokenId } })
	}

	const getDisplayPeep = (info: PeepDisplayInfo) => {
		return (
			<div className={classes.peepSelect}>
				<p className={classes.text}>{info.name}</p>
				<img src={info.image} className={classes.image} />
				<Button
					onClick={() => {
						updatePeep(info)
					}}
					className={'primary'}
				>
					Update
				</Button>
			</div>
		)
	}

	return (
		<div className={classes.page}>
			<h1 className={classes.title}>Which Peep to update?</h1>
			{peepDisplayInfo.length > 0 ? (
				<div className={classes.container}>
					{peepDisplayInfo.map(info => {
						return getDisplayPeep(info)
					})}
				</div>
			) : (
				<div>
					<Loading overrideMessage={loadingMessage} />
				</div>
			)}
		</div>
	)
}

export default MirrorPeepSelect
