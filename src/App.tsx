import MetadataContextProvider from './context/Metadata/MetadataContext'
import Web3ContextProvider from './context/Web3/Web3Context'
import Router from './pages/Router'

function App() {
	return (
		<Web3ContextProvider>
			<MetadataContextProvider>
				<Router />
			</MetadataContextProvider>
		</Web3ContextProvider>
	)
}

export default App
