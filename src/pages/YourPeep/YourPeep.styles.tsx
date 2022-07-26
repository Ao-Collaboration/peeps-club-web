import { createUseStyles } from 'react-jss'
import {
	black,
	dark_grey,
	peepBlue,
	transparent_blue,
	white,
	yellow,
} from '../../config/colors'
import { headingFontFamily } from '../../config/jss-vars'

const styles = {
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
		backgroundColor: peepBlue,
		padding: '1em',
		borderRadius: '50%',
		width: '1em',
		height: '1em',
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
}

export default createUseStyles(styles)
