import { BigNumber, ContractTransaction, ethers, utils } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { getPassportContractId } from '../../config/contract'
import { ProfileContext } from '../../context/Profile/ProfileContext'
import { Web3Context } from '../../context/Web3/Web3Context'
import passportABI from '../../abi/passportABI.json'
import doFetch from '../../utils/doFetch'
import { host } from '../../config/api'
import Mint from './Mint'
import ReactGA from 'react-ga'
import Loading from '../Loading/Loading'
import { toast } from 'react-toastify'

interface Props {
	onMint: () => void
}

const MintSigned: React.FC<Props> = ({ onMint }) => {
	const [quantity, setQuantity] = useState(1)
	const [price, setPrice] = useState<BigNumber>(BigNumber.from(0))
	const [expiry, setExpiry] = useState(0)
	const [maxQuantity, setMaxQuantity] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const [pendingHash, setPendingHash] = useState<string | null>(null)
	const { profile } = useContext(ProfileContext)
	const { web3Provider } = useContext(Web3Context)

	if (!profile || !web3Provider) {
		return <></>
	}

	const signer = web3Provider?.getSigner()
	const passportContract = new ethers.Contract(
		getPassportContractId(web3Provider?.network?.chainId),
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
		const left = expiry - Math.floor(Date.now() / 1000) - 60*60 // Remove 1 hour for display
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
				value: utils.formatEther(authorisation.price),
				currency: 'eth',
				affiliation: isNZ ? 'New Zealand Sale' : 'Other',
				items: [
					{
						id: '0',
						name: 'Passport',
						quantity: authorisation.quantity,
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
					isPublic={false}
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
