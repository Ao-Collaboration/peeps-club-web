import { ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button/Button'
import { host } from '../../config/api'
import { ProfileContext } from '../../context/Profile/ProfileContext'
import { Web3Context } from '../../context/Web3/Web3Context'
import doFetch from '../../utils/doFetch'

function Mint() {
	const [quantity, setQuantity] = useState(1)
	const [price, setPrice] = useState('')
	const [expires, setExpires] = useState(-1)
	const [isLoading, setIsLoading] = useState(false)
	const { profile } = useContext(ProfileContext)
	const { web3Provider } = useContext(Web3Context)

	if (!profile || !web3Provider) {
		return <></>
	}

	useEffect(() => {
		const getPrices = async () => {
			const req = {
				address: profile.address,
				quantity: quantity,
			}
			const results = await doFetch(`${host}/mint/passport/price/`, 'POST', req)
			setPrice(results.price)
			setExpires(results.expiry)
		}

		setIsLoading(true)
		getPrices()
		setIsLoading(false)
	}, [quantity])

	const formatExpires = (timestamp: number) => {
		const expiry: Date = new Date(timestamp * 1000)
		const now = new Date()
		const diff = expiry.valueOf() - now.valueOf()
		return diff / 1000 / 60 / 60 // hours
	}

	const updateQuantity = () => {
		const updatedQuantity = (
			document.getElementById('quantityInput') as HTMLInputElement
		).value
		setQuantity(parseInt(updatedQuantity))
	}

	return (
		<div>
			<input
				id="quantityInput"
				onChange={updateQuantity}
				type="number"
				defaultValue={1}
				min={1}
			></input>
			{price.length > 0 && expires > 0 && (
				<>
					<p>Price : {price}</p>
					<p>Expires in {formatExpires(expires)} hours</p>
					<Button
						onClick={() => {
							alert()
						}}
					>
						Mint {quantity} for {price} eth
					</Button>
				</>
			)}
		</div>
	)
}

export default Mint
