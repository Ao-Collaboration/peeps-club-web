import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
	AirplaneRoute,
	AnotherDeviceRoute,
	HomeRoute,
	ImmigrationGateRoute,
	ImmigrationIntroRoute,
	ImmigrationRoute,
	WardrobeRoute,
	YourPeepRoute,
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
import { ProfileContext } from '../context/Profile/ProfileContext'
import YourPeep from './YourPeep/YourPeep'
import AnotherDevice from './AnotherDevice/AnotherDevice'

function Router() {
	const { web3Provider } = useContext(Web3Context)
	const { profile } = useContext(ProfileContext)

	if (!web3Provider) {
		// Require wallet connection
		return (
			<BrowserRouter>
				<Header />
				<ConnectWallet />
			</BrowserRouter>
		)
	}
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path={HomeRoute.path} element={<Home />} />
					<Route path={AnotherDeviceRoute.path} element={<AnotherDevice />} />
					<Route path={YourPeepRoute.path} element={<YourPeep />} />
					{profile?.id && (
						<>
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
						</>
					)}
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default Router
