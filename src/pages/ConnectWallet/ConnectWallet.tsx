import ConnectButton from '../../components/Button/ConnectButton'
import useStyles from './ConnectWallet.styles'

function ConnectWallet() {
	const classes = useStyles()
	return (
		<div className={classes.page}>
			<ConnectButton />
		</div>
	)
}

export default ConnectWallet
