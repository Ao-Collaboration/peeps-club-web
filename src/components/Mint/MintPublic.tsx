import { BigNumber, ContractTransaction, ethers, utils } from 'ethers'
import { useContext, useState } from 'react'
import { passportContractId } from '../../config/contract'
import { Web3Context } from '../../context/Web3/Web3Context'
import passportABI from '../../abi/passportABI.json'
import { defaultLoadingMessage } from '../../config/text'
import Spinner from '../Spinner/Spinner'
import Mint from './Mint'
import ReactGA from 'react-ga'

interface Props {
	price: BigNumber
	txLimit: number
	tokensLeft: number
	endTimestamp: number
	onMint: () => void
}

const MintPublic: React.FC<Props> = ({
	price,
	txLimit,
	tokensLeft,
	onMint,
	endTimestamp,
}) => {
	const [quantity, setQuantity] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const [loadingMessage, setLoadingMessage] = useState(defaultLoadingMessage)
	const { web3Provider } = useContext(Web3Context)

	if (!web3Provider) {
		return <></>
	}

	const signer = web3Provider.getSigner()
	const passportContract = new ethers.Contract(
		passportContractId,
		passportABI,
		signer,
	)

	const getRemainingTime = () => {
		const left = endTimestamp - Math.floor(Date.now() / 1000)
		const hours = Math.floor(left / 60 / 60)
		const minutes = Math.floor((left - hours * 60 * 60) / 60)

		return `${hours}h ${minutes}m`
	}

	const mint = async (isNZ: boolean) => {
		setIsLoading(true)

		const address = await signer.getAddress()
		const options = { value: price.mul(quantity).toString() }

		try {
			const tx: ContractTransaction = await passportContract.mintPublic(
				address,
				quantity,
				options,
			)
			setLoadingMessage('Processing transaction ' + tx.hash)
			await tx.wait()
			ReactGA.event({
				category: 'Minting',
				action: 'Mint Public',
				label: isNZ ? 'New Zealand' : 'Other',
			})
			ReactGA.plugin.execute('ec', 'setAction', 'purchase', {
				transaction_id: tx.hash,
				value: utils.formatEther(price.mul(quantity).toString()),
				currency: 'eth',
				affiliation: isNZ ? 'New Zealand Sale' : 'Other',
				items: [
					{
						id: '0',
						name: 'Passport',
						quantity: quantity,
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
					max={Math.min(txLimit, tokensLeft)}
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

export default MintPublic
