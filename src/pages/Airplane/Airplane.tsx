import useStyles from './Airplane.styles'
import SVG from 'react-inlinesvg'
import { useContext, useEffect, useState } from 'react'
import FadeTo from '../../components/Scene/FadeTo'
import { black } from '../../config/colors'
import { useNavigate } from 'react-router-dom'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { Category } from '../../interface/availableTraits'
import { ImmigrationIntroRoute } from '../routes'

const Airplane = () => {
	const classes = useStyles()
	const [isLanding, setIsLanding] = useState(false)
	const [isFading, setisFading] = useState(false)
	const [availableDistricts, setAvailableDistricts] = useState<Category>()
	const { metadata, setMetadata, availableTraits } = useContext(MetadataContext)
	const navigate = useNavigate()

	if (!metadata || !setMetadata || !availableTraits) {
		return <></>
	}

	const getAvailableDistricts = async () => {
		const districts = availableTraits.filter(item => {
			return item.category === 'District'
		})[0]

		setAvailableDistricts(districts)
	}

	useEffect(() => {
		getAvailableDistricts()
	}, [])

	const startLanding = (district: string) => {
		const updatedMetadata = [...metadata]
		updatedMetadata.forEach(item => {
			if (item.trait_type === 'District') {
				item.value = district
			}
		})
		setMetadata(updatedMetadata)
		setIsLanding(true)
	}

	const startFade = async () => {
		setisFading(true)
	}

	const isDone = () => {
		navigate(ImmigrationIntroRoute.path)
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
				<div
					className={`${classes.airplane} ${
						isLanding ? classes.landAnimation : classes.floatAnimation
					}`}
					onAnimationEnd={startFade}
				>
					<SVG src={'/assets/Plane Asset.svg'} />
				</div>
				<div
					aria-label="Land the Plane"
					className={`${classes.land} ${
						isLanding ? classes.pullAwayAnimation : ''
					}`}
				>
					<SVG src={'/assets/Cloud Button Asset.svg'} />
					<div className={classes.landingLinks}>
						{availableDistricts &&
							availableDistricts.items.map(option => (
								<a
									href="#"
									aria-label={option.name}
									key={option.name}
									onClick={() => {
										startLanding(option.name)
									}}
								>
									{option.name}
								</a>
							))}
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
