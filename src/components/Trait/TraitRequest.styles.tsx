import { createUseStyles } from 'react-jss'
import { white } from '../../config/colors'

const styles = {
	page: {
		width: '100vw',
		height: '100vh',
		position: 'absolute',
		zIndex: '100000',
		top: '0',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		maxWidth: '30em',
		padding: '1.5em',
		backgroundColor: white,
		textAlign: 'center',
		boxShadow: '0px 0px 5px 5px #00000055',
		'& blockquote': {
			border: '2px black dashed',
			padding: '1em',
		},
		'& ol': {
			textAlign: 'left',
			padding: '2em',
		},
	},
}

export default createUseStyles(styles)
