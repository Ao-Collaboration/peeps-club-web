import { BigNumber, utils } from 'ethers'
import { useState } from 'react'
import useStyles from './Mint.styles'
import QuantitySelector from './QuantitySelector'

interface Props {
	price: BigNumber
	max: number
	remainingTime: string
	quantity: number
	setQuantity: (quantitiy: number) => void
	onMint: () => void
	isPublic: boolean
}

const Mint: React.FC<Props> = ({
	price,
	max,
	onMint,
	quantity,
	setQuantity,
	remainingTime,
	isPublic,
}) => {
	const classes = useStyles()
	const [agreesToTerms, setAgreesToTerms] = useState(false)

	return (
		<>
			<div className={classes.section}>
				<h2 className={classes.enlargedText}>Purchasing Passports</h2>
				<p className={classes.text}>Gates close in {remainingTime}</p>
				<p className={classes.boldText}>
					How many peeps travelling with you today?
				</p>
			</div>

			<div className={classes.buttonRow}>
				<QuantitySelector
					max={max}
					onClick={setQuantity}
					selectedQuantity={quantity}
				/>
			</div>
			<div className={classes.section}>
				<div className={classes.row}>
					{isPublic && (
						<div>
							<p className={classes.text}>Price</p>
							<p className={classes.enlargedText}>
								{utils.formatEther(price)} eth
							</p>
						</div>
					)}
					<div>
						<p className={classes.text}>Passports</p>
						<p className={classes.enlargedText}>{quantity}</p>
					</div>
					<div>
						<p className={classes.text}>Total</p>
						<p className={classes.enlargedText}>
							{isPublic
								? `${utils.formatEther(price.mul(quantity))} eth`
								: `${utils.formatEther(price)} eth`}
						</p>
						<span>* exclusing GAS</span>
					</div>
				</div>
				<br />
				<div className={classes.termsCheck}>
					<input
						type="checkbox"
						onChange={event => {
							setAgreesToTerms(event.currentTarget.checked)
						}}
						id="termsCheckbox"
					/>
					<label htmlFor="termsCheckbox">
						I have read the terms and conditions
					</label>
				</div>
				<div className={classes.termsCheck}>
					<input type="checkbox" id="nzCheckbox" />
					<label htmlFor="nzCheckbox">I am purchasing from New Zealand</label>
				</div>
			</div>
			<div className={classes.row}>
				<button
					onClick={onMint}
					aria-disabled={!agreesToTerms}
					disabled={!agreesToTerms}
					className={classes.button}
				>
					Confirm Purchase
				</button>
			</div>
		</>
	)
}

export default Mint
