import { createUseStyles } from 'react-jss'
import { white } from '../../config/colors'

const styles = {
	copyButton: {
		border: 0,
		backgroundColor: 'transparent',
		padding: '0.5rem 0.5rem',
		borderRadius: '1rem',
		'&:hover': {
			backgroundColor: 'lightgray',
		},
	},
	copyContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: white,
		borderRadius: '1rem',
		padding: '0.5rem 0.5rem',
	},
}

export default createUseStyles(styles)
