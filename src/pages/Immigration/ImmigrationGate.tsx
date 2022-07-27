import FadeTo from '../../components/Scene/FadeTo'
import { black } from '../../config/colors'
import useStyles from './ImmigrationGate.styles'
import { useNavigate } from 'react-router-dom'
import { ImmigrationRoute } from '../routes'
import Button from '../../components/Button/Button'
import { useEffect, useState } from 'react'

function ImmigrationGate() {
	const classes = useStyles()
	const [firstText, setFirstText] = useState('')
	const [secondText, setSecondText] = useState('')
	const navigate = useNavigate()
	const [firstLineDone, setFirstLineDone] = useState(false)

	const moveToPassport = () => {
		navigate(ImmigrationRoute.path)
	}

	const speech1 = 'Welcome to Peeps Club World!'
	const speech2 = 'Please have your passport ready for inspection.'

	useEffect(() => {
		updateFirstLine()
	}, [firstText])

	const updateFirstLine = async () => {
		if (firstText.length < speech1.length) {
			await new Promise(r => setTimeout(r, 50))
			const newText = firstText + speech1[firstText.length]
			setFirstText(newText)
		} else if (!firstLineDone) {
			setFirstLineDone(true)
			setSecondText(speech2[0])
		}
	}

	useEffect(() => {
		if (firstLineDone) {
			updateSecondLine()
		}
	}, [secondText])

	const updateSecondLine = async () => {
		if (secondText.length < speech2.length) {
			await new Promise(r => setTimeout(r, 50))
			const newText = secondText + speech2[secondText.length]
			setSecondText(newText)
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
						<h2>{firstText}</h2>
						<p>{secondText}</p>
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
				{secondText.length === speech2.length && (
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
