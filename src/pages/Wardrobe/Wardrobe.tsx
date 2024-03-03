import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import FadeTo from '../../components/Scene/FadeTo'
import WardrobeConfirm from '../../components/Trait/WardrobeConfirm'
import WardrobeTraitSelector from '../../components/Trait/WardrobeTraitSelector'
import { host } from '../../config/api'
import { black } from '../../config/colors'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import {
	Trait,
	traitsToMetadata,
} from '../../interface/metadata'
import {
	CategorySelection,
	removeLocationTraits,
} from '../../interface/selection'
import doFetch from '../../utils/doFetch'
import { tableOrMobileQuery } from '../../utils/mediaQuery'
import useStyles from './Wardrobe.styles'

function Wardrobe() {
	const classes = useStyles()

	const { metadata, availableTraits } = useContext(MetadataContext)
	const [selectedCategory, setSelectedCategory] =
		useState<CategorySelection | null>('Location')
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
		let requestMetadata: Trait[] = [...metadata]
		if (!isBackgroundDisplayed) {
			requestMetadata = removeLocationTraits(requestMetadata)
		}

		const svg = await doFetch(
			`${host}/peep/`,
			'POST',
			{ attributes: traitsToMetadata(requestMetadata) },
			'image/svg+xml',
		)
		setPeepImage(URL.createObjectURL(svg))
	}

	const changeSelection = (selection: CategorySelection | null) => {
		setSelectedCategory(selection)
		setIsShowingDone(false)

		if (selection === 'Location') {
			setIsBackgroundDisplayed(true) // show background by default on this tab
			setIsToggleHidden(true)
		} else {
			setIsToggleHidden(false)
		}
	}

	const showDone = () => {
		setIsShowingDone(true)
		setSelectedCategory(null)
	}

	const getSecondLevelCategories = (category: string) => {
		const level = category === 'Pose' ? 0 : 1 // Return first level instead for pose
		return Array.from(
			new Set(
				availableTraits
					?.filter(t => t.categories?.includes(category))
					.map(t => t.categories?.[level])
					.filter(c => !!c) as string[],
			),
		)
	}

	const isTabletOrMobile = useMediaQuery({ query: tableOrMobileQuery })

	return (
		<>
			<FadeTo color={black} isFadeOut={false} isFading={true} />
			<div aria-hidden className={classes.background}></div>
			<div
				className={
					isTabletOrMobile ? classes.containerSmall : classes.container
				}
			>
				<div className={classes.navpanel}>
					<input
						type="image"
						onClick={() => {
							changeSelection('Location')
						}}
						className={classes.icon}
						src="/assets/Icon Sun Asset.svg"
						aria-label="Area Trait Selection"
					/>
					{/* FIXME What about name and such? */}
					<input
						type="image"
						onClick={() => {
							changeSelection('Face')
						}}
						className={classes.icon}
						src="/assets/Icon Person Asset.svg"
						aria-label="Face Selection"
					/>
					<input
						type="image"
						onClick={() => {
							changeSelection('Pose')
						}}
						className={classes.icon}
						src="/assets/Icon Person Asset.svg"
						aria-label="Pose Selection"
					/>
					<input
						type="image"
						onClick={() => {
							changeSelection('Clothing')
						}}
						className={classes.icon}
						src="/assets/Icon Shirt Asset.svg"
						aria-label="Clothing Selection"
					/>
					<input
						type="image"
						onClick={() => {
							changeSelection('Accessory')
						}}
						className={classes.icon}
						src="/assets/Icon Shirt Asset.svg"
						aria-label="Accessory Selection"
					/>
					<input
						type="image"
						onClick={showDone}
						className={classes.icon}
						src="/assets/Icon Tick Asset.svg"
						aria-label="Done?"
					/>
					<span aria-hidden className={classes.title}>
						{selectedCategory}
					</span>
				</div>
				{!isShowingDone ? (
					<WardrobeTraitSelector
						categories={
							selectedCategory ? getSecondLevelCategories(selectedCategory) : []
						}
					/>
				) : (
					<WardrobeConfirm />
				)}
				<div
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
