import useStyles from './Header.styles'

function Header() {
	const classes = useStyles()

	return (
		<div aria-hidden className={classes.header}>
			<span className={classes.title}>Peeps Club</span>
			<nav>
				<a href="#" className={classes.link}>
					Passport
				</a>
				<a href="#" className={classes.link}>
					Peep
				</a>
				<a href="#" className={classes.link}>
					Academy
				</a>
				<a href="#" className={classes.link}>
					Coming Soon
				</a>
			</nav>
		</div>
	)
}

export default Header
