import FadeTo from '../../components/Scene/FadeTo'
import { black } from '../../config/colors'
import useStyles from './ImmigrationIntro.styles'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ImmigrationGateRoute } from '../routes'

function ImmigrationIntro() {
	const classes = useStyles()
	const [startZoom, setStartZoom] = useState(false)

	const navigate = useNavigate()

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
				onAnimationEnd={() => {
					navigate(ImmigrationGateRoute.path)
				}}
			>
				<img src="assets/Immigration Gate.svg" />
			</div>
		</>
	)
}

export default ImmigrationIntro
