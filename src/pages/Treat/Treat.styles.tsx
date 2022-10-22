import { createUseStyles } from 'react-jss'
import { checklist, mint_title, spooky_page_bg } from '../../config/common-styles'

const styles = {
	page: spooky_page_bg,
	title: mint_title,
	text: {
		fontSize: '1.5rem',
	},
	list: checklist,
	buttonGroup: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
}

export default createUseStyles(styles)
