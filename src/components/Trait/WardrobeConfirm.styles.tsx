import { createUseStyles } from 'react-jss'
import { standardFontFamily } from '../../config/jss-vars'

const styles = {
	'@global': {
		'@keyframes openWardrobe': {
			from: {
				transform: 'translateX(-45%)',
			},
			to: {
				transform: 'translateX(0%)',
			},
		},
		'@keyframes closeWardrobe': {
			from: {
				transform: 'translateX(0%)',
			},
			to: {
				transform: 'translateX(-45%)',
			},
		},
	},
	openWardrobe: {
		animationName: 'openWardrobe',
		animationDuration: '0.5s',
		animationFillMode: 'forwards',
		animationTimingFunction: 'linear',
		animationIterationCount: '1',
	},
	closeWardrobe: {
		animationName: 'closeWardrobe',
		animationDuration: '0.5s',
		animationFillMode: 'forwards',
		animationTimingFunction: 'linear',
		animationIterationCount: '1',
	},
	container: {
		display: 'flex',
		position: 'relative',
	},
	wardrobeContainer: {
		width: '42em',
		position: 'absolute',
		zIndex: '-1000',
	},
	wardrobeContainerFront: {
		width: '42em',
		position: 'absolute',
		zIndex: '-500',
	},
	wardrobeDoor: {
		width: '42em',
		position: 'absolute',
		zIndex: '-750',
	},
	doorpanel: {
		width: '18em',
		zIndex: '2000',
		fontFamily: standardFontFamily,
		marginLeft: '2.5em',
		marginTop: '2em',
	},
	hangerContainer: {
		display: 'grid',
		padding: '0.5em',
		gridGap: '2em 0.5em',
		gridTemplateColumns: '48% 48%',
		height: '500px',
		overflow: 'scroll',
		width: '18em',
		marginLeft: '1em',
		marginTop: '2.7em',
		gridAutoRows: 'min-content',
	},
}

export default createUseStyles(styles)
