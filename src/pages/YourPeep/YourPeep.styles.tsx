import { createUseStyles } from 'react-jss'
import {
	black,
	dark_grey,
	transparent_blue,
	light_blue,
	white,
	yellow,
} from '../../config/colors'
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
		'@keyframes fadeInAndOut': {
			'0%': { opacity: '0' },
			'5%': { opacity: '1' },
			'70%': { opacity: '1' },
			'75%': { opacity: '0' },
			'100%': { opacity: '0' },
		},
	},
	fadeInAndOut1: {
		animationName: 'fadeInAndOut',
		animationDuration: '5s',
		animationDirection: 'normal',
		animationTimingFunction: 'linear',
		animationIterationCount: 'infinite',
	},
	fadeInAndOut2: {
		composes: '$fadeInAndOut1',
		animationDelay: '0.5s',
	},
	fadeInAndOut3: {
		composes: '$fadeInAndOut1',
		animationDelay: '2s',
	},
	fadeInAndOut4: {
		composes: '$fadeInAndOut1',
		animationDelay: '1s',
	},
	page: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		width: '100vw',
		position: 'absolute',
		top: '0',
		zIndex: '-100',
		overflow: 'hidden',
	},
	title: {
		fontFamily: headingFontFamily,
		color: black,
		fontSize: '2.5rem',
		padding: '1rem 2.5rem',
		borderRadius: '5rem',
	},
	peepImage: {
		maxWidth: '400px',
		border: `20px solid ${yellow}`,
		borderRadius: '10px',
		padding: '5px',
	},
	buttonGroup: {
		display: 'flex',
		marginTop: '1em',
		justifyContent: 'center',
		alignItems: 'center',
	},
	link: {
		backgroundColor: transparent_blue,
		padding: '1em',
		borderRadius: '50%',
		width: '3em',
		height: '3em',
		margin: '0.5em',
	},
	button: {
		background: transparent_blue,
		fontFamily: headingFontFamily,
		color: white,
		fontSize: '2rem',
		margin: '0.5em',
		padding: '1rem 2rem',
		borderRadius: '2em',
		textTransform: 'uppercase',
		textDecoration: 'none',
		cursor: 'pointer',
		'&:disabled': {
			backgroundColor: dark_grey,
			cursor: 'default',
		},
		'&:hover': {
			textDecoration: 'underline',
		},
	},
	guestPeep: {
		maxWidth: '400px',
	},
	bounce: {
		animationName: 'bounce',
		animationDuration: '0.3s',
		animationDirection: 'alternate',
		animationTimingFunction: 'ease-out',
		animationIterationCount: 'infinite',
	},
	milky: {
		composes: '$bounce',
		animationDelay: '0.1s',
		position: 'absolute',
		left: '10%',
	},
	jono: {
		composes: '$bounce',
		position: 'absolute',
		left: '0',
	},
	officer: {
		composes: '$bounce',
		animationDelay: '0.02s',
		position: 'absolute',
		right: '0',
	},
	granny: {
		composes: '$bounce',
		animationDelay: '0.2s',
		position: 'absolute',
		right: '10%',
	},
	bubble: {
		backgroundColor: light_blue,
		padding: '0.4em',
		zIndex: '1000',
		fontFamily: headingFontFamily,
		fontSize: '1.5em',
	},
	bubbleLeft: {
		composes: '$bubble',
		borderRadius: '20px 20px 0 20px',
		position: 'absolute',
		left: '20%',
	},
	bubbleRight: {
		composes: '$bubble',
		borderRadius: '20px 20px 20px 0',
		position: 'absolute',
		right: '20%',
	},
}

export default createUseStyles(styles)
