import {
	faLevelDownAlt,
	faQuestionCircle,
	faSortDown,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { CategoryName, TraitOption } from '../../interface/availableTraits'
import useStyles from './WardrobeTraitSelector.styles'

interface Props {
	categories: CategoryName[]
}

const WardrobeTraitSelector: React.FC<Props> = ({ categories }) => {
	const classes = useStyles()
	const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1)
	const [isWardrobeOpen, setIsWardrobeOpen] = useState(false)
	const [selectableTraits, setSelectableTraits] = useState<TraitOption[]>([])

	const { metadata, setMetadata, availableTraits } = useContext(MetadataContext)

	if (!metadata || !setMetadata || !availableTraits) {
		return <></>
	}

	useEffect(() => {
		setSelectedCategoryIndex(-1)
		setSelectableTraits([])
	}, [categories])

	useEffect(() => {
		setIsWardrobeOpen(selectedCategoryIndex < 0)
	}, [selectedCategoryIndex])

	const updateCategory = (index: number) => {
		setSelectedCategoryIndex(index)
		if (index >= 0) {
			setSelectableTraits(
				availableTraits.filter(traitCategory => {
					return traitCategory.category === categories[index]
				})[0].items,
			)
		}
	}

	const updateTrait = (category: CategoryName, value: string) => {
		const updatedMetadata = [...metadata]
		updatedMetadata.forEach(traitItem => {
			if (traitItem.trait_type === category) {
				traitItem.value = value
			}
		})
		setMetadata(updatedMetadata)
	}

	const updateSelectedTraits = (categoryIndex: number, value: string) => {
		const category = categories[categoryIndex]
		if (['Tops', 'Bottoms', 'One Piece'].includes(category)) {
			if (getSelectedTrait(category) === 'None') {
				if (category === 'One Piece') {
					updateTrait('Tops', 'None')
					updateTrait('Bottoms', 'None')
				} else {
					updateTrait('One Piece', 'None')
					if (category === 'Tops') {
						updateTrait('Bottoms', 'Skinny Black Jeans')
					} else {
						updateTrait('Tops', 'Tucked Tank')
					}
				}
			}
		}

		updateTrait(category, value)
	}

	const getSelectedTrait = (category: string) => {
		return metadata.filter(trait => {
			return trait.trait_type === category
		})[0].value
	}

	const showCLothingException = () => {
		const category = categories[selectedCategoryIndex]
		if (['Tops', 'Bottoms', 'One Piece'].includes(category)) {
			return getSelectedTrait(category) === 'None'
		}
		return false
	}

	const traitHangar = (traitName: string) => {
		const exclusionReasons = ''

		// hide None options on tops/bottoms/one-piece
		if (
			['Tops', 'Bottoms', 'One Piece'].includes(
				categories[selectedCategoryIndex],
			)
		) {
			if (traitName === 'None') {
				return <></>
			}
		}

		return (
			<div
				className={`${classes.hanger}  ${classes.fadeInHangars}`}
				key={`${categories[selectedCategoryIndex]}-${traitName}`}
			>
				<div
					className={`${classes.hangerText} ${
						traitName === getSelectedTrait(categories[selectedCategoryIndex])
							? classes.underlined
							: ''
					}`}
					onClick={() => {
						updateSelectedTraits(selectedCategoryIndex, traitName)
					}}
				>
					<p>{traitName}</p>
				</div>
				<img
					className={classes.hangerImage}
					src={'/assets/Trait Hanger Asset.svg'}
				/>
				{exclusionReasons.length > 0 && (
					<div className={classes.exclusion}>
						<FontAwesomeIcon icon={faQuestionCircle} />
						<div className={classes.exclusionReason}>{exclusionReasons}</div>
					</div>
				)}
			</div>
		)
	}

	return (
		<>
			<div className={classes.container}>
				<img
					src="/assets/wardrobe_rear.svg"
					className={classes.wardrobeContainer}
				/>
				<img
					src="/assets/wardrobe_front.svg"
					className={classes.wardrobeContainerFront}
				/>
				<img
					src="/assets/wardrobe_door.svg"
					className={`${classes.wardrobeDoor} ${
						isWardrobeOpen ? classes.openWardrobe : classes.closeWardrobe
					}`}
				/>
				<div className={classes.doorpanel}>
					{categories.map((categoryName, index) => (
						<div
							onClick={() => {
								updateCategory(index)
							}}
							className={`${classes.category} ${
								selectedCategoryIndex === index && classes.selected
							}`}
							key={categoryName}
						>
							{categoryName}
						</div>
					))}
					{showCLothingException() && (
						<div className={classes.exclusionTips}>
							<p>* Tops & Bottoms are not compatible with One Piece options</p>
						</div>
					)}
				</div>
				{selectableTraits?.length > 6 && (
					<div className={classes.moreTraitsArrow}>
						<FontAwesomeIcon icon={faSortDown} size="2x" />
					</div>
				)}
				<div className={classes.hangerContainer}>
					<>
						{selectedCategoryIndex >= 0 &&
							categories[selectedCategoryIndex] &&
							selectableTraits.map(item => traitHangar(item.name))}
					</>
				</div>
			</div>
		</>
	)
}

export default WardrobeTraitSelector
