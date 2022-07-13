import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import { host } from '../../config/api'
import { ProfileContext } from '../../context/Profile/ProfileContext'
import { Web3Context } from '../../context/Web3/Web3Context'
import doFetch from '../../utils/doFetch'
import { AirplaneRoute, MintRoute } from '../routes'

function Home() {
	const { profile, setProfile } = useContext(ProfileContext)
	const { web3Provider } = useContext(Web3Context)

	const navigate = useNavigate()

	if (!profile || !setProfile || !web3Provider) {
		return <></>
	}

	const getMessage = async () => {
		const response = await doFetch(
			`${host}/passport/message/${profile.address}/`,
			'GET',
		)
		return response.message
	}

	const confirmOwnership = async (signature: string) => {
		const req = { signature: signature }
		const response = await doFetch(
			`${host}/passport/sign/${profile.address}/`,
			'POST',
			req,
		)
		const p = { ...profile }
		p.id = response.id
		setProfile(p)
		navigate(AirplaneRoute.path)
	}

	const signMessage = async () => {
		const message = await getMessage()
		const signer = web3Provider.getSigner()

		const signature = await signer.signMessage(message)

		await confirmOwnership(signature)
	}

	useEffect(() => {
		getMessage()
	}, [])

	return (
		<>
			<Button onClick={signMessage}>
				I have a passport, let's make a peep!
			</Button>

			<Link to={MintRoute.path}>Mint a passport</Link>
		</>
	)
}

export default Home
