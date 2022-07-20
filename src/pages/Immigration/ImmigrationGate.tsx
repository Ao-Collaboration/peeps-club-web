import FadeTo from '../../components/Scene/FadeTo'
import { black } from '../../config/colors'
import useStyles from './ImmigrationGate.styles'
import { useNavigate } from 'react-router-dom'
import { ImmigrationRoute } from '../routes'
import Button from '../../components/Button/Button'
import { useEffect, useState } from 'react'

function ImmigrationGate() {
	const classes = useStyles()
	const [currentText, setCurrentText] = useState('')
	const navigate = useNavigate()

	const moveToPassport = () => {
		navigate(ImmigrationRoute.path)
	}

	const speech =
		'Welcome to Peeps Club World! Please have your passport ready for inspection.'

	useEffect(() => {
		updateSpeechText()
	}, [currentText])

	const updateSpeechText = async () => {
		if (currentText.length < speech.length) {
			await new Promise(r => setTimeout(r, 100))
			const newText = currentText + speech[currentText.length]
			setCurrentText(newText)
		}
	}

	return (
		<div className={classes.page}>
			<FadeTo color={black} isFadeOut={false} isFading={true} />
			<div className={classes.gate}>
				<div className={classes.speech}>
					<h2>{currentText}</h2>
				</div>
				<img src="assets/Immigration Room.svg" />
				<img className={classes.officer} src="assets/Immigration Officer.svg" />
			</div>
			<img className={classes.topLayer} src="assets/Immigration Desks.svg" />
			{currentText.length === speech.length && (
				<div className={classes.buttonGroup}>
					<Button onClick={moveToPassport} className="primary">
						I'm ready
					</Button>
				</div>
			)}
		</div>
	)
}

export default ImmigrationGate
