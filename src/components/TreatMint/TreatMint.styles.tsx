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
		bottom: '10vh',
	},
}

export default createUseStyles(styles)
