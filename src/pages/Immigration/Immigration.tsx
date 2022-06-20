import { useContext, useEffect, useState } from 'react'
import FadeTo from '../../components/Scene/FadeTo'
import { black } from '../../config/colors'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import useStyles from './Immigration.styles'
import { Appearance } from '../../interface/metadata'
import TraitSelector from '../../components/Trait/TraitSelector'
import { Category } from '../../interface/traits'

import Passport from '../../components/Passport/Passport'

import testDataTraits from '../../testData/traits.json'

function Immigration() {
	const classes = useStyles()
	const {metadata, setMetadata} = useContext(MetadataContext)
	const [appearance, setAppearance] = useState<Appearance>()
	const [currentPeepImage, setCurrentPeepImage] = useState<string>()

	const [availableTraits, setAvailableTraits] = useState<Category[]>()

	if (!setMetadata) {
		return <></>
	}

	const getAvailableTraits = async() => {
		// const results = await doFetch(`${host}/peep/traits`, 'GET')
		setAvailableTraits(testDataTraits)
	}

	const getPeepImage = async() => {
		// const svg = await doFetch(`${host}/peep`, 'POST', defaultPeepMetadata, 'image/svg+xml')
		// setCurrentPeepImage(svg)
	}
	
	useEffect(() => {
		setMetadata({})
		setAppearance(metadata?.appearance)
		getAvailableTraits()

	}, [])	

	useEffect(() => {
		getPeepImage()
	}, [])

	return (
		<>
			<FadeTo color={black} isFadeOut={false} isFading={true} />
			<div className={classes.page}>
				<div className={`${classes.passport} ${classes.pullUpPassportAnimation}`}>
					{availableTraits &&
						<TraitSelector availableTraits={availableTraits}/>
					}
					<div className={classes.passportContainer}>
						<img src={'/assets/passport_top.svg'} />
						<div className={classes.bottom}>
							<img src={'/assets/passport_mid.svg'} />
							{metadata &&
								<Passport metadata={metadata} />
							}
						</div>
						<img className={classes.hands} src={'/assets/passport_hands.svg'} />
					</div>
				</div>
			</div>
		</>
	)
}

export default Immigration