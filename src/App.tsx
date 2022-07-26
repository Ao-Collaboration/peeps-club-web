import MetadataContextProvider from './context/Metadata/MetadataContext'
import ProfileContextProvider from './context/Profile/ProfileContext'
import Web3ContextProvider from './context/Web3/Web3Context'
import Router from './pages/Router'

function App() {
	return (
		<ProfileContextProvider>
			<Web3ContextProvider>
				<MetadataContextProvider>
					<Router />
				</MetadataContextProvider>
			</Web3ContextProvider>
		</ProfileContextProvider>
	)
}

export default App
