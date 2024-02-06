import { useContext, useEffect, useState } from 'react'
import { host } from '../../config/api'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { ProfileContext } from '../../context/Profile/ProfileContext'
import { getTopDescription, traitsToMetadata } from '../../interface/metadata'
import doFetch from '../../utils/doFetch'
import BirthdaySelector from './BirthdaySelector'
import useStyles from './Passport.styles'

interface Props {
	finishButton: React.ReactElement | null
}

const Passport: React.FC<Props> = ({ finishButton }) => {
	const { metadata, setMetadata, availableTraits, getSelectedTrait } =
		useContext(MetadataContext)
	const { profile } = useContext(ProfileContext)
	const [peepImage, setPeepImage] = useState('')

	const classes = useStyles()

	if (!metadata || !setMetadata || !getSelectedTrait || !profile) {
		return <></>
	}

	useEffect(() => {
		getPeepImage()
	}, [metadata])

	const getPeepImage = async () => {
		const svg = await doFetch(
			`${host}/peep/`,
			'POST',
			{ attributes: traitsToMetadata(metadata) },
			'image/svg+xml',
		)
		setPeepImage(URL.createObjectURL(svg))
	}

	const districts =
		availableTraits?.filter(t => t.categories?.includes('District')) ?? []

	const updateTrait = (category: string, value: string) => {
		const updatedMetadata = metadata.filter(
			t => !t.categories?.includes(category),
		)
		const trait = availableTraits?.find(t => t.name === value)
		if (trait) {
			updatedMetadata.push(trait)
		} else {
			// Name, birthday, pronouns, other non-defined traits
			updatedMetadata.push({
				name: value,
				categories: [category],
			})
		}
		setMetadata(updatedMetadata)
	}

	const updateTraitViaInput = (category: string, id: string) => {
		const input = document.getElementById(id) as HTMLInputElement
		updateTrait(category, input.value)
	}

	const getPassportCode = () => {
		if (!profile.id) {
			return 'P<PC#####<####<######'
		}
		// 5 4 10
		const id = profile.id?.toString()
		const l = id.length
		let code = 'P<PC<'
		code += id.slice(l - 19, l - 19 + 5)
		code += '<'
		code += id.slice(l - 14, l - 14 + 4)
		code += '<'
		code += id.slice(-10)
		code += '<'
		return code
	}

	return (
		<div className={classes.container}>
			<div>
				<p className={classes.text}>Passport</p>
				<div
					title={getTopDescription(metadata)}
					aria-label={getTopDescription(metadata)}
					style={{ backgroundImage: `url(${peepImage})` }}
					className={classes.passportPhoto}
				></div>
			</div>
			<form id="passportForm" className={classes.passportForm}>
				<h2 className={classes.title}>Peeps Club</h2>
				<div>
					<label>Name</label>
					<input
						type="text"
						id="nameInput"
						required
						onBlur={() => {
							updateTraitViaInput('Name', 'nameInput')
						}}
					/>
				</div>
				<div>
					<label>District</label>
					<select
						required
						onChange={() => {
							updateTraitViaInput('District', 'districtSelect')
						}}
						id="districtSelect"
						defaultValue={getSelectedTrait('District')}
					>
						{districts.map(t => (
							<option key={t.name} value={t.name}>
								{t.name}
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
						required
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
				{finishButton ? (
					finishButton
				) : (
					<p aria-label="Passport Number" className={classes.mono}>
						{getPassportCode()}
					</p>
				)}
			</form>
		</div>
	)
}

export default Passport
