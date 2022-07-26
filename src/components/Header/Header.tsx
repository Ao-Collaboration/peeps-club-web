import { Link } from 'react-router-dom'
import { HomeRoute } from '../../pages/routes'
import DiscordLogo from '../Logo/DiscordLogo'
import EtherscanLogo from '../Logo/EtherscanLogo'
import OpenseaLogo from '../Logo/OpenseaLogo'
import TwitterLogo from '../Logo/TwitterLogo'
import useStyles from './Header.styles'

function Header() {
	const classes = useStyles()

	return (
		<div aria-hidden className={classes.header}>
			<Link to={HomeRoute.path} className={classes.title}>
				<span>Peeps Club</span>
			</Link>
			<nav>
				<a href="https://twitter.com/Peeps_Club" className={classes.link}>
					<TwitterLogo className="small" />
				</a>
				<a href="https://discord.gg/peepsclub" className={classes.link}>
					<DiscordLogo className="small" />
				</a>
				<a href="#" className={classes.link}>
					<EtherscanLogo className="small" />
				</a>
				<a href="#" className={classes.link}>
					<OpenseaLogo className="small" />
				</a>
			</nav>
		</div>
	)
}

export default Header
