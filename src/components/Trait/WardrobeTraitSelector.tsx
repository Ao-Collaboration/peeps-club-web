import { faCrown, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { Trait } from '../../interface/metadata'
import TraitRequest from './TraitRequest'
import useStyles from './WardrobeTraitSelector.styles'
import doFetch from '../../utils/doFetch'
import { host } from '../../config/api'

interface Props {
	categories: string[]
}

const WardrobeTraitSelector: React.FC<Props> = ({ categories }) => {
	const classes = useStyles()
	const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1)
	const [isWardrobeOpen, setIsWardrobeOpen] = useState(false)
	const [selectableTraits, setSelectableTraits] = useState<Trait[]>([])
	const [isRequestDisplayed, setIsRequestDisplayed] = useState(false)
	const [oneAndOnlyOneList, setOneAndOnlyOneList] = useState<string[]>([])
	const [atLeastSomeClothesList, setAtLeastSomeClothes] = useState<string[]>([])

	const { metadata, setMetadata, availableTraits, getSelectedTrait } =
		useContext(MetadataContext)

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

	useEffect(() => {
		getCategoryRules()
	}, [])

	const getCategoryRules = async () => {
		const response = await doFetch(`${host}/peep/category-rules`, 'GET')
		setAtLeastSomeClothes(response.atLeastSomeClothes)
		setOneAndOnlyOneList(response.oneAndOnlyOne)
	}

	const updateCategory = (index: number) => {
		setSelectedCategoryIndex(index)
		if (index >= 0) {
			const category = categories[index]
			setSelectableTraits(
				availableTraits.filter(t => t.categories?.includes(category)),
			)
		}
	}

	const hasOnlyOneClothingItem = (metadataTraits: Trait[]) => {
		const clothingCountSets = metadataTraits.filter(t =>
			atLeastSomeClothesList.some(category => t.categories?.includes(category)),
		).length
		const clothingCountItems = metadataTraits.filter(
			t => t.categories?.includes('Tops') || t.categories?.includes('Bottoms'),
		).length

		return (
			(clothingCountSets === 1 && clothingCountItems === 0) ||
			(clothingCountSets === 0 && clothingCountItems === 2)
		)
	}

	const updateTrait = (
		metadataTraits: Trait[],
		categoryString: string,
		value: string,
	) => {
		const hadMatch = metadataTraits.find(t => t.name === value)
		const mustHaveExactlyOne = oneAndOnlyOneList.includes(categoryString)
		const islastPieceOfClothing = hasOnlyOneClothingItem(metadataTraits)
		let updatedMetadata = [...metadataTraits]

		if (hadMatch && (mustHaveExactlyOne || islastPieceOfClothing)) {
			// FIXME How does UI handle not being able to remove a trait
			return
		}

		if (mustHaveExactlyOne) {
			// selected, remove previous
			updatedMetadata = metadataTraits.filter(
				t => t.categories?.join(' - ') !== categoryString,
			)
		}

		if (hadMatch) {
			// deselect selected trait
			updatedMetadata = metadataTraits.filter(t => t.name !== value)
		} else {
			// add trait as long as we weren't already wearing it
			const trait = availableTraits.find(t => t.name === value)
			if (trait) {
				updatedMetadata.push(trait)
			} else {
				// Name, birthday, pronouns, other non-defined traits
				updatedMetadata.push({
					name: value,
					categories: [categoryString],
				})
			}
		}

		setMetadata(updatedMetadata)
	}

	const selectTraitHangar = (trait: Trait) => {
		const selectedCategory = categories[selectedCategoryIndex]
		updateTrait(
			metadata,
			trait.categories?.join(' - ') ?? selectedCategory,
			trait.name,
		)
	}

	const traitSelected = (value: string) => metadata.find(t => t.name === value)

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

	const traitHangar = (trait: Trait, index: number) => {
		const category = categories[selectedCategoryIndex]
		const traitName = trait.name

		//FIXME hide None options on tops/bottoms/one-piece
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
						getSelectedTrait && getSelectedTrait(category) === traitName
							? classes.underlined
							: ''
					}`}
					onClick={() => {
						selectTraitHangar(trait)
					}}
					aria-label={trait.label}
				>
					<div
						aria-hidden
						style={{
							backgroundImage: `url("/assets/${category}/${traitName}.png")`,
						}}
						className={classes.icon}
					></div>
					<p aria-hidden>{trait.label}</p>

					{trait.exclusive?.projectLink && (
						<div className={classes.exclusiveItem}>
							<FontAwesomeIcon icon={faCrown} />
							<div className={classes.popup}>
								{partnerInfo(trait.name, trait.exclusive?.projectLink)}
							</div>
						</div>
					)}
				</button>
				<img
					aria-hidden
					className={classes.hangerImage}
					src={
						traitSelected(trait.name)
							? '/assets/Trait Hanger Selected.svg'
							: '/assets/Trait Hanger Asset.svg'
					}
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
