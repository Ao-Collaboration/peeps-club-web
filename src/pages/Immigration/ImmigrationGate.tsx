import FadeTo from '../../components/Scene/FadeTo'
import { black } from '../../config/colors'
import useStyles from './ImmigrationGate.styles'
import { useNavigate } from 'react-router-dom'
import { ImmigrationRoute } from '../routes'
import Button from '../../components/Button/Button'

function ImmigrationGate() {
	const classes = useStyles()

	const navigate = useNavigate()

	const moveToPassport = () => {
		navigate(ImmigrationRoute.path)
	}

	return (
		<div className={classes.page}>
			<FadeTo color={black} isFadeOut={false} isFading={true} />
			<div className={classes.gate}>
				<div className={classes.speech}>
					<h2>Welcome to Peeps Club World!</h2>
					<p>Please check your passport and have it ready for inspection.</p>
				</div>
				<img src="assets/Immigration Room.svg" />
				<img className={classes.officer} src="assets/Immigration Officer.svg" />
			</div>
			<img className={classes.topLayer} src="assets/Immigration Desks.svg" />
			<div className={classes.buttonGroup}>
				<Button onClick={moveToPassport} className="primary">
					I have my Passport
				</Button>
			</div>
		</div>
	)
}

export default ImmigrationGate
