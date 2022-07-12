import { ContractTransaction, ethers, utils } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { passportContractId } from '../../config/contract'
import { ProfileContext } from '../../context/Profile/ProfileContext'
import { Web3Context } from '../../context/Web3/Web3Context'
import passportABI from '../../abi/passportABI.json'
import doFetch from '../../utils/doFetch'
import { host } from '../../config/api'
import Button from '../Button/Button'
import { defaultLoadingMessage } from '../../config/text'

const MintSigned: React.FC = () => {
	const [quantity, setQuantity] = useState(1)
	const [price, setPrice] = useState(0)
	const [expiry, setExpiry] = useState(0)
	const [maxQuantity, setMaxQuantity] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const [loadingMessage, setLoadingMessage] = useState(defaultLoadingMessage)
	const { profile } = useContext(ProfileContext)
	const { web3Provider } = useContext(Web3Context)

	if (!profile || !web3Provider) {
		return <></>
	}

	const signer = web3Provider?.getSigner()
	const passportContract = new ethers.Contract(
		passportContractId,
		passportABI,
		signer,
	)

	useEffect(() => {
		const getPrices = async () => {
			setIsLoading(true)
			const req = {
				address: profile.address,
				quantity: quantity,
			}
			const results = await doFetch(`${host}/mint/passport/price/`, 'POST', req)
			setPrice(results.price)
			setExpiry(results.expiry)
			setMaxQuantity(results.maxQuantity)
			setIsLoading(false)
		}

		getPrices()
	}, [quantity])

	const updateQuantity = () => {
		const updatedQuantity = parseInt(
			(document.getElementById('quantityInput') as HTMLInputElement).value,
		)
		if (updatedQuantity >= 1 && updatedQuantity <= maxQuantity) {
			setQuantity(updatedQuantity)
		}
	}

	const getAuthorisation = async () => {
		const req = {
			address: profile.address,
			quantity: quantity,
		}
		return await doFetch(`${host}/mint/passport/authorise/`, 'POST', req)
	}

	const mint = async () => {
		setIsLoading(true)

		const options = { value: price }

		const authorisation = await getAuthorisation()

		try {
			const tx: ContractTransaction = await passportContract.mintSigned(
				authorisation.price,
				authorisation.quantity,
				authorisation.expiry,
				authorisation.nonce,
				authorisation.signature,
				options,
			)
			setLoadingMessage('Processing transaction ' + tx.hash)
			await tx.wait()
			setLoadingMessage(defaultLoadingMessage)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			{isLoading ? (
				<p>{loadingMessage}</p>
			) : (
				<>
					<input
						id="quantityInput"
						onChange={updateQuantity}
						type="number"
						defaultValue={quantity}
						min={1}
						max={maxQuantity}
					></input>
					<div>
						<Button onClick={mint}>
							Mint {quantity} for {utils.formatEther(price)} eth
						</Button>
						<p>Available until {new Date(expiry).toString()}</p>
					</div>
				</>
			)}
		</>
	)
}

export default MintSigned
