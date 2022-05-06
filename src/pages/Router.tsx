import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomeRoute } from './routes'
import Home from './Home/Home'
import { useContext } from 'react'
import { Web3Context } from '../context/Web3/Web3Context'
import ConnectWallet from './ConnectWallet/ConnectWallet'
import Header from '../components/Header/Header'

function Router() {
	const { web3Provider } = useContext(Web3Context)

	if (!web3Provider) {
		// Require wallet connection
		return (<ConnectWallet />)
	}
	return (
		<>
			<Header />
			<BrowserRouter>
				<Routes>
					<Route path={HomeRoute.path} element={<Home />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default Router
