import { BigNumber, ContractTransaction, ethers, utils } from 'ethers'
import { useContext, useState } from 'react'
import { passportContractId } from '../../config/contract'
import { Web3Context } from '../../context/Web3/Web3Context'
import passportABI from '../../abi/passportABI.json'
import Button from '../Button/Button'
import { defaultLoadingMessage } from '../../config/text'

interface Props {
	price: BigNumber
	txLimit: number
	tokensLeft: number
	onMint: () => void
}

const MintPublic: React.FC<Props> = ({
	price,
	txLimit,
	tokensLeft,
	onMint,
}) => {
	const [quantity, setQuantity] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const [isMintDone, setIsMintDone] = useState(false)
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

	const updateQuantity = () => {
		const updatedQuantity = (
			document.getElementById('quantityInput') as HTMLInputElement
		).value
		setQuantity(parseInt(updatedQuantity))
	}

	const mint = async () => {
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
			setLoadingMessage(defaultLoadingMessage)
			setIsMintDone(true)
			onMint()
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
					<>
						<input
							id="quantityInput"
							onChange={updateQuantity}
							type="number"
							defaultValue={1}
							min={1}
							max={Math.min(txLimit, tokensLeft)}
						></input>
						<div>
							<Button onClick={mint}>
								Mint {quantity} for {utils.formatEther(price.mul(quantity))} eth
							</Button>
						</div>
					</>
					{isMintDone && (
						<p>
							Congrats you minted {quantity} Passport for{' '}
							{utils.formatEther(price.mul(quantity))} eth
						</p>
					)}
				</>
			)}
		</>
	)
}

export default MintPublic
