import { ContractTransaction, ethers } from 'ethers'
import { useContext, useState } from 'react'
import { host } from '../../config/api'
import { getPeepsContractId } from '../../config/contract'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { Web3Context } from '../../context/Web3/Web3Context'
import doFetch from '../../utils/doFetch'
import Button from '../Button/Button'
import peepsABI from '../../abi/peepsABI.json'
import useStyles from './WardrobeConfirm.styles'
import { useNavigate } from 'react-router-dom'
import { YourOffChainPeepRoute, YourPeepRoute } from '../../pages/routes'
import Loading from '../Loading/Loading'
import { ProfileContext } from '../../context/Profile/ProfileContext'
import { getTrait, traitsToMetadata } from '../../interface/metadata'

const WardrobeConfirm = () => {
	const { metadata } = useContext(MetadataContext)
	const { profile } = useContext(ProfileContext)
	const { web3Provider } = useContext(Web3Context)
	const [isLoading, setIsLoading] = useState(false)
	const [pendingHash, setPendingHash] = useState<string | null>(null)
	const navigate = useNavigate()

	if (!metadata || !profile) {
		return <></>
	}

	if (!web3Provider && profile.address) {
		return <></>
	}

	const getName = () => getTrait(metadata, 'Name')

	const mintPeep = async () => {
		setIsLoading(true)
		const signer = web3Provider?.getSigner()
		const peepsContract = new ethers.Contract(
			getPeepsContractId(web3Provider?.network?.chainId),
			peepsABI,
			signer,
		)
		const req = { attributes: metadata }
		const response = await doFetch(`${host}/mint/peep/authorise/`, 'POST', req)

		try {
			const tx: ContractTransaction = await peepsContract.passportMint(
				response.nonce,
				response.signature,
				response.id,
			)
			setPendingHash(tx.hash)
			await tx.wait()
			setPendingHash(null)

			navigate(YourPeepRoute.path, {
				state: { uri: profile.id, isUpdate: false },
			})
		} finally {
			setIsLoading(false)
		}
	}

	const createOffChainPeep = async () => {
		setIsLoading(true)
		await doFetch(`${host}/mint/peep/create/`, 'POST', {
			attributes: traitsToMetadata(metadata),
		})

		navigate(YourOffChainPeepRoute.path, {
			state: { uri: profile.id, isUpdate: false },
		})
	}

	const classes = useStyles()
	return (
		<div className={classes.container}>
			<img
				src="/assets/wardrobe_rear.svg"
				className={classes.wardrobeContainer}
			/>
			<img
				src="/assets/wardrobe_front.svg"
				className={classes.wardrobeContainerFront}
			/>
			<img
				src="/assets/wardrobe_door.svg"
				className={`${classes.wardrobeDoor} ${classes.openWardrobe}`}
			/>
			{ !profile.address ? (
				<div className={classes.doorpanel}>
					<h1 className="">Create your Peep</h1>
					<p>Are you ready?</p>
					{isLoading ? (
						<Loading />
					) : (
						<Button onClick={createOffChainPeep}>Create {getName()}</Button>
					)}
				</div>
			) : (
				<div className={classes.doorpanel}>
					<h1 className="">Mint your Peep</h1>
					<p>Are you ready to burn your passport to mint your Peep?</p>
					{isLoading ? (
						<Loading hash={pendingHash} />
					) : (
						<Button onClick={mintPeep}>Mint {getName()}</Button>
					)}
				</div>
			)}
			<div className={classes.hangerContainer}></div>
		</div>
	)
}

export default WardrobeConfirm
