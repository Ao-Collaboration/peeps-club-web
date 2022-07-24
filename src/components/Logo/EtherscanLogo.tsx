import useStyles, { ClassNames } from './Logo.styles'

const { PUBLIC_URL } = process.env

interface Props {
	className?: ClassNames
}

const EtherscanLogo: React.FC<Props> = ({ className }) => {
	const classes = useStyles()

	return (
		<img
			className={classes[className || 'default']}
			src={`${PUBLIC_URL}/assets/logo_etherscan.webp`}
			alt="Etherscan Logo"
		/>
	)
}

export default EtherscanLogo
