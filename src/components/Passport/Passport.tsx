import { useContext, useEffect, useState } from 'react'
import { host } from '../../config/api'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import doFetch from '../../utils/doFetch'
import useStyles from './Passport.styles'

const Passport: React.FC = () => {
	const {metadata, setMetadata} = useContext(MetadataContext)
	const [peepImage, setPeepImage] = useState('/assets/examplePeep.svg')

	const classes = useStyles(peepImage)

	if(!metadata || !setMetadata){
		return <></>
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
					<select>
						<option>Mountains</option>
						<option>Beach</option>
						<option>Forest</option>
					</select>
				</div>
				<div>
					<label>Pronouns</label>
					<select>
						<option>They/Them</option>
						<option>She/Her</option>
						<option>He/Him</option>
						<option>Ask me</option>
					</select>
				</div>
				<div>
					<label>Birthday</label>
					<input type='date' />
				</div>
				<p onClick={() => {alert(JSON.stringify(metadata))}}>{'P<PC#####<####<######'}</p>
			</div>
		</div>
	)
}

export default Passport
