import ConnectButton from '../Button/ConnectButton'
import useStyles from './Header.styles'

function Header() {
	const classes = useStyles()

	return (
		<div className={classes.header}>
			<span>OOO Marketplace</span>
			<ConnectButton />
		</div>
	)
}

export default Header
