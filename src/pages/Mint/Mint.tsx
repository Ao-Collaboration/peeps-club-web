import { BigNumber, ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { passportContractId } from '../../config/contract'
import { Web3Context } from '../../context/Web3/Web3Context'
import passportABI from '../../abi/passportABI.json'
import { SaleInfo } from '../../interface/saleInfo'
import MintPublic from '../../components/Mint/MintPublic'
import MintSigned from '../../components/Mint/MintSigned'
import { defaultLoadingMessage } from '../../config/text'

function Mint() {
	const [isLoading, setIsLoading] = useState(false)
	const [saleInfo, setSaleInfo] = useState<SaleInfo | null>(null)
	const [isPublicSaleActive, setPublicSaleActive] = useState(false)
	const [publicTokensLeft, setPublicTokensLeft] = useState(0)
	const { web3Provider } = useContext(Web3Context)

	const signer = web3Provider?.getSigner()
	const passportContract = new ethers.Contract(
		passportContractId,
		passportABI,
		signer,
	)

	if (!web3Provider) {
		return <></>
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

	useEffect(() => {
		getSaleInfo()
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
						/>
					) : (
						<MintSigned />
					)}
				</div>
			) : (
				<p>{defaultLoadingMessage}</p>
			)}
		</>
	)
}

export default Mint
