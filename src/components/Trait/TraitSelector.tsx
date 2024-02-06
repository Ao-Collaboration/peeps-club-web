import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { tableOrMobileQuery } from '../../utils/mediaQuery'
import useStyles from './TraitSelector.styles'
import { Trait } from '../../interface/metadata'

interface Props {
	availableTraits: Trait[]
}

const TraitSelector: React.FC<Props> = ({ availableTraits }) => {
	const classes = useStyles()
	//FIXME Correct category handling
	// For now we use the second element in the list as the group
	const categories = Array.from(
		new Set( // Unique
			availableTraits.map(t => t.categories?.[1]).filter(c => !!c) as string[],
		),
	)
	const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1)
	const [selectedCategoryTraits, setSelectedCategoryTraits] =
		useState<Trait[]>(availableTraits)

	const { metadata, setMetadata, getSelectedTrait } =
		useContext(MetadataContext)

	if (!metadata || !setMetadata || !getSelectedTrait) {
		return <></>
	}

	const isTabletOrMobile = useMediaQuery({ query: tableOrMobileQuery })

	const updateCategory = (index: number) => {
		setSelectedCategoryIndex(index)
		const category = categories[index]
		setSelectedCategoryTraits(
			availableTraits.filter(t => t.categories?.includes(category)),
		)
	}

	const updateSelectedTraits = (categoryIndex: number, name: string) => {
		const trait = availableTraits.find(t => t.name === name)
		if (trait) {
			const category = categories[categoryIndex]
			const updatedMetadata = [...metadata].filter(
				t => !t.categories?.includes(category),
			)
			updatedMetadata.push(trait)
			setMetadata(updatedMetadata)
		}
	}

	const showCategoryList = selectedCategoryIndex === -1

	return (
		<div className={classes.container}>
			<div className={classes.tabs}>
				{selectedCategoryIndex < 0 ? (
					<p>Customise Peep</p>
				) : (
					<>
						<button
							aria-label="Back"
							onClick={() => {
								setSelectedCategoryIndex(-1)
							}}
						>
							<FontAwesomeIcon icon={faAngleLeft} />
						</button>
						<p> {categories[selectedCategoryIndex]} </p>
					</>
				)}
			</div>
			<div
				className={
					isTabletOrMobile ? classes.thumbnailsSmall : classes.thumbnails
				}
			>
				{showCategoryList &&
					categories.map((category, index) => (
						<div key={category}>
							<div className={classes.icon}>
								<input
									type="image"
									onClick={() => {
										updateCategory(index)
									}}
									aria-label={category}
									src={`/assets/categories/${category}.png`} //FIXME We need images for this
								/>
							</div>
							<p aria-hidden>{category}</p>
						</div>
					))}
				{!showCategoryList &&
					selectedCategoryTraits.map(trait => (
						<div
							key={trait.name}
							className={
								trait.name ===
								getSelectedTrait(categories[selectedCategoryIndex])
									? classes.selected
									: ''
							}
						>
							<div className={classes.icon}>
								<input
									type="image"
									onClick={() => {
										updateSelectedTraits(selectedCategoryIndex, trait.name)
									}}
									aria-label={trait.name}
									src={`/assets/traits/${trait.name}.png`} //FIXME Need to move all traits into one big folder
								/>
							</div>
							<p aria-hidden>{trait.name}</p>
						</div>
					))}
			</div>
		</div>
	)
}

export default TraitSelector
