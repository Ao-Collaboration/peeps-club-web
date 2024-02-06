import { useContext } from 'react'

import Web3Modal from 'web3modal'

import useStyles from './ConnectButton.styles'
import Button, { ButtonClassNames } from './Button'
import { ethers } from 'ethers'
import { Web3Context } from '../../context/Web3/Web3Context'
import { ProfileContext } from '../../context/Profile/ProfileContext'
import { useNavigate } from 'react-router-dom'
import { HomeRoute } from '../../pages/routes'

interface Props {
	className?: ButtonClassNames
}

const ConnectButton: React.FC<Props> = ({ className = 'blue' }) => {
	const classes = useStyles()

	const { account, setAccount, setWeb3Provider, connectWithoutWeb3 } =
		useContext(Web3Context)
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

	const withoutWeb3 = async () => {
		setProfile({ address: ethers.constants.AddressZero })
		connectWithoutWeb3 && connectWithoutWeb3()
	}

	return (
		<div className={classes.verticalGroup}>
			<Button onClick={connect} className={className}>
				{account || 'Connect Wallet'}
			</Button>
			<Button onClick={withoutWeb3} className="link">
				Skip
			</Button>
		</div>
	)
}

export default ConnectButton
