import { createUseStyles } from 'react-jss'
import { dark_grey } from '../../config/colors'

const styles = {
	'@global': {
		'@keyframes passport': {
			from: {
				transform: 'translate(0%, 150%)',
			},
			to: {
				transform: 'translate(0%,  0%)',
			},
		},
		'@keyframes flip': {
			from: {
				transform: 'rotateX(0deg)',
			},
			to: {
				transform: 'rotateX(180deg)',
			},
		},
		'@keyframes stamp': {
			'0%': {
				transform: 'translate(0%,  -200%)',
			},
			'50%': {
				transform: 'translate(0%,  0%)',
			},
			'100%': {
				transform: 'translate(0%,  0%)',
			},
		},
		'@keyframes stamp_arm': {
			'0%': {
				transform: 'translate(0%,  -200%)',
			},
			'50%': {
				transform: 'translate(0%,  0%)',
			},
			'55%': {
				transform: 'translate(0%,  0%)',
			},
			'100%': {
				transform: 'translate(0%,  -300%)',
			},
		},
		'@keyframes squash_traits': {
			'0%': {
				width: '250px',
			},
			'99%': {
				width: '0px',
			},
			'100%': {
				width: '0px',
				opacity: '0',
			},
		},
	},
	page: {
		backgroundColor: dark_grey,
		backgroundSize: 'cover',
		minHeight: '100vh',
		minWidth: '100vw',
		position: 'absolute',
		top: '0',
		zIndex: '-100',
	},
	pageLarge: {
		composes: '$page',
		height: '100vh',
		overflow: 'hidden',
	},
	passport: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100vh',
		transform: 'translate(0%, 150%)',
	},
	passportContainer: {
		display: 'flex',
		flexDirection: 'column',
		marginLeft: '-10em',
	},
	bottom: {
		width: 'auto',
		position: 'relative',
	},
	hands: {
		marginTop: '-3em',
		zIndex: '100',
	},
	buttonGroup: {
		position: 'absolute',
		bottom: '3em',
		left: '50%',
		width: '400px',
		zIndex: '1000',
	},
	pageToFlip: {
		position: 'absolute',
		zIndex: '100',
		transformStyle: 'preserve-3d',
		transformOrigin: 'bottom',
	},
	stamp: {
		zIndex: '500',
	},
	arm: {
		zIndex: '1000',
	},
	stampPosition: {
		position: 'absolute',
		width: '400px',
		display: 'block',
		marginLeft: '35%',
		top: '-20%',
		transform: 'translate(0%,  -200%)',
	},
	pullUpPassportAnimation: {
		animationName: 'passport',
		animationDuration: '1s',
		animationFillMode: 'forwards',
		animationTimingFunction: 'linear',
		animationIterationCount: '1',
	},
	flipAnimation: {
		animationName: 'flip',
		animationDuration: '0.6s',
		animationFillMode: 'forwards',
		animationTimingFunction: 'linear',
		onIterationCount: '1',
	},
	stampAnimation: {
		animationName: 'stamp',
		animationDuration: '3s',
		animationFillMode: 'forwards',
		animationTimingFunction: 'linear',
		onIterationCount: '1',
	},
	stampArmAnimation: {
		animationName: 'stamp_arm',
		animationDuration: '3s',
		animationFillMode: 'forwards',
		animationTimingFunction: 'linear',
		onIterationCount: '1',
	},
	traitsContainer: {
		width: '250px',
		zIndex: '1000',
	},
	squashTraitsAnimation: {
		animationName: 'squash_traits',
		animationDuration: '0.3s',
		animationFillMode: 'forwards',
		animationTimingFunction: 'linear',
		onIterationCount: '1',
	},
}

export default createUseStyles(styles)
