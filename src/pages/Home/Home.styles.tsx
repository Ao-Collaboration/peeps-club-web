import { createUseStyles } from 'react-jss'
import { black, translucent_white } from '../../config/colors'
import { headingFontFamily } from '../../config/jss-vars'

const styles = {
	page: {
		backgroundImage: 'url("assets/mint_bg.png")',
		backgroundSize: 'cover',
		height: '100vh',
		width: '100vw',
		position: 'absolute',
		top: '0',
		zIndex: '-100',
		overflow: 'hidden',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontFamily: headingFontFamily,
		color: black,
		background: translucent_white,
		fontSize: '2.5rem',
		padding: '1rem 2.5rem',
		borderRadius: '5rem',
	},
	text: {
		fontSize: '1.5rem',
	},
	list: {
		composes: '$text',
		listStyle: 'none',
		textAlign: 'right',
		'& li:not(:last-child):after ': {
			content: '"✓"',
		},
	},
	buttonGroup: {
		display: 'flex',
	},
}

export default createUseStyles(styles)
