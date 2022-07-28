import Button from '../Button/Button'
import useStyles from './TraitRequest.styles'

interface Props {
	onClose: () => void
}

const TraitRequest: React.FC<Props> = ({ onClose }) => {
	const classes = useStyles()

	return (
		<div className={classes.page}>
			<div className={classes.container}>
				<h1>Need more options?</h1>

				<p>Please help us represent you better by requesting a new trait!</p>
				<ol>
					<li>
						Join our{' '}
						<a href="http://discord.gg/peepsclub" target={'_blank'}>
							Discord Server!
						</a>
					</li>
					<li>
						Go find the <strong>🤩-traits-requests</strong> channel
					</li>
					<li>
						Submit a new trait <br />
						(bonus points for including a reference image)
					</li>
				</ol>
				<blockquote>
					<strong>IMPORTANT:</strong> Don't let this stop you making your Peep
					today! As more traits are added you will have the opportunity to
					update your Peep later.
				</blockquote>

				<br />
				<Button onClick={onClose} className="primary">
					Back
				</Button>
			</div>
		</div>
	)
}

export default TraitRequest
