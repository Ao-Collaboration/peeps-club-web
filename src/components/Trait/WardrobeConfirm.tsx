import { ContractTransaction, ethers } from 'ethers'
import { useContext, useState } from 'react'
import { host } from '../../config/api'
import { peepsContractID } from '../../config/contract'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { Web3Context } from '../../context/Web3/Web3Context'
import doFetch from '../../utils/doFetch'
import Button from '../Button/Button'
import peepsABI from '../../abi/peepsABI.json'
import useStyles from './WardrobeConfirm.styles'
import { defaultLoadingMessage } from '../../config/text'
import { useNavigate } from 'react-router-dom'
import { YourPeepRoute } from '../../pages/routes'

const WardrobeConfirm = () => {
	const { metadata } = useContext(MetadataContext)
	const { web3Provider } = useContext(Web3Context)
	const [isLoading, setIsLoading] = useState(false)
	const [loadingMessage, setLoadingMessage] = useState(defaultLoadingMessage)
	const navigate = useNavigate()

	if (!metadata || !web3Provider) {
		return <></>
	}

	const signer = web3Provider?.getSigner()
	const peepsContract = new ethers.Contract(peepsContractID, peepsABI, signer)

	const getName = () => {
		return metadata.filter(trait => {
			return trait.trait_type === 'Name'
		})[0].value
	}

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
			setLoadingMessage('Processing transaction ' + tx.hash)
			await tx.wait()
			setLoadingMessage(defaultLoadingMessage)

			navigate(YourPeepRoute.path)
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
					<p> {loadingMessage}</p>
				) : (
					<Button onClick={mintPeep}>Mint {getName()}</Button>
				)}
			</div>
			<div className={classes.hangerContainer}></div>
		</div>
	)
}

export default WardrobeConfirm
