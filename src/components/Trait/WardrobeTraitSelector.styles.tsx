import { createUseStyles } from 'react-jss'
import { black, peepBlue, white } from '../../config/colors'
import { standardFontFamily } from '../../config/jss-vars'

const styles = {
	'@global': {
		'@keyframes fadeInHangars': {
			'0%': {
				opacity: '0',
			},
			'50%': {
				opacity: '0',
			},
			'100%': {
				opacity: '1',
			},
		},
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
		'@keyframes bounce': {
			'0%': {
				transform: 'translateY(0)',
			},
			'50%': {
				transform: 'translateY(-10px)',
			},
			'100%': {
				transform: 'translateY(0)',
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
	fadeInHangars: {
		animationName: 'fadeInHangars',
		animationDuration: '1s',
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
	category: {
		fontSize: '2em',
		padding: '0.2em',
		textAlign: 'right',
		cursor: 'pointer',
	},
	selected: {
		outline: `2px solid ${peepBlue}`,
	},
	underlined: {
		textDecoration: 'underline',
	},
	hangerContainer: {
		display: 'grid',
		padding: '0.5em',
		gridGap: '0.5em',
		gridTemplateColumns: '48% 48%',
		height: '500px',
		overflow: 'scroll',
		width: '18em',
		marginLeft: '1em',
		marginTop: '2.7em',
		gridAutoRows: 'min-content',
	},
	hangerImage: {
		width: '80%',
	},
	hanger: {
		opacity: '0',
		position: 'relative',
		maxHeight: '150px',
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'center',
	},
	hangerText: {
		position: 'absolute',
		display: 'flex',
		width: '80%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
	},
	moreTraitsArrow: {
		position: 'absolute',
		bottom: '1.5em',
		right: '-1em',
		color: black,
		animationName: 'bounce',
		animationDuration: '0.5s',
		animationFillMode: 'both',
		animationTimingFunction: 'linear',
		animationIterationCount: 'infinite',
	},
}

export default createUseStyles(styles)