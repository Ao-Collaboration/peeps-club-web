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
			await new Promise(r => setTimeout(r, 50))
			const newText = currentText + speech[currentText.length]
			setCurrentText(newText)
		}
	}

	return (
		<>
			<FadeTo color={black} isFadeOut={false} isFading={true} />
			<div
				className={classes.page}
				aria-description="You approach the immigration officer"
			>
				<div className={classes.gate}>
					<div className={classes.speech}>
						<h2>{currentText}</h2>
					</div>
					<img aria-hidden src="assets/Immigration Room.svg" />
					<img
						aria-hidden
						className={classes.officer}
						src="assets/Immigration Officer.svg"
					/>
				</div>
				<img
					aria-hidden
					className={classes.topLayer}
					src="assets/Immigration Desks.svg"
				/>
				{currentText.length === speech.length && (
					<div className={classes.buttonGroup}>
						<Button onClick={moveToPassport} className="primary">
							I'm ready
						</Button>
					</div>
				)}
			</div>
		</>
	)
}

export default ImmigrationGate
