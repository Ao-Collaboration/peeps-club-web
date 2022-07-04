import { faQuestionCircle, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { host } from '../../config/api'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { CategoryName, TraitOption } from '../../interface/availableTraits'
import { defaultPeep, Trait } from '../../interface/metadata'
import doFetch from '../../utils/doFetch'
import useStyles from './WardrobeTraitSelector.styles'

interface Props {
	categories: CategoryName[]
}

const WardrobeTraitSelector: React.FC<Props> = ({ categories }) => {
	const classes = useStyles()
	const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1)
	const [isWardrobeOpen, setIsWardrobeOpen] = useState(false)
	const [selectableTraits, setSelectableTraits] = useState<TraitOption[]>([])
	const [exclusionList, setExclusionList] = useState<string[][]>([])

	const { metadata, setMetadata, availableTraits } = useContext(MetadataContext)

	if (!metadata || !setMetadata || !availableTraits) {
		return <></>
	}

	useEffect(() => {
		const getExclusions = async () => {
			const exclusions = await doFetch(`${host}/peep/exclusions`, 'GET')
			setExclusionList(exclusions)
		}

		getExclusions()
	}, [])

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

	// takes into account clothing types
	const updateSelectedTrait = (categoryIndex: number, value: string) => {
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

	// highlights if changing the current trait would remove other clothing items
	const showClothingException = () => {
		const category = categories[selectedCategoryIndex]
		if (['Tops', 'Bottoms', 'One Piece'].includes(category)) {
			return getSelectedTrait(category) === 'None'
		}
		return false
	}

	// check metadata against exclusions list to ensure they are valid
	const validateMetadata = (testMetadata: Trait[]) => {
		for (let i = 0; i < testMetadata.length; i++) {
			const trait = testMetadata[i]
			for (let j = 0; j < exclusionList.length; j++) {
				const traitPair = exclusionList[j]

				let valueToFind = ''
				if (traitPair[0] === trait.value) {
					valueToFind = traitPair[1]
				} else if (traitPair[1] === trait.value) {
					valueToFind = traitPair[0]
				}

				if (valueToFind.length > 0) {
					for (let k = 0; k < testMetadata.length; k++) {
						const traitAgain = testMetadata[k]
						if (traitAgain.value === valueToFind) {
							return false
						}
					}
				}
			}
		}
		return true
	}

	// attempt to place and new trait and reset an offending category (must be tested to ensure validity)
	const resolve = (categoryToReset: CategoryName, updatedTrait: Trait) => {
		const updatedMetadata: Trait[] = JSON.parse(JSON.stringify(metadata))
		updatedMetadata.forEach(item => {
			//set new trait
			if (item.trait_type === updatedTrait.trait_type) {
				item.value = updatedTrait.value
			}
			//test the default replacement
			if (item.trait_type === categoryToReset) {
				const defaultValue = defaultPeep.filter(trait => {
					return trait.trait_type === categoryToReset
				})[0].value
				item.value = defaultValue

				// try all others from category if replacement doesn't work
				if (!validateMetadata(updatedMetadata)) {
					let exhaustedOptions = false
					let index = 0
					while (!validateMetadata(updatedMetadata) || exhaustedOptions) {
						try {
							item.value = availableTraits.filter(traitCategory => {
								return traitCategory.category === categoryToReset
							})[0].items[index].name
						} catch {
							exhaustedOptions = true
						}
						index++
					}
				}
			}
		})
		return updatedMetadata
	}

	const canBeResolved = (
		categoryToReset: CategoryName,
		updatedTrait: Trait,
	) => {
		const testMetadata = resolve(categoryToReset, updatedTrait)
		return validateMetadata(testMetadata)
	}

	// find exclusions on a particular trait
	const getExclusions = (traitName: string) => {
		const exclusions: Trait[] = []
		exclusionList.forEach(traitPair => {
			if (traitPair.includes(traitName)) {
				metadata.forEach(trait => {
					if (traitPair.includes(trait.value)) {
						if (traitPair[0] === traitName) {
							exclusions.push({
								trait_type: trait.trait_type,
								value: traitPair[1],
							})
						} else {
							exclusions.push({
								trait_type: trait.trait_type,
								value: traitPair[0],
							})
						}
					}
				})
			}
		})
		return exclusions
	}

	const selectTraitHangar = (
		traitName: string,
		category: CategoryName,
		exclusions: Trait[],
	) => {
		if (exclusions.length < 1) {
			updateSelectedTrait(selectedCategoryIndex, traitName)
		} else if (
			exclusions.length === 1 &&
			canBeResolved(exclusions[0].trait_type, {
				trait_type: category,
				value: traitName,
			})
		) {
			updateSelectedTrait(selectedCategoryIndex, traitName)
			const newMeta = resolve(exclusions[0].trait_type, {
				trait_type: category,
				value: traitName,
			})
			setMetadata(newMeta)
		}
	}

	// is a hangar disabled
	const isDisabled = (
		exclusions: Trait[],
		traitName: string,
		category: CategoryName,
	) => {
		if (exclusions.length > 1) {
			return true
		}
		if (
			exclusions.length === 1 &&
			!canBeResolved(exclusions[0].trait_type, {
				trait_type: category,
				value: traitName,
			})
		) {
			{
				return true
			}
		}
		return false
	}

	const traitHangar = (traitName: string) => {
		const category = categories[selectedCategoryIndex]
		const exclusions: Trait[] = getExclusions(traitName)

		// hide None options on tops/bottoms/one-piece
		if (
			['Tops', 'Bottoms', 'One Piece'].includes(category) &&
			traitName === 'None'
		) {
			return <></>
		}

		return (
			<div
				className={`${classes.hanger}  ${classes.fadeInHangars}`}
				key={`${category}-${traitName}`}
			>
				<div
					className={`${classes.hangerText} ${
						traitName === getSelectedTrait(category) ? classes.underlined : ''
					}`}
					onClick={() => {
						selectTraitHangar(traitName, category, exclusions)
					}}
				>
					<p>{traitName}</p>
				</div>
				<img
					className={`${classes.hangerImage} ${
						isDisabled(exclusions, traitName, category) && classes.disabled
					}`}
					src={'/assets/Trait Hanger Asset.svg'}
				/>
				{exclusions.length > 0 && traitName !== getSelectedTrait(category) && (
					<div className={classes.exclusion}>
						<FontAwesomeIcon icon={faQuestionCircle} />
						<div className={classes.exclusionReason}>
							{`Not compatible with ${exclusions.map(item => {
								return `${item.trait_type}: ${item.value}`
							})}`}
						</div>
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
					{showClothingException() && (
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
