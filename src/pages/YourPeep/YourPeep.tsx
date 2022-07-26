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

	if (!metadata || !web3Provider || !profile || !profile.id) {
		return <></>
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
				<span>or come join us at...</span>
				<a href="https://twitter.com/Peeps_Club" className={classes.link}>
					<TwitterLogo className="small" />
				</a>
				<a href="https://discord.gg/peepsclub" className={classes.link}>
					<DiscordLogo className="small" />
				</a>
			</div>
		</div>
	)
}

export default YourPeep
