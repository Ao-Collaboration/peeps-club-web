import useStyles from './FadeTo.styles'

interface Props {
	color: string,
	isFadeOut?: boolean, // or fade in
	isFading: boolean,
	onAnimationEnd?: () => void
}

const FadeTo: React.FC<Props> = ({ color, isFadeOut = true, isFading, onAnimationEnd }) => {
	const classes = useStyles({
		backgroundColor: color
	})

	const animation = isFadeOut ? classes.fadeOutAnimation : classes.fadeInAnimation

	return (
		<div className={`${classes.fadeTo} ${isFading ? animation : ''}`}
			onAnimationEnd={onAnimationEnd}>
		</div>
	)
}

export default FadeTo
