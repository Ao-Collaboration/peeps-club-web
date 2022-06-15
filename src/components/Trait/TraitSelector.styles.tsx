import { createUseStyles } from 'react-jss'
import { white } from '../../config/colors'

const styles = {
	container: {
		height: '400px',
		backgroundColor: white,
		marginTop:'10em',
		overflow: 'scroll',
	},
}

export default createUseStyles(styles)
