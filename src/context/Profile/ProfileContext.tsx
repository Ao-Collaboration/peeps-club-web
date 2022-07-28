import {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from 'react'
import { Profile } from '../../interface/profile'

interface CtxProps {
	profile?: Profile | null
	setProfile?: Dispatch<SetStateAction<Profile | null>>
}
interface Props {
	children: ReactNode
}

export const ProfileContext = createContext<CtxProps>({})
const ProfileContextProvider: FC<Props> = ({ children }) => {
	const [profile, setProfile] = useState<Profile | null>(null)

	useEffect(() => {
		// load metadata from local storage if it exists
		const local = localStorage.getItem('profile')
		if (local !== null) {
			setProfile(JSON.parse(local))
		}
	}, [])

	useEffect(() => {
		if (profile) {
			localStorage.setItem('profile', JSON.stringify(profile))
		}
	}, [profile])

	return (
		<ProfileContext.Provider value={{ profile, setProfile }}>
			{children}
		</ProfileContext.Provider>
	)
}

export default ProfileContextProvider
