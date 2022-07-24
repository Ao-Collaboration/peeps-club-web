import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { white } from '../../config/colors'
import useStyles, { ClassNames } from './Logo.styles'

interface Props {
	className?: ClassNames
}

const TwitterLogo: React.FC<Props> = ({ className }) => {
	const classes = useStyles()

	return (
		<FontAwesomeIcon
			style={{ color: white }}
			className={classes[className || 'default']}
			icon={faTwitter}
		/>
	)
}

export default TwitterLogo
