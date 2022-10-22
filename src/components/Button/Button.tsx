import useStyles, { ClassNames } from './Button.styles'

export type ButtonClassNames = ClassNames

export interface ButtonProps {
	className?: ClassNames
	children?: React.ReactNode
	onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
	const classes = useStyles()

	return (
		<button className={classes[className || 'button']} onClick={onClick}>
			{children}
		</button>
	)
}

export default Button
