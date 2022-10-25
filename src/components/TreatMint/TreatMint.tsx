import { BigNumber, BigNumberish, Contract } from 'ethers'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { ProfileContext } from '../../context/Profile/ProfileContext'
import Button from '../Button/Button'
import Loading from '../Loading/Loading'
import useStyles from './TreatMint.styles'

interface Props {
	treatContract: Contract
	peepId: BigNumberish | null
	price: BigNumber | null
}

const MintPublic: React.FC<Props> = ({ treatContract, peepId, price }) => {
	const { profile } = useContext(ProfileContext)

	const classes = useStyles()
	const [isDown, setIsDown] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [treatsBefore, setTreatsBefore] = useState(0)
	const [treatsAfter, setTreatsAfter] = useState(0)
	const [treatIds, setTreatIds] = useState<BigNumberish[]>([])
	const [pendingHash, setPendingHash] = useState<string | null>()

	const mint = async () => {
		setIsDown(true)
		setTimeout(async () => {
			try {
				const before = ((await treatContract.balanceOf(profile?.address)) as BigNumber).toNumber()
				setTreatsBefore(before)
				const tx = await (peepId
					? treatContract.mintPeeps(peepId, { gasLimit: 150000 })
					: treatContract.mintPublic({ value: price, gasLimit: 150000 }))
				setIsLoading(true)
				setPendingHash(tx.hash)
				await tx.wait()
				const after = ((await treatContract.balanceOf(profile?.address)) as BigNumber).toNumber()
				setTreatsAfter(after)
				setTreatIds((await treatContract.tokensOfOwner(profile?.address) as BigNumber[]).slice(before - after).map(n => n.toNumber()))
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
						className={`${classes.candy} ${
							pendingHash && !isDown && classes.candyUp
						}`}
						src={'/assets/candyq.png'}
					/>
					<img
						aria-hidden
						className={`${classes.arm} ${isDown && classes.armDown}`}
						src={'/assets/claw.svg'}
					/>
					<img
						aria-hidden
						className={`${classes.bag}`}
						src={'/assets/Bag top.svg'}
					/>
					{!isDown && (
						<div className={classes.top}>
							{pendingHash && (
								<p className={classes.text}>
									Wooo, you grabbed {treatsAfter - treatsBefore} Treats!
									<br />
									Want to try again?
								</p>
							)}
							<Button onClick={mint} className='primary'>
								Take some Treats!
							</Button>
						</div>
					)}
					{treatIds.length > 0 && (
						<div className={classes.treatBox}>
							{treatIds.map(tid => 
								<img
									aria-hidden
									className={classes.treat}
									src={`https://api.peeps.club/treats/${tid}.png`}
								/>
							)}
						</div>
					)}
				</>
			)}
		</>
	)
}

export default MintPublic
