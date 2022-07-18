import { createUseStyles } from 'react-jss'
import { peeps_darkblue, black } from '../../config/colors'
import {
	headingFontFamily,
	standardFontFamily,
	weightSemiBold,
} from '../../config/jss-vars'

const styles = {
	container: {
		display: 'flex',
		position: 'absolute',
		top: '0px',
		marginLeft: '16em',
		fontFamily: standardFontFamily,
	},
	title: {
		color: peeps_darkblue,
		fontFamily: headingFontFamily,
		fontSize: '3em',
		margin: '0.3em 0em',
		width: '100%',
		textAlign: 'center',
	},
	passportPhoto: {
		width: '300px',
		height: '300px',
		backgroundPositionX: '45%',
		backgroundPositionY: '20%',
		backgroundSize: '600px',
		border: `1px solid ${black}`,
	},
	passportForm: {
		padding: '0 2em',
		width: '16em',
		'& div': {
			padding: '0 0 0.5em 0',
			display: 'flex',
			flexDirection: 'column',
			'& label': {
				fontSize: '0.8em',
				fontWeight: weightSemiBold,
			},
			'& input, select': {
				padding: '0.5em',
				backgroundColor: '#fffd',
				fontFamily: standardFontFamily,
			},
		},
	},
	text: {
		textAlign: 'center',
		fontWeight: weightSemiBold,
		textTransform: 'uppercase',
		fontSize: '1.2em',
	},
	mono: {
		fontFamily: 'mono',
	}
}

export default createUseStyles(styles)
