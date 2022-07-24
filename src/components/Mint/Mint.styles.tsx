import { createUseStyles } from 'react-jss'
import {
	black,
	dark_grey,
	peepBlue,
	transparent_blue,
	white,
} from '../../config/colors'
import { translucent_section } from '../../config/common-styles'
import { headingFontFamily } from '../../config/jss-vars'

const styles = {
	enlargedText: {
		fontFamily: headingFontFamily,
		color: black,
		margin: '0rem',
		fontSize: '2rem',
		textTransform: 'uppercase',
	},
	text: {
		fontSize: '1.5rem',
		margin: '0.5rem',
	},
	boldText: {
		composes: '$text',
		fontWeight: 'bold',
	},
	section: translucent_section,
	selectButton: {
		margin: '0.5rem',
		width: '4rem',
		height: '4rem',
		fontSize: '2rem',
		borderRadius: '50%',
		border: 'none',
		background: white,
		color: black,
		cursor: 'pointer',
	},
	selected: {
		background: peepBlue,
		color: white,
	},
	row: {
		display: 'flex',
		justifyContent: 'space-evenly',
	},
	buttonRow: {
		composes: '$row',
		padding: '2rem',
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
		border: 'none',
		cursor: 'pointer',
		'&:disabled': {
			backgroundColor: dark_grey,
			cursor: 'default',
		},
	},
	termsCheck: {
		margin: '0.5rem auto',
		fontSize: '1.2rem',
		textAlign: 'left',
		maxWidth: '20em',
		'& input': {
			margin: '10px',
			transform: 'scale(1.2)',
		},
	},
}

export default createUseStyles(styles)
