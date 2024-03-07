import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useLocation } from 'react-router-dom'
import WardrobeTraitSelector from '../../components/Trait/WardrobeTraitSelector'
import WardrobeUpdate from '../../components/Trait/WardrobeUpdate'
import { host } from '../../config/api'
import { black } from '../../config/colors'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { Trait } from '../../interface/metadata'
import doFetch from '../../utils/doFetch'
import { tableOrMobileQuery } from '../../utils/mediaQuery'
import useStyles from './Mirror.styles'
import {
	CategorySelection,
	removeLocationTraits,
} from '../../interface/selection'
import FadeTo from '../../components/Scene/FadeTo'

interface propState {
	tokenId: number
}

function Mirror() {
	const classes = useStyles()

	const { metadata } = useContext(MetadataContext)
	const [selectedCategory, setSelectedCategory] =
		useState<CategorySelection | null>('Location')
	const [peepImage, setPeepImage] = useState('')
	const [isBackgroundDisplayed, setIsBackgroundDisplayed] = useState(true)
	const [isToggleHidden, setIsToggleHidden] = useState(true)
	const [isShowingDone, setIsShowingDone] = useState(false)

	const { tokenId } = useLocation().state as propState

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
			{ attributes: requestMetadata },
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
					<input
						type="image"
						onClick={() => {
							// FIXME Peep?
							changeSelection(null)
						}}
						className={classes.icon}
						src="/assets/Icon Person Asset.svg"
						aria-label="Peep Trait Selection"
					/>
					<input
						type="image"
						onClick={() => {
							// FIXME Outfit?
							changeSelection(null)
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
						{selectedCategory}
					</span>
				</div>
				{!isShowingDone ? (
					<WardrobeTraitSelector categories={[]} /> // FIXME Limit traits by category
				) : (
					<WardrobeUpdate tokenId={tokenId} />
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

export default Mirror
