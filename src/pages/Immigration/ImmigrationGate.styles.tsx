import { createUseStyles } from 'react-jss'
import { translucent_white } from '../../config/colors'
import { headingFontFamily } from '../../config/jss-vars'

const styles = {
	'@global': {
		'@keyframes bounce': {
			from: {
				transform: 'translateY(0)',
			},
			to: {
				transform: 'translateY(-3%)',
			},
		},
	},
	page: {
		overflow: 'hidden',
		width: '100vw',
		height: '100vh',
		position: 'absolute',
		top: '0',
	},
	gate: {
		position: 'relative',
		zIndex: '-100',
		'& img': {
			minHeight: '100%',
			width: '100%',
		},
	},
	officer: {
		position: 'absolute',
		top: '0',
		left: '0',
		animationName: 'bounce',
		animationDuration: '0.3s',
		animationDirection: 'alternate',
		animationTimingFunction: 'ease-out',
		animationIterationCount: 'infinite',
	},
	speech: {
		position: 'absolute',
		top: '20%',
		right: '5%',
		backgroundColor: translucent_white,
		width: '20em',
		borderRadius: '2em 2em 2em 0em',
		textAlign: 'center',
		fontSize: '1.4em',
		padding: '0.5em',
		'& h2': {
			fontFamily: headingFontFamily,
		},
	},
	topLayer: {
		position: 'absolute',
		top: '0',
		zIndex: '100',
		overflow: 'hidden',
		minHeight: '100%',
		width: '100%',
	},
	buttonGroup: {
		position: 'absolute',
		top: '55%',
		right: '12%',
		transform: 'translate(-50%, -50%)',
		zIndex: '500',
	},
}

export default createUseStyles(styles)
