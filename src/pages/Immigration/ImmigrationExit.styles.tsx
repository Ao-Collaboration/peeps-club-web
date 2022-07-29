import { createUseStyles } from 'react-jss'
import { light_blue } from '../../config/colors'
import { headingFontFamily } from '../../config/jss-vars'

const styles = {
	'@global': {
		'@keyframes move': {
			'0%': {
				transform: 'translateX(0%)',
			},
			'100%': {
				transform: 'translateX(600%)',
			},
		},
	},
	gate: {},
	bg: {
		minHeight: '100%',
		width: '100%',
		position: 'absolute',
		top: '0',
		left: '0',
	},
	front: {
		composes: '$bg',
		zIndex: '10000',
	},
	back: {
		composes: '$bg',
		zIndex: '-1000',
	},
	move: {
		animationName: 'move',
		animationDuration: '12s',
		animationFillMode: 'forwards',
		animationTimingFunction: 'linear',
		onIterationCount: '1',
	},
	peep: {
		maxWidth: 'min(30vw, 400px)',
		zIndex: '1000',
		position: 'absolute',
	},
	granny: {
		composes: '$peep',
		top: '35%',
		left: '0%',
		transform: 'translateX(0%)',
	},
	yourPeep: {
		composes: '$peep',
		top: '30%',
		left: '-15%',
	},
	bubble: {
		backgroundColor: light_blue,
		padding: '0.4em',
		fontFamily: headingFontFamily,
		fontSize: '1.5em',
		composes: '$bubble',
		borderRadius: '20px 20px 20px 0px',
		marginLeft: '10em',
	},
	skipButton: {
		position: 'absolute',
		bottom: '1em',
		right: '1em',
		zIndex: '1000',
	},
}

export default createUseStyles(styles)
