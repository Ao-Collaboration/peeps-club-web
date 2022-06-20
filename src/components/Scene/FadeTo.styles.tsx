import { createUseStyles } from 'react-jss'

interface Props {
	backgroundColor: string
}

const styles = {
	'@global': {
		'@keyframes fadeOut': {
			'from': {
				opacity: '0%'
			},
			'to': {
				opacity: '100%'
			}
		},
		'@keyframes fadeIn': {
			'from': {
				opacity: '100%'
			},
			'to': {
				opacity: '0%'
			}
		}
	},
	fadeTo: {
		opacity: '0%',
		width: '100vw',
		height: '100vh',
		position: 'absolute',
		top: '0',
		left: '0',
		pointerEvents: 'none',
		backgroundColor: (props: Props) => props.backgroundColor
	},
	fadeOutAnimation: {
		opacity: '0%',
		animationName: 'fadeOut',
		animationDuration: '2s',
		animationFillMode: 'forwards',
		animationTimingFunction: 'linear',
	},
	fadeInAnimation: {
		opacity: '100%',
		animationName: 'fadeIn',
		animationDuration: '2s',
		animationFillMode: 'forwards',
		animationTimingFunction: 'linear',
	}
}

export default createUseStyles(styles)
