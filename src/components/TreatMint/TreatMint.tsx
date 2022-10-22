import { BigNumber, BigNumberish, Contract } from 'ethers'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Button from '../Button/Button'
import Loading from '../Loading/Loading'
import useStyles from './TreatMint.styles'

interface Props {
	treatContract: Contract
	peepId: BigNumberish|null
	price: BigNumber|null
}

const MintPublic: React.FC<Props> = ({
	treatContract,
	peepId,
	price,
}) => {
	const classes = useStyles()
	const [isLoading, setIsLoading] = useState(false)
	const [pendingHash, setPendingHash] = useState<string | null>(null)

	const mint = async () => {
		setIsLoading(true)

		try {
			const tx = await (peepId ? treatContract.mintPeeps(peepId) : treatContract.mintPublic({ value: price }))
			setPendingHash(tx.hash)
			await tx.wait()
			setPendingHash(null)
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
				<div>
					<Button
						onClick={mint}
						className='primary'
					>
						Take some Treats!
					</Button>
				</div>
			)}
		</>
	)
}

export default MintPublic
