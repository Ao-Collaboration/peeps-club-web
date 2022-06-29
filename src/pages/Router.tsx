import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
	AirplaneRoute,
	HomeRoute,
	ImmigrationGateRoute,
	ImmigrationIntroRoute,
	ImmigrationRoute,
	WardrobeRoute,
} from './routes'
import Home from './Home/Home'
import Airplane from './Airplane/Airplane'
import Immigration from './Immigration/Immigration'
import { useContext } from 'react'
import { Web3Context } from '../context/Web3/Web3Context'
import ConnectWallet from './ConnectWallet/ConnectWallet'
import Header from '../components/Header/Header'
import Wardrobe from './Wardrobe/Wardrobe'
import ImmigrationIntro from './Immigration/ImmigrationIntro'
import ImmigrationGate from './Immigration/ImmigrationGate'

function Router() {
	const { web3Provider } = useContext(Web3Context)

	if (!web3Provider) {
		// Require wallet connection
		return <ConnectWallet />
	}
	return (
		<>
			<Header />
			<BrowserRouter>
				<Routes>
					<Route path={HomeRoute.path} element={<Home />} />
					<Route path={AirplaneRoute.path} element={<Airplane />} />
					<Route path={ImmigrationRoute.path} element={<Immigration />} />
					<Route
						path={ImmigrationIntroRoute.path}
						element={<ImmigrationIntro />}
					/>
					<Route
						path={ImmigrationGateRoute.path}
						element={<ImmigrationGate />}
					/>
					<Route path={WardrobeRoute.path} element={<Wardrobe />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default Router
