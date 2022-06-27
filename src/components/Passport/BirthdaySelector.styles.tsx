import { createUseStyles } from 'react-jss'

const styles = {
	flexOverride: {
		display: 'flex !important',
		flexDirection: 'row !important',
		'& select': {
			marginRight: '1em !important',
		},
	},
}

export default createUseStyles(styles)
