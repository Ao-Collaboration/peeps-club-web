import useStyles from './BouncingPeep.styles'
import { greetings } from '../../config/text'

interface Props {
	greeting: string
	fadeClass: string
	setGreeting: (greeting: string) => void
	svgPath: string
	isBubbleFlipped: boolean
}

const BouncingPeep: React.FC<Props> = ({
	greeting,
	fadeClass,
	setGreeting,
	svgPath,
	isBubbleFlipped,
}) => {
	const classes = useStyles()

	const changePhrase = (setGreeting: (text: string) => void) => {
		setGreeting(getRandomGreeting())
	}

	const getRandomGreeting = () => {
		const i = Math.floor(Math.random() * greetings.length)
		return greetings[i]
	}

	return (
		<>
			{greeting.length > 0 && (
				<div
					className={`${
						isBubbleFlipped ? classes.bubbleLeft : classes.bubbleRight
					} ${fadeClass}`}
					onAnimationIteration={() => {
						changePhrase(setGreeting)
					}}
				>
					{greeting}
				</div>
			)}
			<img className={classes.guestPeep} src={svgPath} />
		</>
	)
}

export default BouncingPeep
