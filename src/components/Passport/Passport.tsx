import { useContext, useEffect, useState } from 'react'
import { host } from '../../config/api'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { CategoryName } from '../../interface/availableTraits'
import doFetch from '../../utils/doFetch'
import BirthdaySelector from './BirthdaySelector'
import useStyles from './Passport.styles'

const Passport: React.FC = () => {
	const { metadata, setMetadata, availableTraits, getSelectedTrait } =
		useContext(MetadataContext)
	const [peepImage, setPeepImage] = useState('')

	const classes = useStyles()

	if (!metadata || !setMetadata || !getSelectedTrait) {
		return <></>
	}

	useEffect(() => {
		getPeepImage()
	}, [metadata])

	const getPeepImage = async () => {
		const svg = await doFetch(
			`${host}/peep/`,
			'POST',
			{ attributes: metadata },
			'image/svg+xml',
		)
		setPeepImage(URL.createObjectURL(svg))
	}

	const getDistricts = () => {
		return availableTraits?.filter(item => {
			return item.category === 'District'
		})[0]
	}

	const updateTrait = (category: CategoryName, value: string) => {
		const updatedMetadata = [...metadata]
		updatedMetadata.forEach(trait => {
			if (trait.trait_type === category) {
				trait.value = value
			}
		})
		setMetadata(updatedMetadata)
	}

	const updateTraitViaInput = (category: CategoryName, id: string) => {
		const input = document.getElementById(id) as HTMLInputElement
		updateTrait(category, input.value)
	}

	return (
		<div className={classes.container}>
			<div>
				<p className={classes.text}>Passport</p>
				<div
					style={{ backgroundImage: `url(${peepImage})` }}
					className={classes.passportPhoto}
				></div>
			</div>
			<div className={classes.passportForm}>
				<h2 className={classes.title}>Peeps Club</h2>
				<div>
					<label>Name</label>
					<input
						type="text"
						id="nameInput"
						onBlur={() => {
							updateTraitViaInput('Name', 'nameInput')
						}}
					/>
				</div>
				<div>
					<label>District</label>
					<select
						onChange={() => {
							updateTraitViaInput('District', 'districtSelect')
						}}
						id="districtSelect"
						defaultValue={getSelectedTrait('District')}
					>
						{getDistricts()?.items.map(item => (
							<option key={item.name} value={item.name}>
								{item.name}
							</option>
						))}
					</select>
				</div>
				<div>
					<label>Pronouns</label>
					<select
						onChange={() => {
							updateTraitViaInput('Pronouns', 'pronounsSelect')
						}}
						id="pronounsSelect"
						defaultValue={getSelectedTrait('Pronouns')}
					>
						<option>He/Him</option>
						<option>She/Her</option>
						<option>They/Them</option>
					</select>
				</div>
				<BirthdaySelector
					onChange={birthday => {
						updateTrait('Birthday', birthday)
					}}
				/>
				<p>{'P<PC#####<####<######'}</p>
			</div>
		</div>
	)
}

export default Passport
