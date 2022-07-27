import { createUseStyles } from 'react-jss'
import { translucent_white, transparent_blue } from '../../config/colors'
import { mint_page_bg } from '../../config/common-styles'
import { headingFontFamily } from '../../config/jss-vars'

const styles = {
	page: mint_page_bg,
	title: {
		maxWidth: '20em',
		background: translucent_white,
		padding: '1em',
		borderRadius: '1em',
	},
	text: {
		fontFamily: headingFontFamily,
		fontSize: '1.5rem',
	},
	buttonGroup: {
		display: 'flex',
	},
	link: {
		backgroundColor: transparent_blue,
		padding: '1em',
		borderRadius: '50%',
		width: '3em',
		height: '3em',
		margin: '0.5em',
	},
}

export default createUseStyles(styles)
