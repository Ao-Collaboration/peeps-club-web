import { createUseStyles } from 'react-jss'
import { off_white } from '../../config/colors'

const styles = {
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '0.5em',
		background: off_white,
	},
}

export default createUseStyles(styles)
