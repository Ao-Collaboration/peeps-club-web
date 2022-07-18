import { createUseStyles } from 'react-jss'
import { peeps_darkblue, white } from '../../config/colors'
import { headingFontFamily } from '../../config/jss-vars'

const styles = {
	layer: {
		backgroundSize: 'cover',
		height: '100vh',
		width: '100vw',
		position: 'absolute',
		top: '0',
		overflow: 'hidden',
	},
	page: {
		composes: '$layer',
		backgroundImage: 'url("assets/Room Base Asset.svg")',
		zIndex: '-2000',
		pointerEvents: 'none',
		backgroundPositionY: 'bottom',
	},
	midLayer: {
		composes: '$layer',
		backgroundImage: 'url("assets/Wardrobe Sliding Door Asset.svg")',
		zIndex: '-1000',
		pointerEvents: 'none',
	},
	topLayer: {
		composes: '$layer',
		zIndex: '1000',
		backgroundImage: 'url("assets/Room Front Asset.svg")',
		pointerEvents: 'none',
	},
	icon: {
		margin: '0.9em',
		padding: '0.1em',
		cursor: 'pointer',
		'&:hover': {
			transform: 'scale(1.2)',
		},
	},
	container: {
		margin: 'auto',
		marginTop: '1.5em',
		display: 'flex',
		justifyContent: 'center',
	},
	navpanel: {
		width: '4em',
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: white,
		borderRadius: '1em 0 0 1em',
		opacity: '0.8',
		marginLeft: '4.5em',
		height: 'fit-content',
	},
	title: {
		fontFamily: headingFontFamily,
		writingMode: 'sideways-lr',
		color: peeps_darkblue,
		fontSize: '2.5em',
		padding: '0.3em 0.1em',
		height: '260px',
	},
	mirrorPeep: {
		width: '308px',
		height: '550px',
		backgroundPositionX: '45%',
		backgroundPositionY: '100%',
		backgroundSize: '600px',
		marginLeft: '5em',
		marginTop: '2.6em',
	},
	mirror: {
		width: '22.5em',
		position: 'absolute',
		marginLeft: '-2.1em',
		marginTop: '-1.1em',
	},
	mirrorFront: {
		composes: '$mirror',
		zIndex: '1000',
	},
	mirrorRear: {
		composes: '$mirror',
		zIndex: '-1000',
	},
	backgroundToggle: {
		border: 'none',
		zIndex: 1000,
		position: 'relative',
		color: white,
		backgroundColor: peeps_darkblue,
		width: '2em',
		height: '2em',
		padding: '0.5em',
		borderRadius: '50%',
		top: '0.5em',
		left: '0.5em',
		cursor: 'pointer',
		'&:hover': {
			transform: 'scale(1.05)',
		},
	},
}

export default createUseStyles(styles)
