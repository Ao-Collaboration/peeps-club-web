import { createUseStyles } from 'react-jss'
import { light_blue } from '../../config/colors'
import { headingFontFamily } from '../../config/jss-vars'

const styles = {
	bubble: {
		backgroundColor: light_blue,
		padding: '0.4em',
		zIndex: '1000',
		fontFamily: headingFontFamily,
		fontSize: '1.5em',
	},
	bubbleLeft: {
		composes: '$bubble',
		borderRadius: '20px 20px 0 20px',
		position: 'absolute',
		left: '20%',
	},
	bubbleRight: {
		composes: '$bubble',
		borderRadius: '20px 20px 20px 0',
		position: 'absolute',
		right: '20%',
	},
	guestPeep: {
		maxWidth: 'min(30vw, 400px)',
	},
}

export default createUseStyles(styles)
