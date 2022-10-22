import { createUseStyles } from 'react-jss'

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
}

export default createUseStyles(styles)
