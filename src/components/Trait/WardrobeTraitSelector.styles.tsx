import { createUseStyles } from 'react-jss'
import {
	black,
	peepBlue,
	peeps_darkblue,
	red,
	white,
} from '../../config/colors'
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
		fontSize: '1.8em',
		padding: '0.2em',
		textAlign: 'right',
		cursor: 'pointer',
		background: 'none',
		border: 'none',
		display: 'block',
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
		gridGap: '2em 0.5em',
		gridTemplateColumns: '48% 48%',
		height: '500px',
		overflow: 'scroll',
		width: '18em',
		marginLeft: '1em',
		marginTop: '2.7em',
		gridAutoRows: 'min-content',
		msOverflowStyle: 'none',
		scrollbarWidth: 'none',
		'&::-webkit-scrollbar': {
			display: 'none',
		},
	},
	hangerImage: {
		width: '80%',
	},
	shoppingImage: {
		width: '80%',
		cursor: 'pointer',
		'&:hover': {
			transform: 'scale(1.05)',
		},
	},
	hanger: {
		opacity: '0',
		position: 'relative',
		maxHeight: '180px',
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'center',
		paddingTop: '1em',
	},
	icon: {
		width: '70px',
		height: '70px',
		backgroundSize: 'contain',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
	},
	hangerTextBase: {
		background: 'none',
		border: 'none',
		position: 'absolute',
		display: 'flex',
		width: '80%',
		height: '100%',
		alignItems: 'center',
		textAlign: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
		'& p': {
			margin: '0em',
			fontSize: '0.8em',
			padding: '0.5em 1em',
		},
	},
	hangerText: {
		composes: '$hangerTextBase',
	},
	requestText: {
		composes: '$hangerTextBase',
		'& p': {
			padding: '1em',
		},
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
	exclusion: {
		'& svg': {
			color: peeps_darkblue,
		},
		'&:hover div': {
			display: 'block',
			textAlign: 'center',
		},
	},
	exclusiveItem: {
		composes: '$exclusion',
		'& svg': {
			color: red,
		},
	},
	popup: {
		display: 'none',
		position: 'absolute',
		backgroundColor: white,
		border: `1px ${peeps_darkblue} solid`,
		borderRadius: '6px',
		width: '8em',
		fontSize: '0.8em',
		padding: '0.3em',
		marginLeft: '-3.5em',
		bottom: '0',
	},
	exclusionTips: {
		position: 'absolute',
		bottom: '2em',
		width: '18em',
		color: peeps_darkblue,
	},
	disabled: {
		filter: 'brightness(0.7)',
		zIndex: '-100',
	},
	exclusive: {
		filter: 'sepia(1) saturate(6)',
		zIndex: '-100',
	},
}

export default createUseStyles(styles)
