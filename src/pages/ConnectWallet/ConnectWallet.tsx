import { Link, useLocation } from 'react-router-dom'
import Button from '../../components/Button/Button'
import ConnectButton from '../../components/Button/ConnectButton'
import { TreatRoute } from '../routes'
import useStyles from './ConnectWallet.styles'

function ConnectWallet() {
	const classes = useStyles()

	const location = useLocation()

	if (location.pathname.includes('treat')) {
		return (
			<div className={classes.pageSpooky}>
				<ConnectButton className='primary' />
			</div>
		)
	}

	return (
		<div className={classes.page}>
			<div className={classes.section}>
				<h2 className={classes.title}>PEEPS AIRLINE</h2>
				<ul className={classes.list}>
					<li>
						<s>Oven switched Off</s>
					</li>
					<li>
						<s>Keys</s>
					</li>
					<li>
						<s>Luggage</s>
					</li>
					<li>
						<s>Ticket</s>
					</li>
					<li>
						<strong>WHERE'S MY WALLET...?</strong>
					</li>
				</ul>
			</div>
			<div className={classes.buttonGroup}>
				<ConnectButton />
			</div>
			<p className={classes.text}>
				Not sure about what a wallet is or how to connect? Find out more{' '}
				<a href="https://peeps.club/faqs" target={'_blank'}>
					here
				</a>
			</p>
			<div className={classes.buttonGroup}>
				<Link to={TreatRoute.path} className={classes.title}>
					<Button onClick={() => {return true}} className='primary'>Or Click Here for something Spoooooky</Button>
				</Link>
			</div>
		</div>
	)
}

export default ConnectWallet
