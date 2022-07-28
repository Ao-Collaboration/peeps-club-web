import { useContext } from 'react'

// import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'

import Button from './Button'
import { ethers } from 'ethers'
import { Web3Context } from '../../context/Web3/Web3Context'
import { ProfileContext } from '../../context/Profile/ProfileContext'
import { useNavigate } from 'react-router-dom'
import { HomeRoute } from '../../pages/routes'

// import { host } from '../../config/api'
// import doFetch from '../../utils/doFetch'

function ConnectButton() {
	const { account, setAccount, setWeb3Provider } = useContext(Web3Context)
	const { profile, setProfile } = useContext(ProfileContext)
	const navigate = useNavigate()
	if (!setAccount || !setWeb3Provider || !setProfile) {
		return <></>
	}

	const getWeb3Modal = async () =>
		new Web3Modal({
			network: 'mainnet',
			cacheProvider: false,
			providerOptions: {
				// walletconnect: {
				// 	package: WalletConnectProvider,
				// 	options: {
				// 		infuraId: '240248d1c65143c082ae6b411905d45a', //FIXME
				// 	},
				// },
			},
			disableInjectedProvider: false,
		})

	const connect = async () => {
		const web3Modal = await getWeb3Modal()
		await web3Modal.clearCachedProvider()
		const connection = await web3Modal.connect()
		const provider = new ethers.providers.Web3Provider(connection)
		const accounts = await provider.listAccounts()

		const addr = accounts[0]

		let name = null
		try {
			// ENS
			name = await provider.lookupAddress(addr)
		} catch (err) {
			// This is fine
			// console.log(err)
		}
		if (name) {
			setAccount(name)
		} else {
			setAccount(
				`${addr.substring(0, 5)}...${addr.substring(
					addr.length - 4,
					addr.length,
				)}`,
			)
		}

		if (profile) {
			if (profile.address !== addr) {
				setProfile({ address: addr })
				navigate(HomeRoute.path)
			}
		} else {
			setProfile({ address: addr })
		}
		setWeb3Provider(provider)
	}

	return (
		<Button onClick={connect} className="blue">
			{account || 'Connect Wallet'}
		</Button>
	)
}

export default ConnectButton
