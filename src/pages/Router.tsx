import { HashRouter, Route, Routes } from 'react-router-dom'
import * as paths from './routes'
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
import YourPeep from './YourPeep/YourPeep'
import Party from './Party/Party'
import ImmigrationExit from './Immigration/ImmigrationExit'
import Mirror from './Mirror/Mirror'
import MirrorPeepSelect from './Mirror/MirrorPeepSelect'
import Profile from './Profile/Profile'

function Router() {
	const { connected } = useContext(Web3Context)

	if (!connected) {
		// Require wallet connection
		return (
			<HashRouter>
				<Header />
				<ConnectWallet />
			</HashRouter>
		)
	}
	return (
		<>
			<HashRouter>
				<Header />
				<Routes>
					<Route path={paths.HomeRoute.path} element={<Home />} />
					<Route path={paths.ProfileRoute.path} element={<Profile />} />
					<Route path={paths.YourPeepRoute.path} element={<YourPeep />} />
					<Route path={paths.PartyRoute.path} element={<Party />} />
					<Route
						path={paths.MirrorPeepSelectRoute.path}
						element={<MirrorPeepSelect />}
					/>
					<Route path={paths.AirplaneRoute.path} element={<Airplane />} />
					<Route path={paths.ImmigrationRoute.path} element={<Immigration />} />
					<Route
						path={paths.ImmigrationIntroRoute.path}
						element={<ImmigrationIntro />}
					/>
					<Route
						path={paths.ImmigrationExitRoute.path}
						element={<ImmigrationExit />}
					/>
					<Route
						path={paths.ImmigrationGateRoute.path}
						element={<ImmigrationGate />}
					/>
					<Route path={paths.WardrobeRoute.path} element={<Wardrobe />} />
					<Route path={paths.MirrorRoute.path} element={<Mirror />} />
				</Routes>
			</HashRouter>
		</>
	)
}

export default Router
