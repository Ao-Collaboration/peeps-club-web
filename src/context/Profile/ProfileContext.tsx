import {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
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

	return (
		<ProfileContext.Provider value={{ profile, setProfile }}>
			{children}
		</ProfileContext.Provider>
	)
}

export default ProfileContextProvider
