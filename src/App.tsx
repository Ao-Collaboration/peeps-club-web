import Web3ContextProvider from './context/Web3/Web3Context'
import Router from './pages/Router'

function App() {
	return (
		<Web3ContextProvider>
			<Router />
		</Web3ContextProvider>
	)
}

export default App
