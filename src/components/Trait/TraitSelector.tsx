import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { Category, CategoryName } from '../../interface/availableTraits'
import useStyles from './TraitSelector.styles'

interface Props {
	availableTraits: Category[]
}

const TraitSelector: React.FC<Props> = ({ availableTraits }) => {
	const classes = useStyles()
	const categories: CategoryName[] = [
		'Skin Condition',
		'Skin',
		'Facial Hair',
		'Hair',
		'Hair Colour',
		'Eye Colour',
		'Eye Style',
		'Eye Outline',
		'Expression',
	]
	const categoryExampleImages = [
		'Asymmetric Vitiligo',
		'Almond',
		'Moustache',
		'Twin Braids',
		'Mid Brown',
		'Blue',
		'Bow',
		'Eyelashes',
		'Meow',
	]
	const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1)

	const { metadata, setMetadata, getSelectedTrait } =
		useContext(MetadataContext)

	if (!metadata || !setMetadata || !getSelectedTrait) {
		return <></>
	}

	const updateCategory = (index: number) => {
		setSelectedCategoryIndex(index)
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
			<div className={classes.thumbnails}>
				{selectedCategoryIndex < 0
					? categories.map((category, index) => (
						<div key={category}>
							<div className={classes.icon}>
								<input
									type="image"
									onClick={() => {
										updateCategory(index)
									}}
									aria-label={category}
									src={`/assets/${category}/${categoryExampleImages[index]}.png`}
								/>
							</div>
							<p aria-hidden>{category}</p>
						</div>
					))
					: availableTraits
						.filter(traitCategory => {
							return (
								traitCategory.category === categories[selectedCategoryIndex]
							)
						})[0]
						.items.map(item => (
							<div
								key={item.name}
								className={
									item.name ===
										getSelectedTrait(categories[selectedCategoryIndex])
										? classes.selected
										: ''
								}
							>
								<div className={classes.icon}>
									<input
										type="image"
										onClick={() => {
											updateSelectedTraits(selectedCategoryIndex, item.name)
										}}
										aria-label={item.name}
										src={`/assets/${categories[selectedCategoryIndex]}/${item.name}.png`}
									/>
								</div>
								<p aria-hidden>{item.name}</p>
							</div>
						))}
			</div>
		</div>
	)
}

export default TraitSelector