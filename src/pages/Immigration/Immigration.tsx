import { Link } from 'react-router-dom'
import { HomeRoute } from '../routes'
import FadeTo from '../../components/Scene/FadeTo'
import { black } from '../../config/colors'

function Immigration() {
	return (
		<>
			<FadeTo color={black} isFadeOut={false} isFading={true} />
			<Link to={`${HomeRoute.path}`}>Start</Link>
		</>
	)
}

export default Immigration
