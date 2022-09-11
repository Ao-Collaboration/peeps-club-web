import { createUseStyles } from 'react-jss'
import { peepBlue, white } from '../../config/colors'
import { mint_page_bg } from '../../config/common-styles'

const styles = {
	page: mint_page_bg,
	picture: {
		border: `1rem solid ${white}`,
		margin: '1rem auto',
		borderRadius: '0.5rem',
		width: '400px',
		backgroundColor: white,
		backgroundImage:
			'linear-gradient(45deg, #e7e7e7 25%, transparent 25%), linear-gradient(-45deg, #e7e7e7 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e7e7e7 75%), linear-gradient(-45deg, transparent 75%, #e7e7e7 75%)',
		backgroundSize: '20px 20px',
		backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
	},
	hidden: {
		display: 'none',
	},
	slider: {
		'-webkit-appearance': 'none',
		width: '100%',
		height: '10px',
		borderRadius: '5px',
		background: white,
		outline: 'none',
		maxWidth: '50em',
		'&::-webkit-slider-thumb': {
			'-webkit-appearance': 'none',
			appearance: 'none',
			width: '25px',
			height: '25px',
			borderRadius: '50%',
			background: peepBlue,
			cursor: 'pointer',
		},
		'&::-moz-range-thumb': {
			width: '25px',
			height: '25px',
			borderRadius: '50%',
			background: peepBlue,
			cursor: 'pointer',
		},
	},
	checkbox: {
		transform: 'scale(2)',
	},
	row: {
		display: 'flex',
	},
	column: {
		display: 'flex',
		width: '200px',
		flexDirection: 'column',
		padding: '1rem',
		textAlign: 'center',
		'& label': {
			padding: '1rem 0rem',
		},
	},
	buttonRow: {
		composes: '$row',
		'& button': {
			margin: '1rem',
		},
	},
}

export default createUseStyles(styles)
