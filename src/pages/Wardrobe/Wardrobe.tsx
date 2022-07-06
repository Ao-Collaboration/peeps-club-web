import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import FadeTo from '../../components/Scene/FadeTo'
import WardrobeTraitSelector from '../../components/Trait/WardrobeTraitSelector'
import { host } from '../../config/api'
import { black } from '../../config/colors'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { CategoryName } from '../../interface/availableTraits'
import { Trait } from '../../interface/metadata'
import doFetch from '../../utils/doFetch'
import useStyles from './Wardrobe.styles'

function Wardrobe() {
	const classes = useStyles()
	const sunIconTraits: CategoryName[] = ['Time', 'District']
	const personIconTraits: CategoryName[] = [
		'Skin',
		'Skin Condition',
		'Facial Hair',
		'Hair',
		'Hair Colour',
		'Eye Colour',
		'Eye Style',
		'Eye Outline',
		'Expression',
	]
	const shirtIconTraits: CategoryName[] = [
		'Tops',
		'Bottoms',
		'One Piece',
		'Outerwear',
		'Shoes',
		'Front Accessory',
		'Rear Accessory',
		'Pose',
	]
	type CategorySelection = 'Area' | 'Peep' | 'Outfit'

	const { metadata } = useContext(MetadataContext)
	const [currentTraits, setCurrentTraits] = useState(sunIconTraits)
	const [selectionString, setSelectionString] = useState('Area   Selections')
	const [peepImage, setPeepImage] = useState('')
	const [isBackgroundDisplayed, setIsBackgroundDisplayed] = useState(true)
	const [isToggleHidden, setIsToggleHidden] = useState(true)

	useEffect(() => {
		getPeepImage()
	}, [metadata, isBackgroundDisplayed])

	const getPeepImage = async () => {
		const requestMetadata: Trait[] = JSON.parse(JSON.stringify(metadata))
		if (!isBackgroundDisplayed) {
			requestMetadata.forEach(category => {
				if (category.trait_type === 'District') {
					category.value = 'None'
				} else if (category.trait_type === 'Time') {
					category.value = 'None'
				}
			})
		}

		const svg = await doFetch(
			`${host}/peep/`,
			'POST',
			{ attributes: requestMetadata },
			'image/svg+xml',
		)
		setPeepImage(URL.createObjectURL(svg))
	}

	const changeSelection = (selection: CategorySelection) => {
		setSelectionString(`${selection}   Selections`)
		switch (selection) {
		case 'Area':
			setCurrentTraits(sunIconTraits)
			setIsBackgroundDisplayed(true) // show background by default on this tab
			setIsToggleHidden(true)
			break
		case 'Outfit':
			setCurrentTraits(shirtIconTraits)
			setIsToggleHidden(false)
			break
		case 'Peep':
			setCurrentTraits(personIconTraits)
			setIsToggleHidden(false)
			break
		}
	}

	return (
		<>
			<FadeTo color={black} isFadeOut={false} isFading={true} />
			<div className={classes.page}></div>
			<div className={classes.container}>
				<div className={classes.navpanel}>
					<img
						onClick={() => {
							changeSelection('Area')
						}}
						className={classes.icon}
						src="/assets/Icon Sun Asset.svg"
					/>
					<img
						onClick={() => {
							changeSelection('Peep')
						}}
						className={classes.icon}
						src="/assets/Icon Person Asset.svg"
					/>
					<img
						onClick={() => {
							changeSelection('Outfit')
						}}
						className={classes.icon}
						src="/assets/Icon Shirt Asset.svg"
					/>
					<span className={classes.title}>{selectionString}</span>
				</div>
				<WardrobeTraitSelector categories={currentTraits} />
				<div
					style={{ backgroundImage: `url(${peepImage})` }}
					className={classes.mirrorPeep}
				>
					<img src="/assets/mirror.svg" className={classes.mirrorRear} />
					<img src="/assets/mirror_front.svg" className={classes.mirrorFront} />
					{!isToggleHidden && (
						<FontAwesomeIcon
							icon={isBackgroundDisplayed ? faEyeSlash : faEye}
							onClick={() => {
								setIsBackgroundDisplayed(!isBackgroundDisplayed)
							}}
							className={classes.backgroundToggle}
						/>
					)}
				</div>
			</div>
		</>
	)
}

export default Wardrobe
