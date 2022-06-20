import { createUseStyles } from 'react-jss'
import { peeps_darkblue, white} from '../../config/colors'
import { weightSemiBold } from '../../config/jss-vars'

const styles = {
	container: {
		width: '250px',
		height: '400px',
		backgroundColor: '#ffdb13',
		marginTop:'10em',
		overflow: 'scroll',
		zIndex: '1000',
		border: `3px solid ${peeps_darkblue}`,
	},
	tabs: {
		width: '250px',
		padding: '0.5em',
		backgroundColor: peeps_darkblue,
		color: white,
		border: `3px solid ${peeps_darkblue}`,
		fontWeight: weightSemiBold,
		fontSize: '1.2em',
		position: 'fixed',
	},
	thumbnails: {
		display: 'grid',
		padding: '0.5em',
		paddingTop: '4em',
		gridGap: '0.5em',
		gridTemplateColumns: '48% 48%',
		'& div': {
			width: '100%',
			'& img': {
				width: '80%',
				margin: 'auto',
				display: 'block'
			},
			'& p': {
				textAlign: 'center',
				padding: '0.3em',
				margin: '0',
			}
		}
	},
	selected: {
		backgroundColor: white,
		borderRadius: '1em',
	}

}

export default createUseStyles(styles)
