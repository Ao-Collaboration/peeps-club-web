import MetadataContextProvider from './context/Metadata/MetadataContext'
import ProfileContextProvider from './context/Profile/ProfileContext'
import Web3ContextProvider from './context/Web3/Web3Context'
import Router from './pages/Router'
import ReactGA from 'react-ga'
import { TRACKING_ID } from './config/jss-vars'

function App() {
	ReactGA.initialize(TRACKING_ID)
	ReactGA.pageview(window.location.pathname + window.location.search)
	return (
		<Web3ContextProvider>
			<MetadataContextProvider>
				<ProfileContextProvider>
					<Router />
				</ProfileContextProvider>
			</MetadataContextProvider>
		</Web3ContextProvider>
	)
}

export default App
