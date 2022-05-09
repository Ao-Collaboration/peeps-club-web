import { Link } from 'react-router-dom'
import { HomeRoute } from '../routes'
import FadeTo from '../../components/Scene/FadeTo'
import { black } from '../../config/colors'
import { useLocation } from 'react-router-dom'
import { TraitState } from '../../interface/TraitState'

function Immigration() {
	const location = useLocation()
	const state = location.state as TraitState

	return (
		<>
			<FadeTo color={black} isFadeOut={false} isFading={true} />
			<Link to={`${HomeRoute.path}`}>Start</Link>
			<p>Background - {state.backgroundColor}</p>
		</>
	)
}

export default Immigration
