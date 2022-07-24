import { createUseStyles } from 'react-jss'
import { peepBlue, white } from '../../config/colors'
import { headingFontFamily } from '../../config/jss-vars'

const styles = {
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '0.5em',
		background: peepBlue,
		color: white,
	},
	title: {
		fontFamily: headingFontFamily,
		fontSize: '2rem',
	},
	link: {
		color: white,
		textDecoration: 'none',
		textTransform: 'uppercase',
		fontWeight: '900',
		fontSize: '1.5rem',
		padding: '1rem',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
}

export default createUseStyles(styles)
