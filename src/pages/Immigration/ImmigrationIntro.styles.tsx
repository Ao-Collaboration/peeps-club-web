import { createUseStyles } from 'react-jss'

const styles = {
	'@global': {
		'@keyframes zoom': {
			'0%': {
				transform: 'scale(1) translateY(0)',
			},
			'10%': {
				transform: 'scale(1.05) translateY(1%)',
			},
			'20%': {
				transform: 'scale(1.1) translateY(0)',
			},
			'30%': {
				transform: 'scale(1.15) translateY(1%)',
			},
			'40%': {
				transform: 'scale(1.2) translateY(0)',
			},
			'50%': {
				transform: 'scale(1.25) translateY(1%)',
			},
			'60%': {
				transform: 'scale(1.3) translateY(0)',
			},
			'70%': {
				transform: 'scale(1.35) translateY(1%)',
			},
			'80%': {
				transform: 'scale(1.4) translateY(0)',
			},
			'90%': {
				transform: 'scale(1.45) translateY(1%)',
			},
			'100%': {
				transform: 'scale(1.5) translateY(0)',
			},
		},
		'@keyframes bounce': {
			from: {
				transform: '',
			},
			to: {
				transform: 'transalte(1%)',
			},
		},
	},
	gate: {
		position: 'absolute',
		top: '0',
		zIndex: '-100',
		overflow: 'hidden',
		'& img': {
			minHeight: '100%',
			width: '100%',
		},
	},
	zoom: {
		animationName: 'zoom',
		animationDuration: '3s',
		animationFillMode: 'forwards',
		animationTimingFunction: 'linear',
		onIterationCount: '1',
	},
	skipButton: {
		position: 'absolute',
		bottom: '1em',
		right: '1em',
		zIndex: '1000',
	},
}

export default createUseStyles(styles)
