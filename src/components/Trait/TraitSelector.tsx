import { faAngleLeft, faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { Category } from '../../interface/availableTraits'
import useStyles from './TraitSelector.styles'

interface Props {
	availableTraits: Category[],
}

const TraitSelector: React.FC<Props> = ({ availableTraits }) => {
	const classes = useStyles()
	const categories = ['Skin Condition', 'Skin', 'Facial Hair', 'Hair', 'Hair Colour', 'Eye Colour', 'Eye Style', 'Eye Outline']
	const categoryExampleImages = ['Asymmetric Vitiligo', 'Almond', 'Moustache', 'Twin Braids', 'Mid Brown', 'Blue', 'Bow', 'Eyelashes']
	const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1)

	const {metadata, setMetadata} = useContext(MetadataContext)

	if(!metadata || !setMetadata){
		return <></>
	}

	const updateCategory = (index: number) => {
		setSelectedCategoryIndex(index)
	}

	const updateSelectedTraits = (categoryIndex: number, name : string) => {
		const updatedMetadata = [...metadata]
		updatedMetadata.forEach(traitItem => {
			if(traitItem.trait_type === categories[categoryIndex]){
				traitItem.value = name
			}
		})
		setMetadata(updatedMetadata)
	}

	const getSelectedTrait = (category: string) => {
		return metadata.filter((trait) => {
			return trait.trait_type === category
		})[0].value
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
							<div key={category} onClick={() => {
								updateCategory(index)
							}}>
								<img src={`/assets/${category}/${categoryExampleImages[index]}.png`}/>
								<p>{category}</p>
							</div>
						)) 
						:
						availableTraits.filter((traitCategory) => {
							return traitCategory.category === categories[selectedCategoryIndex]
						})[0].items.map((item) => (
							<div key={item.name} className={item.name === getSelectedTrait(categories[selectedCategoryIndex]) ? classes.selected : ''} onClick={() => {
								updateSelectedTraits(selectedCategoryIndex, item.name)
							}}>
								<img src={`/assets/${categories[selectedCategoryIndex]}/${item.name}.png`}/>
								<p>{item.name}</p>
							</div>
						))
				}
			</div>
		</div>
	)
}

export default TraitSelector
