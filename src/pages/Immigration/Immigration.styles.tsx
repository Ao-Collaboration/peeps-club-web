import { createUseStyles } from 'react-jss'

const styles = {
	'@global': {
		'@keyframes passport': {
			from: {
				transform: 'translate(0%, 100%)'
			},
			to: {
				transform: 'translate(0%,  0%)'
			}
		},
	},
	page: {
		backgroundImage: 'url("assets/Immigration Gate.svg")',
		backgroundSize: 'cover',
		height: '100vh',
		width: '100vw',
		position: 'absolute',
		top: '0',
		zIndex: '-100',
		overflow: 'hidden'
	},
	passport: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100vh',
		transform: 'translate(0%, 100%)',
		'& img' :{
			width: '50vw'

		}
	},
	pullUpPassportAnimation: {
		animationName: 'passport',
		animationDuration: '1s',
		animationFillMode: 'forwards',
		animationTimingFunction: 'linear',
		animationIterationCount: '1'
	},
}

export default createUseStyles(styles)
