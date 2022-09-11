import { ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { getPeepsContractId } from '../../config/contract'
import { Web3Context } from '../../context/Web3/Web3Context'
import peepsABI from '../../abi/peepsABI.json'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import { MirrorPeepSelectRoute } from '../../pages/routes'

interface Props {
	address: string
}

const UpdatePeepButton: React.FC<Props> = ({ address }) => {
	const { web3Provider } = useContext(Web3Context)
	const [hasAPeep, setHasAPeep] = useState(false)
	const navigate = useNavigate()

	if (!web3Provider) {
		return <></>
	}

	const signer = web3Provider.getSigner()
	const peepContract = new ethers.Contract(
		getPeepsContractId(web3Provider.network?.chainId),
		peepsABI,
		signer,
	)

	useEffect(() => {
		const getNumTokens = async () => {
			const numTokens: number = await peepContract.balanceOf(address)
			if (numTokens > 0) {
				setHasAPeep(true)
			}
		}

		getNumTokens()
	}, [])

	const toPeepSelect = () => {
		navigate(MirrorPeepSelectRoute.path)
	}

	return (
		<>
			{hasAPeep && (
				<Button onClick={toPeepSelect} className={'blue'}>
					My Peeps
				</Button>
			)}
		</>
	)
}

export default UpdatePeepButton
