import { BigNumber, ContractTransaction, ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { passportContractId } from '../../config/contract'
import { ProfileContext } from '../../context/Profile/ProfileContext'
import { Web3Context } from '../../context/Web3/Web3Context'
import passportABI from '../../abi/passportABI.json'
import doFetch from '../../utils/doFetch'
import { host } from '../../config/api'
import { defaultLoadingMessage } from '../../config/text'
import Spinner from '../Spinner/Spinner'
import Mint from './Mint'
import ReactGA from 'react-ga'

interface Props {
	onMint: () => void
}

const MintSigned: React.FC<Props> = ({ onMint }) => {
	const [quantity, setQuantity] = useState(1)
	const [price, setPrice] = useState<BigNumber>(BigNumber.from(0))
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
			setPrice(BigNumber.from(results.price))
			setExpiry(results.expiry)
			setMaxQuantity(results.maxQuantity)
			setIsLoading(false)
		}

		getPrices()
	}, [quantity])

	const getAuthorisation = async () => {
		const req = {
			address: profile.address,
			quantity: quantity,
		}
		return await doFetch(`${host}/mint/passport/authorise/`, 'POST', req)
	}

	const getRemainingTime = () => {
		const left = expiry - Math.floor(Date.now() / 1000)
		const hours = Math.floor(left / 60 / 60)
		const minutes = Math.floor((left - hours * 60 * 60) / 60)

		return `${hours}h ${minutes}m`
	}

	const mint = async (isNZ: boolean) => {
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
			// ReactGA.event({
			// 	category: 'Minting',
			// 	action: 'Mint Public',
			// 	label: isNZ ? 'New Zealand' : 'Other',
			// })
			ReactGA.plugin.require('ecommerce')
			ReactGA.plugin.execute('ecommerce', 'purchase', {
				transaction_id: tx.hash,
				value: authorisation.price,
				currency: 'eth',
				affiliation: isNZ ? 'New Zealand Sale' : 'Other',
				items: [
					{
						id: '1',
						name: 'Passport',
						quantity: authorisation.quantity,
					},
				],
			})
			setLoadingMessage(defaultLoadingMessage)
			onMint()
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			{isLoading ? (
				<>
					<Spinner />
					<p>{loadingMessage}</p>
				</>
			) : (
				<Mint
					isPublic={true}
					max={maxQuantity}
					onMint={mint}
					price={price}
					quantity={quantity}
					remainingTime={getRemainingTime()}
					setQuantity={setQuantity}
				/>
			)}
		</>
	)
}

export default MintSigned
