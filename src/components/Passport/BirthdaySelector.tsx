import { useContext, useEffect, useState } from 'react'
import useStyles from './BirthdaySelector.styles'

interface Props {
	onChange: (birthday: string) => void
}

const BirthdaySelector: React.FC<Props> = ({ onChange }) => {
	const classes = useStyles()
	const months = ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December']
	const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	const [daysInSelectedMonth, setDaysInSelectedMonth] = useState(31)


	const updateBirthday = () => {
		const daySelect = document.getElementById('daySelect') as HTMLSelectElement
		const monthSelect = document.getElementById('monthSelect') as HTMLSelectElement

		// no month selected yet, do nothing
		if(monthSelect.selectedIndex < 1){
			return
		}

		let day = parseInt(daySelect.value)
		const month = parseInt(monthSelect.value)

		if (day > daysInMonth[month]) {
			// not a valid day e.g. 31 February - set at highest allowable
			(document.getElementById('daySelect') as HTMLSelectElement).value = daysInMonth[month].toString() 
			day = daysInMonth[month]
		}
		setDaysInSelectedMonth(daysInMonth[month])
		const birthday = `${day} ${months[month]}`
		onChange(birthday)
	}

	useEffect(() => {
		updateBirthday()
	}, [])

	return (
		<div>
			<label>Birthday</label>
			<div className={classes.flexOverride}>
				<select id='daySelect' onChange={updateBirthday}>
					<option selected disabled hidden>Day</option>
					{
						[...Array(daysInSelectedMonth)].map((day, index) => (
							<option key={index} value={index + 1}>{index + 1}</option>
						))
					}
				</select>
				<select id='monthSelect' onChange={updateBirthday}>
					<option selected disabled hidden>Month</option>
					{
						months.map((month, index) => (
							<option key={index} value={index}>{month}</option>
						))
					}
				</select>
			</div>
		</div>
	)
}

export default BirthdaySelector