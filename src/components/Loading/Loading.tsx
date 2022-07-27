import { defaultLoadingMessage } from '../../config/text'
import Spinner from '../Spinner/Spinner'

interface Props {
	hash?: string | null
}

const Loading: React.FC<Props> = ({ hash }) => {
	return (
		<>
			<Spinner />
			<p>
				{hash ? (
					<>
						Waiting for transaction... (
						<a href={`https://etherscan.io/tx/${hash}`} target="_blank">
							view
						</a>
						)
					</>
				) : (
					defaultLoadingMessage
				)}
			</p>
		</>
	)
}

export default Loading
