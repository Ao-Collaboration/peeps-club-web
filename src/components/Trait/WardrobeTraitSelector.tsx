import {
	faCrown,
	faQuestionCircle,
	faSortDown,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { host } from '../../config/api'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { CategoryName, TraitOption } from '../../interface/availableTraits'
import { defaultPeep, Trait } from '../../interface/metadata'
import doFetch from '../../utils/doFetch'
import TraitRequest from './TraitRequest'
import useStyles from './WardrobeTraitSelector.styles'

interface Props {
	categories: CategoryName[]
}

interface StringMap {
	[key: string]: string[]
}

const WardrobeTraitSelector: React.FC<Props> = ({ categories }) => {
	const classes = useStyles()
	const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1)
	const [isWardrobeOpen, setIsWardrobeOpen] = useState(false)
	const [selectableTraits, setSelectableTraits] = useState<TraitOption[]>([])
	const [exclusionList, setExclusionList] = useState<StringMap>({})
	const [isRequestDisplayed, setIsRequestDisplayed] = useState(false)

	const { metadata, setMetadata, availableTraits } = useContext(MetadataContext)

	if (!metadata || !setMetadata || !availableTraits) {
		return <></>
	}

	useEffect(() => {
		const getExclusionsList = async () => {
			const exclusions = await doFetch(`${host}/peep/exclusions`, 'GET')
			setExclusionList(exclusions)
		}

		getExclusionsList()
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

	// takes into account clothing types
	const updateSelectedTrait = (categoryIndex: number, value: string) => {
		const category = categories[categoryIndex]
		const updatedMetadata = [...metadata]
		const setValue = (c: string, v: string) => {
			updatedMetadata.filter(item => {
				return item.trait_type === c
			})[0].value = v
		}

		if (['Tops', 'Bottoms', 'One Piece'].includes(category)) {
			if (getSelectedTrait(category) === 'None') {
				if (category === 'One Piece') {
					setValue('Tops', 'None')
					setValue('Bottoms', 'None')
				} else {
					setValue('One Piece', 'None')
					if (category === 'Tops') {
						setValue('Bottoms', 'Skinny Black Jeans')
					} else {
						setValue('Tops', 'Purple Tank')
					}
				}
			}
		}
		setValue(category, value)
		setMetadata(updatedMetadata)
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
			if (exclusionList[trait.value]) {
				const rule = exclusionList[trait.value]
				for (let j = 0; j < rule.length; j++) {
					const x = rule[j]
					for (let k = 0; k < testMetadata.length; k++) {
						const otherTraits = testMetadata[k]
						if (otherTraits.trait_type !== trait.trait_type) {
							if (x === otherTraits.value) {
								return false
							}
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
		//set ideal trait
		updatedMetadata.forEach(item => {
			if (item.trait_type === updatedTrait.trait_type) {
				item.value = updatedTrait.value
			}
		})
		updatedMetadata.forEach(item => {
			if (item.trait_type === categoryToReset) {
				//test the default replacement
				const defaultValue = defaultPeep.filter(trait => {
					return trait.trait_type === categoryToReset
				})[0].value
				item.value = defaultValue

				// try all others from category if replacement doesn't work
				let exhaustedOptions = false
				let index = 0
				while (!validateMetadata(updatedMetadata) && !exhaustedOptions) {
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
		if (exclusionList[traitName]) {
			exclusionList[traitName].forEach((exclude: string) => {
				metadata.forEach(trait => {
					if (exclude === trait.value) {
						exclusions.push({
							trait_type: trait.trait_type,
							value: exclude,
						})
					}
				})
			})
		}
		return exclusions
	}

	const selectTraitHangar = (
		trait: TraitOption,
		category: CategoryName,
		exclusions: Trait[],
	) => {
		if (exclusions.length < 1) {
			updateSelectedTrait(selectedCategoryIndex, trait.name)
		} else if (
			exclusions.length === 1 &&
			canBeResolved(exclusions[0].trait_type, {
				trait_type: category,
				value: trait.name,
			})
		) {
			updateSelectedTrait(selectedCategoryIndex, trait.name)
			const newMeta = resolve(exclusions[0].trait_type, {
				trait_type: category,
				value: trait.name,
			})
			setMetadata(newMeta)
		}
	}

	// is a hangar disabled
	const isDisabled = (
		exclusions: Trait[],
		trait: TraitOption,
		category: CategoryName,
	) => {
		if (trait.exclusive && !trait.isAvailable) {
			return true
		}
		if (exclusions.length > 1) {
			return true
		}
		if (
			exclusions.length === 1 &&
			!canBeResolved(exclusions[0].trait_type, {
				trait_type: category,
				value: trait.name,
			})
		) {
			{
				return true
			}
		}
		return false
	}

	const partnerInfo = (name: string, link: string) => {
		return (
			<div>
				<p>Exclusive to..</p>
				<a href={link} target={'_blank'}>
					{name}
				</a>
			</div>
		)
	}

	const traitHangar = (trait: TraitOption, index: number) => {
		const category = categories[selectedCategoryIndex]
		const traitName = trait.name
		const exclusions: Trait[] = getExclusions(traitName)

		const disabled = isDisabled(exclusions, trait, category)

		// hide None options on tops/bottoms/one-piece
		if (
			['Tops', 'Bottoms', 'One Piece', 'District', 'Time'].includes(category) &&
			traitName === 'None'
		) {
			return <></>
		}

		return (
			<div
				className={`${classes.hanger}  ${classes.fadeInHangars}`}
				key={`${category}-${traitName}-${index}`}
			>
				<button
					className={`${classes.hangerText} ${
						traitName === getSelectedTrait(category) ? classes.underlined : ''
					}`}
					onClick={() => {
						!disabled && selectTraitHangar(trait, category, exclusions)
					}}
					aria-disabled={disabled}
					aria-label={traitName}
				>
					<div
						aria-hidden
						style={{
							backgroundImage: `url("/assets/${category}/${traitName}.png")`,
						}}
						className={classes.icon}
					></div>
					<p aria-hidden>{traitName}</p>

					{exclusions.length > 0 && traitName !== getSelectedTrait(category) && (
						<div className={classes.exclusion}>
							<FontAwesomeIcon icon={faQuestionCircle} />
							<div className={classes.popup}>
								{`Not compatible with ${exclusions.map(item => {
									return `${item.trait_type}: ${item.value}`
								})}`}
							</div>
						</div>
					)}
					{trait.exclusive && trait.link && (
						<div className={classes.exclusiveItem}>
							<FontAwesomeIcon icon={faCrown} />
							<div className={classes.popup}>
								{partnerInfo(trait.name, trait.link)}
							</div>
						</div>
					)}
				</button>
				<img
					aria-hidden
					className={`${classes.hangerImage} ${disabled && classes.disabled}`}
					src={'/assets/Trait Hanger Asset.svg'}
				/>
			</div>
		)
	}

	return (
		<>
			{isRequestDisplayed && (
				<TraitRequest
					onClose={() => {
						setIsRequestDisplayed(false)
					}}
				/>
			)}
			<div className={classes.container}>
				<img
					aria-hidden
					src="/assets/wardrobe_rear.svg"
					className={classes.wardrobeContainer}
				/>
				<img
					aria-hidden
					src="/assets/wardrobe_front.svg"
					className={classes.wardrobeContainerFront}
				/>
				<img
					aria-hidden
					src="/assets/wardrobe_door.svg"
					className={`${classes.wardrobeDoor} ${
						isWardrobeOpen ? classes.openWardrobe : classes.closeWardrobe
					}`}
				/>
				<div className={classes.doorpanel}>
					{categories.map((categoryName, index) => (
						<button
							onClick={() => {
								updateCategory(index)
							}}
							className={`${classes.category} ${
								selectedCategoryIndex === index && classes.selected
							}`}
							key={categoryName}
						>
							{categoryName}
						</button>
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
					{selectedCategoryIndex >= 0 && categories[selectedCategoryIndex] && (
						<>
							{selectableTraits.map((item, index) => traitHangar(item, index))}
							<div className={`${classes.hanger}  ${classes.fadeInHangars}`}>
								<input
									type="image"
									onClick={() => {
										setIsRequestDisplayed(true)
									}}
									aria-label="Request a new trait"
									className={`${classes.shoppingImage}`}
									src={'/assets/Shopping Bag Asset.svg'}
								/>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	)
}

export default WardrobeTraitSelector
