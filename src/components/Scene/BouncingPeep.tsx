import useStyles from './BouncingPeep.styles'
import { greetings } from '../../config/text'
import { useState } from 'react'

interface Props {
	initialGreeting: string
	fadeClass: string
	svgPath: string
	isBubbleFlipped: boolean
}

const BouncingPeep: React.FC<Props> = ({
	initialGreeting,
	fadeClass,
	svgPath,
	isBubbleFlipped,
}) => {
	const classes = useStyles()
	const [greeting, setGreeting] = useState(initialGreeting)

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
