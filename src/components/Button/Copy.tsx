import { useState } from 'react'
import useStyles from './Copy.styles'

export interface Props {
	text: string
}

const Copy: React.FC<Props> = ({ text }) => {
	const classes = useStyles()
	const [copyText, setCopyText] = useState('Copy')

	const copyToClipboard = () => {
		setCopyText('Copied')
		navigator.clipboard.writeText(text)
		setTimeout(() => {
			setCopyText('Copy')
		}, 500)
	}

	return (
		<div className={classes.copyContainer}>
			<span>{text}</span>
			<button className={classes.copyButton} onClick={copyToClipboard}>
				{copyText}
			</button>
		</div>
	)
}

export default Copy
