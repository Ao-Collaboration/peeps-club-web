import { useContext, useEffect, useState } from 'react'
import FadeTo from '../../components/Scene/FadeTo'
import { black } from '../../config/colors'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import useStyles from './Immigration.styles'
import { Appearance } from '../../interface/metadata'
import { defaultPeep } from '../../config/traits'
import doFetch from '../../utils/doFetch'
import { host } from '../../config/api'
import TraitSelector from '../../components/Trait/TraitSelector'
import { Category } from '../../interface/traits'

function Immigration() {
	const classes = useStyles()
	const {metadata, setMetadata} = useContext(MetadataContext)
	const [appearance, setAppearance] = useState<Appearance>()

	const [availableTraits, setAvailableTraits] = useState<Category[]>()

	const getAvailableTraits = async() => {
		const results = await doFetch(`${host}/peep/traits`, 'GET')
		setAvailableTraits(results)
	}
	
	useEffect(() => {
		setAppearance(defaultPeep)
		getAvailableTraits()

	}, [])	

	return (
		<>
			<FadeTo color={black} isFadeOut={false} isFading={true} />
			<div className={classes.page}>
				<div className={`${classes.passport} ${classes.pullUpPassportAnimation}`}>
					{availableTraits &&
						<TraitSelector availableTraits={availableTraits}/>
					}
					<img src={'/assets/Passport Asset.svg'} />
				</div>
			</div>
			<p>Background - {metadata?.district}</p>
		</>
	)
}

export default Immigration