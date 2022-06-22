import {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useState,
} from 'react'
import { defaultPeep, Trait } from '../../interface/metadata'
interface CtxProps {
	metadata?: Trait[] | null
	setMetadata?: Dispatch<SetStateAction<Trait[] | null>>
}
interface Props {
	children: ReactNode
}

export const MetadataContext = createContext<CtxProps>({})
const MetadataContextProvider: FC<Props> = ({ children }) => {
	const [metadata, setMetadata] = useState<Trait[] | null>(defaultPeep)

	return (
		<MetadataContext.Provider value={{ metadata, setMetadata }}>
			{children}
		</MetadataContext.Provider>
	)
}

export default MetadataContextProvider
