import {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from 'react'
import { Category } from '../../interface/availableTraits'
import { defaultPeep, Trait } from '../../interface/metadata'
import testDataTraits from '../../testData/traits.json'

interface CtxProps {
	metadata?: Trait[] | null
	setMetadata?: Dispatch<SetStateAction<Trait[] | null>>
	availableTraits?: Category[] | null
	setAvailableTraits?: Dispatch<SetStateAction<Category[] | null>>
}
interface Props {
	children: ReactNode
}

export const MetadataContext = createContext<CtxProps>({})
const MetadataContextProvider: FC<Props> = ({ children }) => {
	const [metadata, setMetadata] = useState<Trait[] | null>(defaultPeep)
	const [availableTraits, setAvailableTraits] = useState<Category[] | null>([])

	const getAvailableTraits = async () => {
		// FIXME - Get available traits from server
		// const results = await doFetch(`${host}/peep/traits`, 'GET')
		setAvailableTraits(testDataTraits as Category[])
	}

	useEffect(() => {
		getAvailableTraits()
	}, [])

	return (
		<MetadataContext.Provider
			value={{ metadata, setMetadata, availableTraits, setAvailableTraits }}
		>
			{children}
		</MetadataContext.Provider>
	)
}

export default MetadataContextProvider
