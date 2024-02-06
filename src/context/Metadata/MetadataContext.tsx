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
import { DEFAULT_PEEP, getTrait, Trait } from '../../interface/metadata'
import doFetch from '../../utils/doFetch'
import { ProfileContext } from '../Profile/ProfileContext'
import { ethers } from 'ethers'

interface CtxProps {
	metadata?: Trait[] | null
	setMetadata?: Dispatch<SetStateAction<Trait[] | null>>
	availableTraits?: Trait[] | null
	setAvailableTraits?: Dispatch<SetStateAction<Trait[] | null>>
	getSelectedTrait?: (category: string) => string | undefined
}
interface Props {
	children: ReactNode
}

export const MetadataContext = createContext<CtxProps>({})
const MetadataContextProvider: FC<Props> = ({ children }) => {
	const [metadata, setMetadata] = useState<Trait[] | null>([])
	const [availableTraits, setAvailableTraits] = useState<Trait[] | null>([])
	const { profile } = useContext(ProfileContext)

	const getAvailableTraits = async (address: string) => {
		const results = await doFetch(`${host}/peep/traits/${address}/`, 'GET')
		setAvailableTraits(results as Trait[])
	}

	const getSelectedTrait = (category: string) => {
		if (metadata) {
			return getTrait(metadata, category)
		}
	}

	useEffect(() => {
		// Default to address(0) when no wallet
		getAvailableTraits(profile?.address ?? ethers.constants.AddressZero)
	}, [profile])

	useEffect(() => {
		// load metadata from local storage if it exists
		const local = localStorage.getItem('metadata')
		if (local === null) {
			setMetadata([...DEFAULT_PEEP])
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
