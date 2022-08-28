import { useContext, useEffect, useState } from 'react'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { Web3Context } from '../../context/Web3/Web3Context'
import { defaultPeep, getTrait } from '../../interface/metadata'
import useStyles from './YourPeep.styles'
import { ProfileContext } from '../../context/Profile/ProfileContext'
import doFetch from '../../utils/doFetch'
import { host } from '../../config/api'
import { Link, useLocation } from 'react-router-dom'
import { HomeRoute } from '../routes'
import TwitterLogo from '../../components/Logo/TwitterLogo'
import DiscordLogo from '../../components/Logo/DiscordLogo'
import { greetings } from '../../config/text'

interface propState {
	uri: string
	isUpdate: boolean
}

const YourPeep = () => {
	const classes = useStyles()
	const { metadata, setMetadata } = useContext(MetadataContext)
	const { web3Provider } = useContext(Web3Context)
	const { profile, setProfile } = useContext(ProfileContext)
	const [yourPeepImage, setYourPeepImage] = useState('')
	const [milkyGreeting, setMilkyGreeting] = useState('Aloha')
	const [jonoGreeting, setJonoGreeting] = useState('Ciao')
	const [grannyGreeting, setGrannyGreeting] = useState('Hello')
	const [officerGreeting, setOfficerGreeting] = useState('Bonjour!')

	if (
		!metadata ||
		!setMetadata ||
		!web3Provider ||
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
	const { uri, isUpdate } = useLocation().state as propState

	const changePhrase = (setGreeting: (text: string) => void) => {
		setGreeting(getRandomGreeting())
	}

	useEffect(() => {
		const getYourPeep = async () => {
			if (uri) {
				const peepImage = await getPeepFromURI(uri)
				setYourPeepImage(peepImage)

				// reset metadata in case they want to mint another
				setMetadata(JSON.parse(JSON.stringify(defaultPeep)))
				setProfile({ address: profile.address })
			}
		}
		getYourPeep()
	}, [])

	const getPeepFromURI = async (peepURI: string) => {
		const svg = await doFetch(
			`${host}/peep/${peepURI}.svg`,
			'GET',
			undefined,
			'image/svg+xml',
		)
		return URL.createObjectURL(svg)
	}

	return (
		<div className={classes.page}>
			<h2 className={classes.title}>
				{isUpdate ? 'You look amazing' : 'Welcome to Peeps Club'}
				{getTrait(metadata, 'Name')}!!
			</h2>
			<img className={classes.peepImage} src={yourPeepImage} />
			{isUpdate && (
				<p className={classes.text}>
					Don't forget to <strong>refresh your metadata</strong> on Opensea!
				</p>
			)}
			<div className={classes.buttonGroup}>
				<Link className={classes.button} to={HomeRoute.path}>
					Mint another?
				</Link>
				<span className={classes.enlarge}>Come join us at...</span>
				<a
					href="https://discord.gg/peepsclub"
					target="_blank"
					className={classes.link}
				>
					<DiscordLogo className="default" />
				</a>
				<a
					href="https://twitter.com/Peeps_Club"
					target="_blank"
					className={classes.link}
				>
					<TwitterLogo className="default" />
				</a>
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
