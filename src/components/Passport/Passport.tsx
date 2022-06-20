import { Metadata } from '../../interface/metadata'
import useStyles from './Passport.styles'

interface Props {
	metadata: Metadata,
}

const Passport: React.FC<Props> = ({ metadata }) => {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<div>
				<p className={classes.text}>Passport</p>
				<div className={classes.passportPhoto}></div>
			</div>
			<div className={classes.passportForm}>
				<h2 className={classes.title}>Peeps Club</h2>
				<div>
					<label>Name</label>
					<input type='text' />
				</div>
				<div>
					<label>District</label>
					<select>
						<option>Mountains</option>
						<option>Beach</option>
						<option>Forest</option>
					</select>
				</div>
				<div>
					<label>Pronouns</label>
					<select>
						<option>They/Them</option>
						<option>She/Her</option>
						<option>He/Him</option>
						<option>Ask me</option>
					</select>
				</div>
				<div>
					<label>Birthday</label>
					<input type='date' />
				</div>
				<p>{'P<PC#####<####<######'}</p>
			</div>
		</div>
	)
}

export default Passport
