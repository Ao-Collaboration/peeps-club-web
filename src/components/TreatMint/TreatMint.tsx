import { BigNumber, BigNumberish, Contract, utils } from 'ethers'
import { useState } from 'react'
import ReactGA from 'react-ga'
import Loading from '../Loading/Loading'
import { toast } from 'react-toastify'
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
	const [agreesToTerms, setAgreesToTerms] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [pendingHash, setPendingHash] = useState<string | null>(null)

	const mint = async () => {
		setIsLoading(true)
		const isNZ = (document.getElementById('nzCheckbox') as HTMLInputElement).checked

		try {
			const tx = await (peepId ? treatContract.mintPeeps(peepId) : treatContract.mintPublic({ value: price }))
			setPendingHash(tx.hash)
			await tx.wait()
			setPendingHash(null)
			if (price) {
				ReactGA.event({
					category: 'Minting Treat',
					action: 'Mint Treat',
					label: isNZ ? 'New Zealand' : 'Other',
				})
				ReactGA.plugin.execute('ec', 'setAction', 'purchase', {
					transaction_id: tx.hash,
					value: utils.formatEther(price.toString()),
					currency: 'eth',
					affiliation: isNZ ? 'New Zealand Sale' : 'Other',
					items: [
						{
							id: '1',
							name: 'Treat',
							quantity: 1,
						},
					],
				})
			}
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
				<>
					<div className={classes.section}>
						<h2 className={classes.enlargedText}>Trick or Treat</h2>
					</div>

					<div className={classes.checkBoxList}>
						<div className={classes.termsCheck}>
							<input
								type="checkbox"
								onChange={event => {
									setAgreesToTerms(event.currentTarget.checked)
								}}
								id="termsCheckbox"
							/>
							<label htmlFor="termsCheckbox">
								I have read the{' '}
								<a
									href="https://peeps.club/terms-and-conditions"
									target={'_blank'}
								>
									terms and conditions
								</a>
							</label>
						</div>
						<div className={classes.termsCheck}>
							<input type="checkbox" id="nzCheckbox" />
							<label htmlFor="nzCheckbox">
								I am purchasing from New Zealand
							</label>
						</div>
					</div>
					<div className={classes.row}>
						<button
							onClick={mint}
							aria-disabled={!agreesToTerms}
							disabled={!agreesToTerms}
							className={classes.button}
						>
							Confirm Purchase
						</button>
					</div>
				</>
			)}
		</>
	)
}

export default MintPublic
