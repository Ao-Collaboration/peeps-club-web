import { createUseStyles } from 'react-jss'
import { black, peepBlue, white } from '../../config/colors'

const styles = {
	selectButton: {
		margin: '0.5rem',
		width: '4rem',
		height: '4rem',
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
}

export default createUseStyles(styles)
