import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import FadeTo from '../../components/Scene/FadeTo'
import WardrobeConfirm from '../../components/Trait/WardrobeConfirm'
import WardrobeTraitSelector from '../../components/Trait/WardrobeTraitSelector'
import { host } from '../../config/api'
import { black } from '../../config/colors'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { CategoryName } from '../../interface/availableTraits'
import { getFullDescription, Trait } from '../../interface/metadata'
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
		'Clothing Accessory',
	]
	type CategorySelection = 'Area' | 'Peep' | 'Outfit'

	const { metadata } = useContext(MetadataContext)
	const [currentTraits, setCurrentTraits] = useState(sunIconTraits)
	const [selectionString, setSelectionString] = useState('Area   Selections')
	const [peepImage, setPeepImage] = useState('')
	const [isBackgroundDisplayed, setIsBackgroundDisplayed] = useState(true)
	const [isToggleHidden, setIsToggleHidden] = useState(true)
	const [isShowingDone, setIsShowingDone] = useState(false)

	if (!metadata) {
		return <></>
	}

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
		setSelectionString(`${selection}  Selections`)
		setIsShowingDone(false)
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

	const showDone = () => {
		setIsShowingDone(true)
		setSelectionString('')
	}

	return (
		<>
			<FadeTo color={black} isFadeOut={false} isFading={true} />
			<div aria-hidden className={classes.page}></div>
			<div className={classes.container}>
				<div className={classes.navpanel}>
					<input
						type="image"
						onClick={() => {
							changeSelection('Area')
						}}
						className={classes.icon}
						src="/assets/Icon Sun Asset.svg"
						aria-label="Area Trait Selection"
					/>
					<input
						type="image"
						onClick={() => {
							changeSelection('Peep')
						}}
						className={classes.icon}
						src="/assets/Icon Person Asset.svg"
						aria-label="Peep Trait Selection"
					/>
					<input
						type="image"
						onClick={() => {
							changeSelection('Outfit')
						}}
						className={classes.icon}
						src="/assets/Icon Shirt Asset.svg"
						aria-label="Outfit Selection"
					/>
					<input
						type="image"
						onClick={showDone}
						className={classes.icon}
						src="/assets/Icon Tick Asset.svg"
						aria-label="Done?"
					/>
					<span aria-hidden className={classes.title}>
						{selectionString}
					</span>
				</div>
				{!isShowingDone ? (
					<WardrobeTraitSelector categories={currentTraits} />
				) : (
					<WardrobeConfirm />
				)}
				<div
					aria-label={`${getFullDescription(metadata)}`}
					style={{ backgroundImage: `url(${peepImage})` }}
					className={classes.mirrorPeep}
				>
					<img
						aria-hidden
						src="/assets/mirror.svg"
						className={classes.mirrorRear}
					/>
					<img
						aria-hidden
						src="/assets/mirror_front.svg"
						className={classes.mirrorFront}
					/>
					{!isToggleHidden && (
						<button
							onClick={() => {
								setIsBackgroundDisplayed(!isBackgroundDisplayed)
							}}
							className={classes.backgroundToggle}
							aria-label="Toggle Background Display on Peep"
						>
							<FontAwesomeIcon
								icon={isBackgroundDisplayed ? faEyeSlash : faEye}
							/>
						</button>
					)}
				</div>
			</div>
		</>
	)
}

export default Wardrobe
