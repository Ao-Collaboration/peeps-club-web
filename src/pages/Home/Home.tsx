import { BigNumber, ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import { host } from '../../config/api'
import { passportContractId } from '../../config/contract'
import { ProfileContext } from '../../context/Profile/ProfileContext'
import { Web3Context } from '../../context/Web3/Web3Context'
import doFetch from '../../utils/doFetch'
import { AirplaneRoute } from '../routes'
import passportABI from '../../abi/passportABI.json'
import { SaleInfo } from '../../interface/saleInfo'
import MintPublic from '../../components/Mint/MintPublic'
import MintSigned from '../../components/Mint/MintSigned'
import { defaultLoadingMessage } from '../../config/text'
import useStyles from './Home.styles'
import Spinner from '../../components/Spinner/Spinner'

type ScreenType = 'walletConnect' | 'passportCheck' | 'mint'

function Home() {
	const classes = useStyles()
	const { profile, setProfile } = useContext(ProfileContext)
	const { web3Provider } = useContext(Web3Context)

	const [isLoading, setIsLoading] = useState(false)
	const [saleInfo, setSaleInfo] = useState<SaleInfo | null>(null)
	const [isPublicSaleActive, setPublicSaleActive] = useState(false)
	const [publicTokensLeft, setPublicTokensLeft] = useState(0)
	const [passportsOwned, setPassportsOwned] = useState(0)
	const [screen, setScreen] = useState<ScreenType>('passportCheck')

	const navigate = useNavigate()
	const signer = web3Provider?.getSigner()
	const passportContract = new ethers.Contract(
		passportContractId,
		passportABI,
		signer,
	)

	if (!profile || !setProfile || !web3Provider || !signer) {
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

		const signature = await signer.signMessage(message)

		await confirmOwnership(signature)
	}

	const getSaleInfo = async () => {
		setIsLoading(true)
		const saleInfo = new SaleInfo(await passportContract.saleInfo())
		setSaleInfo(saleInfo)

		const now = Math.floor(Date.now() / 1000)
		setPublicSaleActive(saleInfo.endTimestamp > now)
		setPublicTokensLeft(saleInfo.maxMint - saleInfo.totalMinted)

		setIsLoading(false)
	}

	const getOwnsPassport = async () => {
		setScreen('passportCheck')
		const tokenCount = await passportContract.balanceOf(
			await signer.getAddress(),
			0,
		)
		if (tokenCount > 0) {
			await getMessage()
			setPassportsOwned(tokenCount)
		}
	}

	const getRemainingTime = () => {
		if (!saleInfo?.endTimestamp) {
			return
		}
		const left = saleInfo.endTimestamp - Math.floor(Date.now() / 1000)
		const hours = Math.floor(left / 60 / 60)
		const minutes = Math.floor((left - hours * 60 * 60) / 60)

		return `${hours}h ${minutes}m`
	}

	const getPreMintDisplay = () => {
		return (
			<>
				<h2 className={classes.title}>PEEPS AIRLINE BOARDING NOW</h2>
				<p className={classes.text}>Gates close in {getRemainingTime()}</p>
				<ul className={classes.list}>
					<li>Oven switched Off</li>
					<li>Keys</li>
					<li>Luggage</li>
					<li>Ticket</li>
					<li>Phew... Wallet</li>
					<strong>PASSPORT?!</strong>
				</ul>
				<div className={classes.buttonGroup}>
					<Button
						onClick={() => {
							setScreen('mint')
						}}
						className="blue"
					>
						Purchase Passport
					</Button>
					{passportsOwned > 0 && (
						<Button onClick={signMessage} className="blue">
							{passportsOwned.toString()} Passports Ready!
						</Button>
					)}
				</div>
			</>
		)
	}

	const getMintDisplay = () => {
		return (
			<>
				{!isLoading ? (
					<>
						{isPublicSaleActive && saleInfo ? (
							<MintPublic
								txLimit={saleInfo.txLimit}
								tokensLeft={publicTokensLeft}
								price={BigNumber.from(saleInfo.tokenPrice)}
								onMint={getOwnsPassport}
								endTimestamp={saleInfo.endTimestamp}
							/>
						) : (
							<MintSigned onMint={getOwnsPassport} />
						)}
					</>
				) : (
					<>
						<Spinner />
						<p>{defaultLoadingMessage}</p>
					</>
				)}
			</>
		)
	}

	const getScreen = () => {
		switch (screen) {
		case 'passportCheck':
			return getPreMintDisplay()
			break
		case 'mint':
			return getMintDisplay()
			break
		}
	}

	useEffect(() => {
		getSaleInfo()
		getOwnsPassport()
	}, [])

	return <div className={classes.page}>{getScreen()}</div>
}

export default Home
