import { Category } from '../../interface/traits'
import useStyles from './TraitSelector.styles'

interface Props {
	availableTraits: Category[],
}

const TraitSelector: React.FC<Props> = ({ availableTraits }) => {
	const classes = useStyles()

	// 
	return (
		// availableTraits.
		<div className={classes.container}>
			{
				availableTraits.map((category)=> (
					<div key={category.name}>
						<h2>{category.name}</h2>
						{
							category.items.map((item)=> (
								<p key={item.name}>{item.name}</p>
							))
						}
					</div>
				))
			}
		</div>
	)
}

export default TraitSelector
