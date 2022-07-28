import FadeTo from '../../components/Scene/FadeTo'
import { black } from '../../config/colors'
import useStyles from './ImmigrationIntro.styles'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ImmigrationGateRoute } from '../routes'
import Button from '../../components/Button/Button'

function ImmigrationIntro() {
	const classes = useStyles()
	const [startZoom, setStartZoom] = useState(false)

	const navigate = useNavigate()

	const next = () => {
		navigate(ImmigrationGateRoute.path)
	}

	return (
		<>
			<FadeTo
				onAnimationEnd={() => {
					setStartZoom(true)
				}}
				color={black}
				isFadeOut={false}
				isFading={true}
			/>
			<div
				className={`${classes.gate} ${startZoom && classes.zoom}`}
				onAnimationEnd={next}
			>
				<img src="assets/Immigration Gate.svg" />
			</div>
			<div className={classes.skipButton}>
				<Button onClick={next} className="primary">
					Skip
				</Button>
			</div>
		</>
	)
}

export default ImmigrationIntro
