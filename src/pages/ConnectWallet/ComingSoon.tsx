import useStyles from './ConnectWallet.styles'

function ComingSoon() {
	const classes = useStyles()

	return (
		<div className={classes.page}>
			<div className={classes.section}>
				<h2 className={classes.title}>Coming Soon</h2>
			</div>
		</div>
	)
}

export default ComingSoon
