import { useContext, useEffect, useState } from 'react'
import { host } from '../../config/api'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { CategoryName } from '../../interface/availableTraits'
import doFetch from '../../utils/doFetch'
import useStyles from './Passport.styles'

const Passport: React.FC = () => {
	const {metadata, setMetadata, availableTraits} = useContext(MetadataContext)
	const [peepImage, setPeepImage] = useState('')

	const classes = useStyles(peepImage)

	if(!metadata || !setMetadata){
		return <></>
	}

	const getDistricts = () => {
		return availableTraits?.filter(item => { return item.category === 'District'})[0]
	}

	const getTrait = (category: CategoryName) => {
		return metadata.filter( item => {
			return category === item.trait_type
		})[0]
	}

	const updateTrait = (category: CategoryName, selectId: string) => {
		const select = (document.getElementById(selectId) as HTMLSelectElement)
		const updatedMetadata = [...metadata]
		updatedMetadata.forEach(trait => {
			if(trait.trait_type === category){
				trait.value = select.value
			}
		})
		setMetadata(updatedMetadata)
	}

	const getPeepImage = async() => {
		const svg = await doFetch(`${host}/peep/`, 'POST', {attributes: metadata}, 'image/svg+xml')
		setPeepImage(URL.createObjectURL(svg))
	}
	
	useEffect(()=> {
		getPeepImage()
	},[metadata])

	return (
		<div className={classes.container}>
			<div>
				<p className={classes.text}>Passport</p>
				<div className={classes.passportPhoto}></div>
			</div>
			<div className={classes.passportForm}>
				<h2 className={classes.title}>Peeps Club</h2>
				<div>
					<label>Name</label>
					<input type='text' />
				</div>
				<div>
					<label>District</label>
					<select onChange={() =>{updateTrait('District', 'districtSelect')}} id='districtSelect'>
						{
							getDistricts()?.items.map(item => (
								<option key={item.name} value={item.name} selected={getTrait('District').value === item.name}>{item.name}</option>
							))
						}
					</select>
				</div>
				<div>
					<label>Pronouns</label>
					<select onChange={() =>{updateTrait('Pronouns', 'pronounsSelect')}} id='pronounsSelect'>
						<option>He/Him</option>
						<option>She/Her</option>
						<option>They/Them</option>
					</select>
				</div>
				<div>
					<label>Birthday</label>
					<input type='date' />
				</div>
				<p>{'P<PC#####<####<######'}</p>
			</div>
		</div>
	)
}

export default Passport
