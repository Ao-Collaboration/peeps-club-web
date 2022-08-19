import { ethers } from 'ethers'
import { FC, useContext, useState } from 'react'
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

interface Props {
	tokenId: number
}

const WardrobeUpdate: React.FC<Props> = ({ tokenId }) => {
	const { metadata } = useContext(MetadataContext)
	const { profile } = useContext(ProfileContext)
	const { web3Provider } = useContext(Web3Context)
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	if (!metadata || !web3Provider || !profile) {
		return <></>
	}

	const signer = web3Provider?.getSigner()

	const getName = () => {
		return metadata.filter(trait => {
			return trait.trait_type === 'Name'
		})[0].value
	}

	const getMessage = async () => {
		const response = await doFetch(
			`${host}/passport/message/${profile.address}/`,
			'GET',
		)
		return response.message
	}

	const signMessage = async () => {
		const message = await getMessage()
		const signature = await signer.signMessage(message)

		return signature
	}

	const updatePeep = async () => {
		setIsLoading(true)
		const signature = await signMessage()
		const req = {
			attributes: metadata,
			signature: signature,
			token_id: tokenId,
		}

		try {
			await doFetch(`${host}/peep/update`, 'POST', req)

			navigate(YourPeepRoute.path, { state: { uri: profile.id } })
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
				<h1 className="">Update your Peep</h1>
				<p>Are you sure you want to update your Peep?</p>
				{isLoading ? (
					<Loading />
				) : (
					<Button onClick={updatePeep}>Update {getName()}</Button>
				)}
			</div>
			<div className={classes.hangerContainer}></div>
		</div>
	)
}

export default WardrobeUpdate
