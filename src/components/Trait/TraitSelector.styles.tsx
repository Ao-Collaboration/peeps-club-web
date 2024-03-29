import { createUseStyles } from 'react-jss'
import { black, peeps_darkblue, white } from '../../config/colors'
import { weightSemiBold } from '../../config/jss-vars'

const styles = {
	container: {
		width: '100%',
		backgroundColor: '#ffdb13',
		zIndex: '1000',
		border: `3px solid ${peeps_darkblue}`,
		marginTop: '60px',
		boxSizing: 'border-box',
		maxHeight: 'calc(100vh - 61px)',
		overflowY: 'hidden',
		display: 'flex',
		flexDirection: 'column',
	},
	tabs: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '100%',
		backgroundColor: peeps_darkblue,
		color: white,
		fontWeight: weightSemiBold,
		fontSize: '1.2em',
		textAlign: 'center',
		'& button': {
			display: 'table-cell',
			verticalAlign: 'middle',
			width: '2em',
			height: '2em',
			fontSize: '1.1em',
			backgroundColor: white,
			color: black,
			border: 'none',
			borderRadius: '10px',
			cursor: 'pointer',
		},
	},
	thumbnails: {
		display: 'grid',
		padding: '0.5em',
		gridGap: '0.5em',
		gridTemplateColumns: '1fr 1fr',
		height: '100%',
		overflowY: 'scroll',
		'& div': {
			width: '100%',
			'& input': {
				maxWidth: '80%',
				margin: 'auto',
				display: 'block',
			},
			'& p': {
				textAlign: 'center',
				padding: '0.3em',
				margin: '0',
			},
		},
	},
	thumbnailsSmall: {
		composes: '$thumbnails',
		gridTemplateColumns: '1fr',
	},
	selected: {
		backgroundColor: white,
		borderRadius: '1em',
	},
	icon: {
		width: '90px',
		height: '90px',
		display: 'flex',
		'& input':{
			maxWidth: '100%',
			maxHeight: '100%',
		}
	},
}

export default createUseStyles(styles)
