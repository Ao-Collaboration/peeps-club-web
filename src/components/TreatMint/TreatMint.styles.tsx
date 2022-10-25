import { createUseStyles } from 'react-jss'
import { off_black, white } from '../../config/colors'

const styles = {
	arm: {
		height: '80vh',
		position: 'absolute',
		margin: 'auto',
		bottom: '70vh',
		transition: 'bottom 3s ease',
	},
	armDown: {
		bottom: '20vh',
	},
	candy: {
		position: 'absolute',
		margin: 'auto',
		height: '40vh',
		bottom: '5vh',
		transition: 'bottom 3s ease',
	},
	candyUp: {
		bottom: '55vh',
	},
	bag: {
		position: 'absolute',
		margin: 'auto',
		height: '80vh',
		bottom: 0,
	},
	top: {
		position: 'relative',
		zIndex: 1000,
	},
	text: {
		color: white,
		background: off_black,
		borderRadius: '1em',
		padding: '1em',
		textAlign: 'center',
	},
	treatBox: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: '1em',
		zIndex: 1000,
		position: 'absolute',
		bottom: 0,
	},
	treat: {
		width: 'max(10vw, 200px)',
		borderRadius: '1em',
	},
	flexEnd: {
		flexAlign: 'flex-end',
	},
}

export default createUseStyles(styles)
