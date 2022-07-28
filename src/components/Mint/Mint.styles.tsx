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
		fontSize: '1.2rem',
		margin: '0.5rem',
	},
	boldText: {
		composes: '$text',
		fontWeight: 'bold',
	},
	section: translucent_section,
	selectButton: {
		margin: '0.5rem',
		width: '3rem',
		height: '3rem',
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
		flexWrap: 'wrap',
		maxWidth: '100vw',
	},
	buttonRow: {
		composes: '$row',
		padding: '2rem',
	},
	button: {
		background: transparent_blue,
		fontFamily: headingFontFamily,
		color: white,
		fontSize: '1.8rem',
		margin: '0.5em',
		padding: '0.5rem 1.5rem',
		borderRadius: '2em',
		textTransform: 'uppercase',
		border: 'none',
		cursor: 'pointer',
		'&:disabled': {
			backgroundColor: dark_grey,
			cursor: 'default',
		},
	},
	checkBoxList: {
		padding: '1em',
	},
	termsCheck: {
		margin: '0 auto',
		fontSize: '1rem',
		textAlign: 'left',
		maxWidth: '20em',
		'& input': {
			margin: '10px',
			transform: 'scale(1.2)',
		},
	},
}

export default createUseStyles(styles)
