import {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useState,
} from 'react'
import { defaultPeepMetadata, Metadata } from '../../interface/metadata'
interface CtxProps {
	metadata?: Metadata | null
	setMetadata?: Dispatch<SetStateAction<Metadata | null>>
}
interface Props {
	children: ReactNode
}

export const MetadataContext = createContext<CtxProps>({})
const MetadataContextProvider: FC<Props> = ({ children }) => {
	const [metadata, setMetadata] = useState<Metadata | null>(defaultPeepMetadata)

	return (
		<MetadataContext.Provider value={{ metadata, setMetadata }}>
			{children}
		</MetadataContext.Provider>
	)
}

export default MetadataContextProvider