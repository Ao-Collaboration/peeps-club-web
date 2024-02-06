import {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useState,
} from 'react'
import { Web3Provider } from '@ethersproject/providers'

interface CtxProps {
	connected: boolean
	account?: string | null
	setAccount?: Dispatch<SetStateAction<string | null>>
	web3Provider?: Web3Provider | null
	setWeb3Provider?: Dispatch<SetStateAction<Web3Provider | null>>
	connectWithoutWeb3?: () => void
}
interface Props {
	children: ReactNode
}

export const Web3Context = createContext<CtxProps>({ connected: false })
const Web3ContextProvider: FC<Props> = ({ children }) => {
	const [account, setAccount] = useState<string | null>(null)
	const [web3Provider, setWeb3Provider] = useState<Web3Provider | null>(null)
	const [connected, setConnected] = useState<boolean>(false)

	const useSetWeb3Provider: Dispatch<
		SetStateAction<Web3Provider | null>
	> = provider => {
		setConnected(!!provider)
		setWeb3Provider(provider)
	}

	const connectWithoutWeb3 = () => {
		setConnected(true)
	}

	return (
		<Web3Context.Provider
			value={{
				connected,
				account,
				setAccount,
				web3Provider,
				setWeb3Provider: useSetWeb3Provider,
				connectWithoutWeb3,
			}}
		>
			{children}
		</Web3Context.Provider>
	)
}

export default Web3ContextProvider
