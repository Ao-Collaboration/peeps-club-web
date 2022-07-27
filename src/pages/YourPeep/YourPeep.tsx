import { useContext, useEffect, useState } from 'react'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { Web3Context } from '../../context/Web3/Web3Context'
import { getTrait } from '../../interface/metadata'
import useStyles from './YourPeep.styles'
import { ProfileContext } from '../../context/Profile/ProfileContext'
import doFetch from '../../utils/doFetch'
import { host } from '../../config/api'
import { Link } from 'react-router-dom'
import { HomeRoute } from '../routes'
import TwitterLogo from '../../components/Logo/TwitterLogo'
import DiscordLogo from '../../components/Logo/DiscordLogo'

const YourPeep = () => {
	const classes = useStyles()
	const { metadata } = useContext(MetadataContext)
	const { web3Provider } = useContext(Web3Context)
	const { profile } = useContext(ProfileContext)
	const [yourPeepImage, setYourPeepImage] = useState('')
	const [milkyGreeting, setMilkyGreeting] = useState('Aloha')
	const [jonoGreeting, setJonoGreeting] = useState('Ciao')
	const [grannyGreeting, setGrannyGreeting] = useState('Hello')
	const [officerGreeting, setOfficerGreeting] = useState('Bonjour!')

	const greetings = [
		'Ahoy',
		'Meow',
		'What\'s Shakin\'',
		'Hello',
		'Hey',
		'Welcome',
		'Hi',
		'\'Ello',
		'Greetings',
		'Hi There',
		'Bonjour',
		'Hola',
		'Ciao',
		'Olá',
		'Kia Ora',
		'G’day',
		'Geia',
		'Zdravo',
		'Privet',
		'Nǐ hǎo',
		'Namaste',
		'Merhaba',
		'Kon’nichiwa',
		'Anyeong Haseyo',
		'Ahoj',
		'Guten tag',
		'Hallo',
		'Cześć',
		'S̄wạs̄dī',
		'Cheers',
		'Szia',
		'Ahoj',
		'Salve',
		'Talofa',
		'Haló',
		'Hola',
		'Hallo',
		'Mirë dita',
		'Marhabaa',
		'salam',
		'Салам',
		'ታዲያስ',
		'مرحبا',
		'Kaixo',
		'নমস্কার',
		'Zdravo',
		'Oi',
		'Demat',
		'Здравейте',
		'Moni',
		'Hej',
		'Tere',
		'Salaam',
		'Bula',
		'Kamusta',
		'Aloha',
		'Halo',
		'Hai',
		'안녕',
		'こんにちは',
		'你好',
		'Chào bạn',
		'Helo',
		'Hallá',
	]

	if (!metadata || !web3Provider || !profile || !profile.id) {
		return <></>
	}

	const getRandomGreeting = () => {
		const i = Math.floor(Math.random() * greetings.length)
		return greetings[i]
	}

	const changePhrase = (setGreeting: (text: string) => void) => {
		setGreeting(getRandomGreeting())
	}

	useEffect(() => {
		const getYourPeep = async () => {
			if (profile?.id) {
				const peepImage = await getPeepFromURI(profile.id)
				setYourPeepImage(peepImage)
			}
		}
		getYourPeep()
	}, [])

	const getPeepFromURI = async (peepURI: string) => {
		const svg = await doFetch(
			`${host}/peep/${peepURI}.svg/`,
			'GET',
			undefined,
			'image/svg+xml',
		)
		return URL.createObjectURL(svg)
	}

	return (
		<div className={classes.page}>
			<h2 className={classes.title}>
				Welcome to Peeps Club, {getTrait(metadata, 'Name')}!!
			</h2>
			<img className={classes.peepImage} src={yourPeepImage} />
			<div className={classes.buttonGroup}>
				<Link className={classes.button} to={HomeRoute.path}>
					Mint another?
				</Link>
				<span>come join us at...</span>
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
