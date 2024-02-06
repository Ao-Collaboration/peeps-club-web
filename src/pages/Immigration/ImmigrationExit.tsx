import FadeTo from '../../components/Scene/FadeTo'
import { black } from '../../config/colors'
import useStyles from './ImmigrationExit.styles'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { Trait } from '../../interface/metadata'
import doFetch from '../../utils/doFetch'
import { host } from '../../config/api'
import { WardrobeRoute } from '../routes'
import Button from '../../components/Button/Button'
import { removeLocationTraits } from '../../interface/selection'

function ImmigrationExit() {
	const classes = useStyles()
	const { metadata } = useContext(MetadataContext)
	const [peepImage, setPeepImage] = useState('')
	const navigate = useNavigate()

	if (!metadata) {
		return <></>
	}

	const getPeepImage = async () => {
		const requestMetadata: Trait[] = removeLocationTraits(metadata)
		const svg = await doFetch(
			`${host}/peep/`,
			'POST',
			{ attributes: requestMetadata },
			'image/svg+xml',
		)
		setPeepImage(URL.createObjectURL(svg))
	}

	const next = () => {
		navigate(WardrobeRoute.path)
	}

	useEffect(() => {
		getPeepImage()
	}, [])

	return (
		<>
			<FadeTo color={black} isFadeOut={false} isFading={true} />
			<div
				className={`${classes.bubble} ${classes.granny} ${classes.move}`}
				onAnimationEnd={next}
			>
				Let's get you out of those clothes!
			</div>
			<img
				src="assets/Granny Peep.svg"
				className={`${classes.granny} ${classes.move}`}
			/>
			{peepImage && (
				<img
					src={peepImage}
					className={`${classes.yourPeep} ${classes.move}`}
				/>
			)}
			<div onAnimationEnd={next}>
				<img
					src="assets/Airport Arrivals Background.svg"
					className={classes.back}
				/>
				<img
					src="assets/Airport Arrivals Foreground.svg"
					className={classes.front}
				/>
			</div>
			<div className={classes.skipButton}>
				<Button onClick={next} className="primary">
					Skip
				</Button>
			</div>
		</>
	)
}

export default ImmigrationExit
