import { BigNumber, BigNumberish, ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { getPeepsContractId, getTreatContractId } from '../../config/contract'
import { ProfileContext } from '../../context/Profile/ProfileContext'
import { Web3Context } from '../../context/Web3/Web3Context'
import treatABI from '../../abi/treatABI.json'
import peepsABI from '../../abi/peepsABI.json'
import useStyles from './Treat.styles'
import Spinner from '../../components/Spinner/Spinner'
import TreatMint from '../../components/TreatMint/TreatMint'
import Button from '../../components/Button/Button'

function Treat() {
	const classes = useStyles()
	const { profile, setProfile } = useContext(ProfileContext)
	const { web3Provider } = useContext(Web3Context)

	const [wantsTreat, setWantsTreat] = useState(false)

	const [isLoading, setIsLoading] = useState(false)
	const [canMint, setCanMint] = useState(false)
	const [peepId, setPeepId] = useState<BigNumberish | null>(null)
	const [price, setPrice] = useState<BigNumber | null>(null)

	const signer = web3Provider?.getSigner()

	if (!profile || !setProfile || !web3Provider || !signer) {
		return <></>
	}

	const treatContract = new ethers.Contract(
		getTreatContractId(web3Provider.network.chainId),
		treatABI,
		signer,
	)

	const initialiseState = async () => {
		if (profile?.address) {
			// Get peep id
			const peepsContract = new ethers.Contract(
				getPeepsContractId(web3Provider?.network?.chainId),
				peepsABI,
				signer,
			)
			try {
				setPeepId(await peepsContract.tokenOfOwnerByIndex(profile.address, 0))
			} catch (err) {
				// This is fine. No peep. Get price instead
				setPrice(await treatContract.getPrice())
			}

			// Check they can mint
			setCanMint(await treatContract.canMint())

			// Done
			setIsLoading(false)
		}
	}

	useEffect(() => {
		initialiseState()
	}, [profile])

	return (
		<div className={classes.page}>
			{wantsTreat ? (
				!isLoading ? (
					<>
						{canMint ? (
							<TreatMint
								treatContract={treatContract}
								peepId={peepId}
								price={price}
							/>
						) : (
							<p className={classes.text}>Out of Candy!</p>
						)}
					</>
				) : (
					<>
						<Spinner />
						<p className={classes.text}>Trick or Treat!</p>
					</>
				)
			) : (
				<div>
					<Button
						className="blue"
						onClick={() => {
							window.location.href =
								'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
						}}
					>
						Trick
					</Button>
					<span className={classes.text}> or </span>
					<Button
						className="blue"
						onClick={() => {
							setWantsTreat(true)
						}}
					>
						Treat
					</Button>
				</div>
			)}
		</div>
	)
}

export default Treat
