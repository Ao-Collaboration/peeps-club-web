import DiscordLogo from '../../components/Logo/DiscordLogo'
import TwitterLogo from '../../components/Logo/TwitterLogo'
import useStyles from './AnotherDevice.styles'

const AnotherDevice = () => {
	const classes = useStyles()
	return (
		<div className={classes.page}>
			<p className={classes.title}>
				For the best experience curating your peep, please use a device with a
				large landscape screen.
			</p>
			<span className={classes.text}>Come join us on...</span>
			<div className={classes.buttonGroup}>
				<a
					href="https://discord.gg/peepsclub"
					target="_blank"
					className={classes.link}
				>
					<DiscordLogo className="default" />
				</a>
				<a
					href="https://twitter.com/Peeps_Club"
					target="_blank"
					className={classes.link}
				>
					<TwitterLogo className="default" />
				</a>
			</div>
		</div>
	)
}

export default AnotherDevice
