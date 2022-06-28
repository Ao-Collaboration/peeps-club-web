import { faLevelDownAlt, faSortDown } from '@fortawesome/free-solid-svg-icons'
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

	const updateSelectedTraits = (categoryIndex: number, name: string) => {
		const updatedMetadata = [...metadata]
		updatedMetadata.forEach(traitItem => {
			if (traitItem.trait_type === categories[categoryIndex]) {
				traitItem.value = name
			}
		})
		setMetadata(updatedMetadata)
	}

	const getSelectedTrait = (category: string) => {
		return metadata.filter(trait => {
			return trait.trait_type === category
		})[0].value
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
							selectableTraits.map(item => (
								<div
									className={`${classes.hanger}  ${classes.fadeInHangars}`}
									key={`${categories[selectedCategoryIndex]}-${item.name}`}
								>
									<div
										className={`${classes.hangerText} ${
											item.name ===
											getSelectedTrait(categories[selectedCategoryIndex])
												? classes.underlined
												: ''
										}`}
										onClick={() => {
											updateSelectedTraits(selectedCategoryIndex, item.name)
										}}
									>
										<p>{item.name}</p>
									</div>
									<img
										className={classes.hangerImage}
										src={'/assets/Trait Hanger Asset.svg'}
									/>
								</div>
							))}
					</>
				</div>
			</div>
		</>
	)
}

export default WardrobeTraitSelector
