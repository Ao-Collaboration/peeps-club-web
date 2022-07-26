import MetadataContextProvider from './context/Metadata/MetadataContext'
import ProfileContextProvider from './context/Profile/ProfileContext'
import Web3ContextProvider from './context/Web3/Web3Context'
import Router from './pages/Router'

function App() {
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
