import MetadataContextProvider from './context/Metadata/MetadataContext'
import ProfileContextProvider from './context/Profile/ProfileContext'
import Web3ContextProvider from './context/Web3/Web3Context'
import Router from './pages/Router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TOAST_THEME } from './config/colors'

function App() {
	return (
		<ProfileContextProvider>
			<Web3ContextProvider>
				<MetadataContextProvider>
					<Router />
					<ToastContainer
						theme={TOAST_THEME}
						position="top-center"
						autoClose={5000}
						pauseOnFocusLoss={false}
						draggable={false}
					/>
				</MetadataContextProvider>
			</Web3ContextProvider>
		</ProfileContextProvider>
	)
}

export default App
