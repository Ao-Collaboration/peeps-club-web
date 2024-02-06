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
import { YourPeepRoute } from '../../pages/routes'
import Loading from '../Loading/Loading'
import { ProfileContext } from '../../context/Profile/ProfileContext'
import { getTrait } from '../../interface/metadata'

const WardrobeConfirm = () => {
	const { metadata } = useContext(MetadataContext)
	const { profile } = useContext(ProfileContext)
	const { web3Provider } = useContext(Web3Context)
	const [isLoading, setIsLoading] = useState(false)
	const [pendingHash, setPendingHash] = useState<string | null>(null)
	const navigate = useNavigate()

	if (!metadata || !web3Provider || !profile) {
		return <></>
	}

	const signer = web3Provider?.getSigner()
	const peepsContract = new ethers.Contract(
		getPeepsContractId(web3Provider?.network?.chainId),
		peepsABI,
		signer,
	)

	const getName = () => getTrait(metadata, 'Name')

	const mintPeep = async () => {
		setIsLoading(true)
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
			<div className={classes.doorpanel}>
				<h1 className="">Mint your Peep</h1>
				<p>Are you ready to burn your passport to mint your Peep?</p>
				{isLoading ? (
					<Loading hash={pendingHash} />
				) : (
					<Button onClick={mintPeep}>Mint {getName()}</Button>
				)}
			</div>
			<div className={classes.hangerContainer}></div>
		</div>
	)
}

export default WardrobeConfirm
