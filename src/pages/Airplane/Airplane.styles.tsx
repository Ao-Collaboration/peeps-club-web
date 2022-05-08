import { createUseStyles } from 'react-jss'
import { teal } from '../../config/colors'

const styles = {
	'@global': {
		'@keyframes moveFirst': {
			'from': {
				'left': '40%'
			},
			'to': {
				'left': '-50%'
			}
		},
		'@keyframes move': {
			'from': {
				'left': '100%'
			},
			'to': {
				'left': '-50%'
			}
		},
		'@keyframes floating': {
			'from': {
				'transform': 'translate(0,  0px)'
			},
			'65%': {
				'transform': 'translate(0, 15px)'
			},
			'to': {
				'transform': 'translate(0, -0px)'
			}
		}
	},
	airplaneBackground: {
		backgroundColor: teal,
		height: '100vh',
		width: '100vw',
		position: 'absolute',
		top: '0',
		zIndex: '-100',
		overflow: 'hidden'
	},
	cloud: {
		'& svg': {
			width: '50vw'
		},
	},
	initialCloud: {
		position: 'absolute',
		top: '0%',
		left: '40%',
		animation: 'moveFirst 5s linear .2s',
		animationIterationCount: '1',
		animationFillMode: 'forwards'
	},
	firstCloud: {
		position: 'absolute',
		top: '-30%',
		left: '200%',
		animation: 'move 5s linear 5s infinite'
	},
	secondCloud: {
		position: 'absolute',
		top: '30%',
		left: '150%',
		animation: 'move 8s linear 0s infinite'
	},
	thirdCloud: {
		position: 'absolute',
		top: '10%',
		left: '170%',
		animation: 'move 11s linear 1s infinite'
	},
	fourthCloud: {
		position: 'absolute',
		top: '-40%',
		left: '210%',
		animation: 'move 6s linear 1s infinite'
	},
	airplane: {
		position: 'absolute',
		top: '-5vh',
		left: '0vw',
		animationName: 'floating',
		animationDuration: '3s',
		animationIterationCount: 'infinite',
		animationTimingFunction: 'ease-in-out',
		'& svg': {
			width: '60vw'
		},
	},
	land: {
		position: 'absolute',
		top: '20vh',
		right: '5vw',
		cursor: 'pointer',


		'&:hover div': {
			display: 'block'
		},
		'& div': {
			display: 'none',
			borderRadius: '0 0 2em 2em',
			backgroundColor: 'white',
			width: '80%',
			margin: 'auto',
			marginTop: '-8px',
			'& a': {
				display: 'block',
				float: 'none',
				color: 'black',
				padding: '12px 16px',
				textDecoration: 'none',
				textAlign: 'center',
				'&:last-of-type': {
					borderRadius: '0 0 2em 2em',
				},
				'&:hover': {
					backgroundColor: '#1ca9f3',
					color: 'white'
				}
			}
		},
	},

}

export default createUseStyles(styles)
