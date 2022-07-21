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

function Home() {
	const { profile, setProfile } = useContext(ProfileContext)
	const { web3Provider } = useContext(Web3Context)

	const [isLoading, setIsLoading] = useState(false)
	const [saleInfo, setSaleInfo] = useState<SaleInfo | null>(null)
	const [isPublicSaleActive, setPublicSaleActive] = useState(false)
	const [publicTokensLeft, setPublicTokensLeft] = useState(0)
	const [ownsPassport, setOwnsPassport] = useState(false)

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
		const tokenCount = await passportContract.balanceOf(
			await signer.getAddress(),
			0,
		)
		if (tokenCount > 0) {
			await getMessage()
			setOwnsPassport(true)
		}
	}

	useEffect(() => {
		getSaleInfo()
		getOwnsPassport()
	}, [])

	return (
		<>
			{!isLoading ? (
				<div>
					{isPublicSaleActive && saleInfo ? (
						<MintPublic
							txLimit={saleInfo.txLimit}
							tokensLeft={publicTokensLeft}
							price={BigNumber.from(saleInfo.tokenPrice)}
							onMint={getOwnsPassport}
						/>
					) : (
						<MintSigned onMint={getOwnsPassport} />
					)}
				</div>
			) : (
				<p>{defaultLoadingMessage}</p>
			)}

			{ownsPassport && (
				<Button onClick={signMessage}>
					I have a passport, let's make a peep!
				</Button>
			)}
		</>
	)
}

export default Home
