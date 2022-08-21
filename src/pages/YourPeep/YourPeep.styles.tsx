import { createUseStyles } from 'react-jss'
import {
	black,
	dark_grey,
	transparent_blue,
	light_blue,
	white,
	yellow,
	peepBlue,
} from '../../config/colors'
import { mint_page_bg } from '../../config/common-styles'
import { headingFontFamily, weightSemiBold } from '../../config/jss-vars'

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
	pageBg: mint_page_bg,
	page: {
		composes: '$pageBg',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100vw',
		fontSize: '0.8em',
	},
	title: {
		fontFamily: headingFontFamily,
		color: black,
		fontSize: '2.5em',
		borderRadius: '5em',
	},
	peepImage: {
		maxWidth: 'min(30vw, 400px)',
		border: `20px solid ${yellow}`,
		borderRadius: '10px',
		padding: '5px',
	},
	buttonGroup: {
		display: 'flex',
		marginTop: '1em',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: '0.8em',
	},
	enlarge: {
		fontSize: '1.5em',
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
		fontSize: '2em',
		margin: '0.5em',
		padding: '1em 2em',
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
		maxWidth: 'min(30vw, 400px)',
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
	text: {
		fontSize: '1.2rem',
		color: black,
		background: white,
		padding: '0.5rem 1rem',
		borderRadius: '5px',
	},
}

export default createUseStyles(styles)
