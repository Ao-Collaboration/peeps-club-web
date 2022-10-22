import { createUseStyles } from 'react-jss'
import { black } from '../../config/colors'
import {
	checklist,
	mint_page_bg,
	spooky_page_bg,
	translucent_section,
} from '../../config/common-styles'
import { headingFontFamily } from '../../config/jss-vars'

const styles = {
	page: mint_page_bg,
	pageSpooky: spooky_page_bg,
	title: {
		fontFamily: headingFontFamily,
		color: black,
		fontSize: '2.5rem',
		margin: '0.2rem',
		padding: '0rem 2.5rem',
		borderRadius: '5rem',
	},
	text: {
		fontSize: '1.5rem',
		padding: '1em',
	},
	list: checklist,
	section: translucent_section,
	buttonGroup: {
		display: 'flex',
	},
}

export default createUseStyles(styles)
