import { ContractTransaction, ethers } from 'ethers'
import { useContext, useState } from 'react'
import { passportContractId } from '../../config/contract'
import { Web3Context } from '../../context/Web3/Web3Context'
import passportABI from '../../abi/passportABI.json'
import Button from '../Button/Button'
import { defaultLoadingMessage } from '../../config/text'

interface Props {
	price: number
	txLimit: number
	tokensLeft: number
}

const MintPublic: React.FC<Props> = ({ price, txLimit, tokensLeft }) => {
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
		const options = { value: price * quantity }

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
					{isMintDone ? (
						<p>
							Congrats you minted {quantity} Passport for{' '}
							{(price / 10 ** 18) * quantity} eth
						</p>
					) : (
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
									Mint {quantity} for {(price / 10 ** 18) * quantity} eth
								</Button>
							</div>
						</>
					)}
				</>
			)}
		</>
	)
}

export default MintPublic
