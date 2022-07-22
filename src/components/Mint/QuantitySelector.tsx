import useStyles from './QuantitySelector.styles'

interface Props {
	onClick: (quantity: number) => void
	max: number
	selectedQuantity: number
}

const QuantitySelector: React.FC<Props> = ({
	onClick,
	max,
	selectedQuantity,
}) => {
	const classes = useStyles()
	const buttons = Array.from(Array(max).keys())

	return (
		<>
			{buttons.map(i => {
				return (
					<button
						className={`${classes.selectButton} ${
							selectedQuantity === i + 1 && classes.selected
						}`}
						aria-selected={selectedQuantity === i + 1}
						onClick={() => {
							onClick(i + 1)
						}}
						key={i}
					>
						{i + 1}
					</button>
				)
			})}
		</>
	)
}

export default QuantitySelector
