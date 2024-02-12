import useStyles from './Airplane.styles'
import SVG from 'react-inlinesvg'
import { useContext, useEffect, useState } from 'react'
import FadeTo from '../../components/Scene/FadeTo'
import { black } from '../../config/colors'
import { useNavigate } from 'react-router-dom'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { ImmigrationGateRoute } from '../routes'
import Button from '../../components/Button/Button'
import AnotherDevice from '../AnotherDevice/AnotherDevice'
import { isPortrait } from '../../utils/mediaQuery'
import { Trait } from '../../interface/metadata'

const Airplane = () => {
	const classes = useStyles()
	const [isLanding, setIsLanding] = useState(false)
	const [isFading, setisFading] = useState(false)
	const [showList, setShowList] = useState(false)
	const [availableDistricts, setAvailableDistricts] = useState<Trait[]>()
	const { metadata, setMetadata, availableTraits } = useContext(MetadataContext)
	const navigate = useNavigate()

	if (!metadata || !setMetadata || !availableTraits) {
		return <></>
	}

	if (isPortrait()) {
		// Portrait
		return <AnotherDevice />
	}

	const getAvailableDistricts = async () => {
		const districts = availableTraits.filter(t =>
			t.categories?.includes('District'),
		)
		setAvailableDistricts(districts)
	}

	useEffect(() => {
		getAvailableDistricts()
	}, [])

	const startLanding = (districtName: string) => {
		const updatedMetadata = metadata.filter(t => {
			return !t.categories?.includes('District')
		})
		const district = availableDistricts?.find(t => t.name === districtName)
		if (district) {
			updatedMetadata.push(district)
			setMetadata(updatedMetadata)
			setIsLanding(true)
		}
	}

	const startFade = async () => {
		setisFading(true)
	}

	const isDone = () => {
		// FIXME PC-151 navigate(ImmigrationIntroRoute.path)
		navigate(ImmigrationGateRoute.path)
	}

	return (
		<>
			<FadeTo color={black} isFading={isFading} onAnimationEnd={isDone} />
			<div
				className={classes.airplaneBackground}
				aria-description="A plane flies through the sky.."
			>
				<div aria-hidden className={`${classes.cloud} ${classes.initialCloud}`}>
					<SVG src={'/assets/Cloud 1 Asset.svg'} />
				</div>
				<div aria-hidden className={`${classes.cloud} ${classes.firstCloud}`}>
					<SVG src={'/assets/Cloud 1 Asset.svg'} />
				</div>
				<div aria-hidden className={`${classes.cloud} ${classes.secondCloud}`}>
					<SVG src={'/assets/Cloud 2 Asset.svg'} />
				</div>
				<div aria-hidden className={`${classes.cloud} ${classes.thirdCloud}`}>
					<SVG src={'/assets/Cloud 3 Asset.svg'} />
				</div>
				<div aria-hidden className={`${classes.cloud} ${classes.fourthCloud}`}>
					<SVG src={'/assets/Cloud 4 Asset.svg'} />
				</div>
				<div
					aria-hidden
					className={`${classes.airplane} ${
						isLanding ? classes.landAnimation : classes.floatAnimation
					}`}
					onAnimationEnd={startFade}
				>
					<SVG src={'/assets/Plane Asset.svg'} />
				</div>
				<div
					className={`${classes.land} ${
						isLanding ? classes.pullAwayAnimation : ''
					}`}
				>
					<input
						type="image"
						aria-haspopup="true"
						aria-expanded={showList}
						src={'/assets/Cloud Button Asset.svg'}
						alt="ready to land"
						onClick={() => {
							setShowList(!showList)
						}}
					/>
					{showList && (
						<div className={classes.landingLinks}>
							{availableDistricts &&
								availableDistricts.map(option => (
									<a
										tabIndex={0}
										aria-label={option.name}
										key={option.name}
										onClick={() => {
											startLanding(option.name)
											return false
										}}
									>
										{option.name}
									</a>
								))}
						</div>
					)}
				</div>
				<div aria-hidden className={`${classes.cloud} ${classes.initialCloud}`}>
					<SVG src={'/assets/Cloud 1 Asset.svg'} />
				</div>
			</div>
			{isLanding && (
				<div className={classes.skipButton}>
					<Button onClick={isDone} className="primary">
						Skip
					</Button>
				</div>
			)}
		</>
	)
}

export default Airplane
