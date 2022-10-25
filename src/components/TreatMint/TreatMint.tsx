import { BigNumber, BigNumberish, Contract } from 'ethers'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Button from '../Button/Button'
import Loading from '../Loading/Loading'
import useStyles from './TreatMint.styles'

interface Props {
	treatContract: Contract
	peepId: BigNumberish | null
	price: BigNumber | null
}

const MintPublic: React.FC<Props> = ({ treatContract, peepId, price }) => {
	const classes = useStyles()
	const [isDown, setIsDown] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [pendingHash, setPendingHash] = useState<string | null>(null)

	const mint = async () => {
		setIsDown(true)
		setTimeout(async () => {
			try {
				const tx = await (peepId
					? treatContract.mintPeeps(peepId, { gasLimit: 150000 })
					: treatContract.mintPublic({ value: price, gasLimit: 150000 }))
				setIsLoading(true)
				setPendingHash(tx.hash)
				await tx.wait()
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				if (err?.error?.code === -32000) {
					toast.error('You don\'t have enough ETH!')
				} else {
					toast.error('Unable to mint!')
				}
			} finally {
				setIsLoading(false)
				setTimeout(() => {
					setIsDown(false)
				}, 500)
			}
		}, 3000)
	}

	return (
		<>
			{isLoading ? (
				<Loading hash={pendingHash} />
			) : (
				<>
					<img
						aria-hidden
						className={`${classes.bag}`}
						src={'/assets/Bag bottom.svg'}
					/>
					<img
						aria-hidden
						className={`${classes.candy} ${ pendingHash && !isDown && classes.candyUp }`}
						src={'/assets/candyq.png'}
					/>
					<img
						aria-hidden
						className={`${classes.arm} ${ isDown && classes.armDown}`}
						src={'/assets/claw.svg'}
					/>
					<img
						aria-hidden
						className={`${classes.bag}`}
						src={'/assets/Bag top.svg'}
					/>
					{!isDown && !pendingHash && (
						<div className={classes.top}>
							<Button onClick={mint} className='primary'>
								Take some Treats!
							</Button>
						</div>
					)
					}
				</>
			)}
		</>
	)
}

export default MintPublic
