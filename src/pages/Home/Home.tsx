import { Link } from 'react-router-dom'
import { AirplaneRoute } from '../routes'

function Home() {
	return (
		<>
			<Link to={`${AirplaneRoute.path}`}>Start</Link>
		</>
	)
}

export default Home
