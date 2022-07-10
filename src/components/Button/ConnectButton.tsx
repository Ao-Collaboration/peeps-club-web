import { useContext } from 'react'

// import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'

import Button from './Button'
import { ethers } from 'ethers'
import { Web3Context } from '../../context/Web3/Web3Context'
import { ProfileContext } from '../../context/Profile/ProfileContext'

// import { host } from '../../config/api'
// import doFetch from '../../utils/doFetch'

function ConnectButton() {
	const { account, setAccount, setWeb3Provider } = useContext(Web3Context)
	const { setProfile } = useContext(ProfileContext)
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

		try {
			const name = await provider.lookupAddress(addr)
			if (name) {
				setAccount(name)
				return
			}
		} catch (err) {
			// This is fine
			// console.log(err)
		}

		setProfile({ address: addr })

		setAccount(
			`${addr.substring(0, 5)}...${addr.substring(
				addr.length - 4,
				addr.length,
			)}`,
		)
		setWeb3Provider(provider)
	}

	return (
		<Button onClick={connect} className="primary">
			{account || 'Connect Wallet'}
		</Button>
	)
}

export default ConnectButton
