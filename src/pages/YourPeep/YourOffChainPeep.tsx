import { useContext, useEffect, useState } from 'react'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { DEFAULT_PEEP, getTrait } from '../../interface/metadata'
import useStyles from './YourOffChainPeep.styles'
import { ProfileContext } from '../../context/Profile/ProfileContext'
import doFetch from '../../utils/doFetch'
import { host } from '../../config/api'
import { Link, useLocation } from 'react-router-dom'
import { HomeRoute } from '../routes'
import { greetings } from '../../config/text'
import Copy from '../../components/Button/Copy'

interface propState {
	uri: string
	isUpdate: boolean
}

const YourPeep = () => {
	const classes = useStyles()
	const { metadata, setMetadata } = useContext(MetadataContext)
	const { profile, setProfile } = useContext(ProfileContext)
	const [yourPeepImage, setYourPeepImage] = useState('')
	const [milkyGreeting, setMilkyGreeting] = useState('Aloha')
	const [jonoGreeting, setJonoGreeting] = useState('Ciao')
	const [grannyGreeting, setGrannyGreeting] = useState('Hello')
	const [officerGreeting, setOfficerGreeting] = useState('Bonjour!')

	if (
		!metadata ||
		!setMetadata ||
		!profile ||
		!setProfile ||
		!useLocation().state
	) {
		return <></>
	}

	const getRandomGreeting = () => {
		const i = Math.floor(Math.random() * greetings.length)
		return greetings[i]
	}
	const { uri } = useLocation().state as propState

	const changePhrase = (setGreeting: (text: string) => void) => {
		setGreeting(getRandomGreeting())
	}

	useEffect(() => {
		const getYourPeep = async () => {
			if (uri) {
				const peepImage = await getPeepFromURI(uri)
				setYourPeepImage(peepImage)

				// reset metadata in case they want to mint another
				setMetadata([...DEFAULT_PEEP])
				setProfile({ address: profile.address })
			}
		}
		getYourPeep()
	}, [])

	const getPeepFromURI = async (peepURI: string) => {
		const svg = await doFetch(
			`${host}/peep/${peepURI}.svg?offchain=true`,
			'GET',
			undefined,
			'image/svg+xml',
		)
		return URL.createObjectURL(svg)
	}

	return (
		<div className={classes.page}>
			<h2 className={classes.title}>
				You look amazing
				{getTrait(metadata, 'Name')}!!
			</h2>
			<img className={classes.peepImage} src={yourPeepImage} />
			<div>
				<p>Your Peep's ID is important, keep it safe.</p>
				<Copy text={uri} />
			</div>
			<div className={classes.buttonGroup}>
				<Link className={classes.button} to={HomeRoute.path}>
					Make Another?
				</Link>
			</div>

			<div className={classes.milky}>
				{milkyGreeting.length > 0 && (
					<div
						className={`${classes.bubbleLeft} ${classes.fadeInAndOut1}`}
						onAnimationIteration={() => {
							changePhrase(setMilkyGreeting)
						}}
					>
						{milkyGreeting}
					</div>
				)}
				<img className={classes.guestPeep} src={'/assets/Milky.svg'} />
			</div>
			<div className={classes.jono}>
				{jonoGreeting.length > 0 && (
					<div
						className={`${classes.bubbleLeft} ${classes.fadeInAndOut2}`}
						onAnimationIteration={() => {
							changePhrase(setJonoGreeting)
						}}
					>
						{jonoGreeting}
					</div>
				)}
				<img className={classes.guestPeep} src={'/assets/Jono.svg'} />
			</div>
			<div className={classes.granny}>
				{grannyGreeting.length > 0 && (
					<div
						className={`${classes.bubbleRight} ${classes.fadeInAndOut3}`}
						onAnimationIteration={() => {
							changePhrase(setGrannyGreeting)
						}}
					>
						{grannyGreeting}
					</div>
				)}
				<img className={classes.guestPeep} src={'/assets/Granny Peep.svg'} />
			</div>
			<div className={classes.officer}>
				{officerGreeting.length > 0 && (
					<div
						className={`${classes.bubbleRight} ${classes.fadeInAndOut4}`}
						onAnimationIteration={() => {
							changePhrase(setOfficerGreeting)
						}}
					>
						{officerGreeting}
					</div>
				)}
				<img className={classes.guestPeep} src={'/assets/Officer.svg'} />
			</div>
		</div>
	)
}

export default YourPeep
