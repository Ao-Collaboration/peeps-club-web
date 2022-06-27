import useStyles, { ClassNames } from './Button.styles'

interface Props {
	className?: ClassNames
	children?: React.ReactNode
	onClick: () => void
}

const Button: React.FC<Props> = ({ children, onClick, className }) => {
	const classes = useStyles()

	return (
		<button className={classes[className || 'button']} onClick={onClick}>
			{children}
		</button>
	)
}

export default Button
