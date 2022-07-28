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
	background: {
		backgroundColor: dark_grey,
		backgroundSize: 'cover',
		position: 'absolute',
		top: 0,
		width: '100vw',
		height: '100vh',
		zIndex: -100,
		overflow: 'hidden',
	},
	page: {
		minHeight: '100vh',
		position: 'absolute',
		top: '0',
		paddingTop: '50px',
		boxSizing: 'border-box',
		width: '100vw',
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
	},
	passportSmall: {
		composes: '$passport',
		height: '80px',
		marginLeft: '150px',
	},
	passportContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
	passportContainerSmall: {
		composes: '$passportContainer',
		transform: 'scale(0.7)',
	},
	bottom: {
		width: 'auto',
		position: 'relative',
	},
	hands: {
		marginTop: '-3em',
		zIndex: '100',
		pointerEvents: 'none',
	},
	buttonGroup: {
		zIndex: '1000',
		display: 'flex',
		justifyContent: 'center',
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
		position: 'absolute',
		top: 0,
		width: '250px',
		zIndex: '1000',
	},
	traitsContainerSmall: {
		composes: '$traitsContainer',
		width: '150px',
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
