import { useContext, useEffect, useState } from 'react'
import FadeTo from '../../components/Scene/FadeTo'
import { black } from '../../config/colors'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import useStyles from './Immigration.styles'
import TraitSelector from '../../components/Trait/TraitSelector'
import Passport from '../../components/Passport/Passport'

function Immigration() {
	const classes = useStyles()
	const {metadata, setMetadata, availableTraits} = useContext(MetadataContext)

	if (!metadata || !setMetadata || !availableTraits) {
		return <></>
	}

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
								<Passport />
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