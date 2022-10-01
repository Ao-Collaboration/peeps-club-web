import { BigNumber, ContractTransaction, ethers, utils } from 'ethers'
import { useContext, useState } from 'react'
import { getPassportContractId } from '../../config/contract'
import { Web3Context } from '../../context/Web3/Web3Context'
import passportABI from '../../abi/passportABI.json'
import Mint from './Mint'
import ReactGA from 'react-ga'
import Loading from '../Loading/Loading'
import { toast } from 'react-toastify'
import { formatRemainingTime } from '../../utils/format'

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
	const [pendingHash, setPendingHash] = useState<string | null>(null)
	const { web3Provider } = useContext(Web3Context)

	if (!web3Provider) {
		return <></>
	}

	const signer = web3Provider.getSigner()
	const passportContract = new ethers.Contract(
		getPassportContractId(web3Provider.network?.chainId),
		passportABI,
		signer,
	)

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
			setPendingHash(tx.hash)
			await tx.wait()
			setPendingHash(null)
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
			onMint()
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			if (err?.error?.code === -32000) {
				toast.error('You don\'t have enough ETH!')
			} else {
				toast.error('Unable to mint!')
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			{isLoading ? (
				<Loading hash={pendingHash} />
			) : (
				<Mint
					isPublic={true}
					max={Math.min(txLimit, tokensLeft)}
					onMint={mint}
					price={price}
					quantity={quantity}
					remainingTime={formatRemainingTime(endTimestamp)}
					setQuantity={setQuantity}
				/>
			)}
		</>
	)
}

export default MintPublic
