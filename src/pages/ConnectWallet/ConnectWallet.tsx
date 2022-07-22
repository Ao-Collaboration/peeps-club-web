import ConnectButton from '../../components/Button/ConnectButton'
import useStyles from './ConnectWallet.styles'

function ConnectWallet() {
	const classes = useStyles()

	return (
		<div className={classes.page}>
			<div className={classes.section}>
				<h2 className={classes.title}>PEEPS AIRLINE</h2>
				<ul className={classes.list}>
					<li>Oven switched Off</li>
					<li>Keys</li>
					<li>Luggage</li>
					<li>Ticket</li>
					<li>
						<strong>WHERE'S MY WALLET...?</strong>
					</li>
				</ul>
			</div>
			<div className={classes.buttonGroup}>
				<ConnectButton />
			</div>
			<p>
				Not sure about what a wallet is or how to connect? Find out more here
			</p>
		</div>
	)
}

export default ConnectWallet
