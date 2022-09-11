import { createUseStyles } from 'react-jss'
import { white } from '../../config/colors'
import { mint_page_bg, mint_title } from '../../config/common-styles'
import { weightSemiBold } from '../../config/jss-vars'

const styles = {
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
	peepSelect: {
		background: white,
		padding: '0 1rem 1rem 1rem',
		borderRadius: '10px',
		margin: '1rem',
		display: 'flex',
		flexDirection: 'column',
		'& button':{
			marginTop:'1rem',
		},
		'& button:first-of-type':{
			marginTop:'0',
		}
	},
	container: {
		display: 'flex',
	},
	image: {
		width: '200px',
		borderRadius: '10px',
		marginBottom: '1rem',
	},
	text: {
		textAlign: 'center',
		fontSize: '1.3rem',
		margin: '1rem',
		fontWeight: weightSemiBold,
	},
	title: mint_title,
}

export default createUseStyles(styles)
