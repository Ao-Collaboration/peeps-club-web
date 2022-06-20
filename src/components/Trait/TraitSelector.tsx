import { useState } from 'react'
import { Category } from '../../interface/traits'
import useStyles from './TraitSelector.styles'

interface Props {
	availableTraits: Category[],
}

const TraitSelector: React.FC<Props> = ({ availableTraits }) => {
	const classes = useStyles()
	const categories = ['Skin Condition', 'Skin Tone', 'Facial Hair', 'Hair Style', 'Hair Colour', 'Eye Colour', 'Eye Style', 'Eye Lashes']
	const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
	const [selectedTraits, setSelectedTraits] = useState<number[]>([])

	const updateCategory = () => {
		const categorySelect = document.getElementById('categorySelect') as HTMLSelectElement
		setSelectedCategoryIndex(categorySelect.selectedIndex)
	}

	const updateSelectedTraits = (categoryIndex: number, selectedIndex: number) => {
		const traits = [...selectedTraits]
		traits[categoryIndex] = selectedIndex
		setSelectedTraits(traits)
	}

	return (
		<div className={classes.container}>
			<select onChange={updateCategory} className={classes.tabs} id='categorySelect'>
				{
					categories.map((category, index) => (
						<option key={category} value={index}>{category}</option>
					))
				}
			</select>
			<div className={classes.thumbnails}>
				{	
					availableTraits.filter((traitCategory) => {
						return traitCategory.name === categories[selectedCategoryIndex]
					})[0].items.map((item, itemIndex) => (
						<div  className={itemIndex === selectedTraits[selectedCategoryIndex] ? classes.selected : ''} onClick={() => {
							updateSelectedTraits(selectedCategoryIndex, itemIndex)
						}}>
							<img src={`/assets/${categories[selectedCategoryIndex]}/${item}.png`}/>
							<p>{item}</p>
						</div>
					))
				}
			</div>
		</div>
	)
}

export default TraitSelector
