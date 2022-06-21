import { faAngleLeft, faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Category } from '../../interface/traits'
import useStyles from './TraitSelector.styles'

interface Props {
	availableTraits: Category[],
}

const TraitSelector: React.FC<Props> = ({ availableTraits }) => {
	const classes = useStyles()
	const categories = ['Skin Condition', 'Skin Tone', 'Facial Hair', 'Hair Style', 'Hair Colour', 'Eye Colour', 'Eye Style', 'Eye Lashes']
	const categoryExampleImages = ['Asymmetric Vitiligo', 'Almond', 'Moustache', 'Twin Braids', 'Mid Brown', 'Blue', 'Bow', 'Eyelashes']
	const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1)
	const [selectedTraits, setSelectedTraits] = useState<number[]>([])

	const updateCategory = (index: number) => {
		setSelectedCategoryIndex(index)
	}

	const updateSelectedTraits = (categoryIndex: number, selectedIndex: number) => {
		const traits = [...selectedTraits]
		traits[categoryIndex] = selectedIndex
		setSelectedTraits(traits)
	}

	return (
		<div className={classes.container}>
			<div className={classes.tabs}>
				{
					selectedCategoryIndex < 0 ?
						<p>Customise Peep</p> :
						<>
							<button onClick={() => {setSelectedCategoryIndex(-1)}}><FontAwesomeIcon icon={faAngleLeft}/></button><p> {categories[selectedCategoryIndex]} </p>
						</>
				}
			</div>
			<div className={classes.thumbnails}>
				{	
					selectedCategoryIndex < 0  
						?
						categories.map((category, index) => (
							<div onClick={() => {
								updateCategory(index)
							}}>
								<img src={`/assets/${category}/${categoryExampleImages[index]}.png`}/>
								<p>{category}</p>
							</div>
						)) 
						:
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
