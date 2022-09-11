import { HashRouter, Route, Routes } from 'react-router-dom'
import {
	AirplaneRoute,
	HomeRoute,
	ImmigrationExitRoute,
	ImmigrationGateRoute,
	ImmigrationIntroRoute,
	ImmigrationRoute,
	MirrorPeepSelectRoute,
	MirrorRoute,
	PartyRoute,
	ProfileRoute,
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
import Party from './Party/Party'
import ImmigrationExit from './Immigration/ImmigrationExit'
import Mirror from './Mirror/Mirror'
import MirrorPeepSelect from './Mirror/MirrorPeepSelect'
import Profile from './Profile/Profile'

function Router() {
	const { web3Provider } = useContext(Web3Context)
	const { profile } = useContext(ProfileContext)

	if (!web3Provider) {
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
					<Route path={HomeRoute.path} element={<Home />} />
					<Route path={ProfileRoute.path} element={<Profile />} />
					<Route path={YourPeepRoute.path} element={<YourPeep />} />
					<Route path={PartyRoute.path} element={<Party />} />
					<Route
						path={MirrorPeepSelectRoute.path}
						element={<MirrorPeepSelect />}
					/>
					{profile?.id && (
						<>
							<Route path={AirplaneRoute.path} element={<Airplane />} />
							<Route path={ImmigrationRoute.path} element={<Immigration />} />
							<Route
								path={ImmigrationIntroRoute.path}
								element={<ImmigrationIntro />}
							/>
							<Route
								path={ImmigrationExitRoute.path}
								element={<ImmigrationExit />}
							/>
							<Route
								path={ImmigrationGateRoute.path}
								element={<ImmigrationGate />}
							/>
							<Route path={WardrobeRoute.path} element={<Wardrobe />} />
							<Route path={MirrorRoute.path} element={<Mirror />} />
						</>
					)}
				</Routes>
			</HashRouter>
		</>
	)
}

export default Router
