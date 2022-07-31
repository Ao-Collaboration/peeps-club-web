import { createUseStyles } from 'react-jss'
import {
	black,
} from '../../config/colors'
import { mint_page_bg } from '../../config/common-styles'
import { headingFontFamily } from '../../config/jss-vars'

const styles = {
	'@global': {
		'@keyframes bounce': {
			'0%': {
				transform: 'translate(-3%, 0)',
			},
			'25%': {
				transform: 'translate(0, -3%)',
			},
			'50%': {
				transform: 'translate(3%, 0)',
			},
			'75%': {
				transform: 'translate(0, -3%)',
			},
			'100%': {
				transform: 'translate(-3%, 0)',
			},
		},
	},
	pageBg: mint_page_bg,
	page: {
		composes: '$pageBg',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100vw',
		maxHeight: '100vw',
		fontSize: '0.8em',
		overflow: 'hidden',
	},
	title: {
		fontFamily: headingFontFamily,
		color: black,
		fontSize: '2.5em',
		borderRadius: '5em',
		alignSelf: 'start',
	},
	bounce: {
		animationName: 'bounce',
		animationIterationCount: 'infinite',
	},
	peep: {
		composes: '$bounce',
		position: 'absolute',
		'& svg': {
			maxWidth: 'min(30vw, 400px)',
			'& #Time': {
				display: 'none',
			},
			'& #District': {
				display: 'none',
			},
		},
	},
}

export default createUseStyles(styles)
