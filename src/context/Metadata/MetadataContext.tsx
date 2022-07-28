import {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react'
import { host } from '../../config/api'
import { Category, CategoryName } from '../../interface/availableTraits'
import { defaultPeep, Trait } from '../../interface/metadata'
import doFetch from '../../utils/doFetch'
import { ProfileContext } from '../Profile/ProfileContext'

interface CtxProps {
	metadata?: Trait[] | null
	setMetadata?: Dispatch<SetStateAction<Trait[] | null>>
	availableTraits?: Category[] | null
	setAvailableTraits?: Dispatch<SetStateAction<Category[] | null>>
	getSelectedTrait?: (category: CategoryName) => string | undefined
}
interface Props {
	children: ReactNode
}

export const MetadataContext = createContext<CtxProps>({})
const MetadataContextProvider: FC<Props> = ({ children }) => {
	const [metadata, setMetadata] = useState<Trait[] | null>([])
	const [availableTraits, setAvailableTraits] = useState<Category[] | null>([])
	const { profile } = useContext(ProfileContext)

	const getAvailableTraits = async (address: string) => {
		const results = await doFetch(`${host}/peep/traits/${address}/`, 'GET')
		setAvailableTraits(results as Category[])
	}

	const getSelectedTrait = (category: CategoryName) => {
		if (metadata) {
			return metadata.filter(trait => {
				return trait.trait_type === category
			})[0].value
		}
	}

	useEffect(() => {
		if (profile?.address) {
			getAvailableTraits(profile?.address)
		}
	}, [profile])

	useEffect(() => {
		// load metadata from local storage if it exists
		const local = localStorage.getItem('metadata')
		if (local === null) {
			setMetadata(JSON.parse(JSON.stringify(defaultPeep)))
		} else {
			setMetadata(JSON.parse(local))
		}
	}, [])

	useEffect(() => {
		if (metadata && metadata.length > 0) {
			localStorage.setItem('metadata', JSON.stringify(metadata))
		}
	}, [metadata])

	return (
		<MetadataContext.Provider
			value={{
				metadata,
				setMetadata,
				availableTraits,
				setAvailableTraits,
				getSelectedTrait,
			}}
		>
			{children}
		</MetadataContext.Provider>
	)
}

export default MetadataContextProvider
