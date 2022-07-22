import { createUseStyles } from 'react-jss'
import { checklist, mint_page_bg, mint_title } from '../../config/common-styles'

const styles = {
	page: mint_page_bg,
	title: mint_title,
	text: {
		fontSize: '1.5rem',
	},
	list: checklist,
	buttonGroup: {
		display: 'flex',
	},
}

export default createUseStyles(styles)
