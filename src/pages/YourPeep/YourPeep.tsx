import { useContext, useEffect, useState } from 'react'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import { Web3Context } from '../../context/Web3/Web3Context'
import { DEFAULT_PEEP, getTrait } from '../../interface/metadata'
import useStyles from './YourPeep.styles'
import { ProfileContext } from '../../context/Profile/ProfileContext'
import doFetch from '../../utils/doFetch'
import { host } from '../../config/api'
import { Link, useLocation } from 'react-router-dom'
import { HomeRoute } from '../routes'
import TwitterLogo from '../../components/Logo/TwitterLogo'
import DiscordLogo from '../../components/Logo/DiscordLogo'
import { CreatedPeep } from '../../interface/createdPeep'
import BouncingPeep from '../../components/Scene/BouncingPeep'

const YourPeep = () => {
	const classes = useStyles()
	const { metadata, setMetadata } = useContext(MetadataContext)
	const { web3Provider } = useContext(Web3Context)
	const { profile, setProfile } = useContext(ProfileContext)
	const [yourPeepImage, setYourPeepImage] = useState('')

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

	const { uri, isUpdate } = useLocation().state as CreatedPeep

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
				<BouncingPeep
					fadeClass={classes.fadeInAndOut1}
					initialGreeting="Aloha"
					isBubbleFlipped={true}
					svgPath="/assets/Milky.svg"
				/>
			</div>
			<div className={classes.jono}>
				<BouncingPeep
					fadeClass={classes.fadeInAndOut2}
					initialGreeting="Ciao"
					isBubbleFlipped={true}
					svgPath="/assets/Jono.svg"
				/>
			</div>
			<div className={classes.granny}>
				<BouncingPeep
					fadeClass={classes.fadeInAndOut3}
					initialGreeting="Bonjour!"
					isBubbleFlipped={false}
					svgPath="/assets/Granny Peep.svg"
				/>
			</div>
			<div className={classes.officer}>
				<BouncingPeep
					fadeClass={classes.fadeInAndOut4}
					initialGreeting="Hello"
					isBubbleFlipped={false}
					svgPath="/assets/Officer.svg"
				/>
			</div>
		</div>
	)
}

export default YourPeep
