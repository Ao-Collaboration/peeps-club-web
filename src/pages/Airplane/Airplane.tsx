import useStyles from './Airplane.styles'
import SVG from 'react-inlinesvg'
import { useContext, useState } from 'react'
import FadeTo from '../../components/Scene/FadeTo'
import { black } from '../../config/colors'
import { useNavigate } from 'react-router-dom'
import { landingLocations } from '../../config/traits'
import { MetadataContext } from '../../context/Metadata/MetadataContext'

const Airplane = () => {
	const classes = useStyles()
	const [isLanding, setIsLanding] = useState(false)
	const [isFading, setisFading] = useState(false)
	const {setMetadata}= useContext(MetadataContext)
	const navigate = useNavigate()


	if (!setMetadata) {
		return <></>
	}

	const startLanding = (district : string) => {
		setMetadata({district: district})
		setIsLanding(true)
	}

	const startFade = async () => {
		setisFading(true)
	}

	const isDone = () => {
		navigate('/immigration')
	}

	return (
		<>
			<FadeTo color={black} isFading={isFading} onAnimationEnd={isDone} />
			<div className={classes.airplaneBackground}>
				<div className={`${classes.cloud} ${classes.initialCloud}`}>
					<SVG src={'/assets/Cloud 1 Asset.svg'} />
				</div>
				<div className={`${classes.cloud} ${classes.firstCloud}`}>
					<SVG src={'/assets/Cloud 1 Asset.svg'} />
				</div>
				<div className={`${classes.cloud} ${classes.secondCloud}`}>
					<SVG src={'/assets/Cloud 2 Asset.svg'} />
				</div>
				<div className={`${classes.cloud} ${classes.thirdCloud}`}>
					<SVG src={'/assets/Cloud 3 Asset.svg'} />
				</div>
				<div className={`${classes.cloud} ${classes.fourthCloud}`}>
					<SVG src={'/assets/Cloud 4 Asset.svg'} />
				</div>
				<div className={`${classes.airplane} ${isLanding ? classes.landAnimation : classes.floatAnimation}`} onAnimationEnd={startFade}>
					<SVG src={'/assets/Plane Asset.svg'} />
				</div>
				<div aria-label='Land the Plane' className={`${classes.land} ${isLanding ? classes.pullAwayAnimation : ''}`}>
					<SVG src={'/assets/Cloud Button Asset.svg'} />
					<div className={classes.landingLinks}>
						{
							landingLocations.map((option, index) => (
								<a href="#" aria-label={option.location} key={index} onClick={() => {startLanding(option.district)}}>{option.location}</a>
							))
						}
					</div>
				</div>
				<div className={`${classes.cloud} ${classes.initialCloud}`}>
					<SVG src={'/assets/Cloud 1 Asset.svg'} />
				</div>
			</div>
		</>
	)
}

export default Airplane
