import useStyles from './Airplane.styles'
import SVG from 'react-inlinesvg'

function Airplane() {
	const classes = useStyles()
	return (
		<div className={classes.airplaneBackground}>
			<div className={`${classes.cloud} ${classes.initialCloud}`}>
				<SVG src={'/assets/Cloud 1 Asset.svg'} />
			</div>
			<div className={`${classes.cloud} ${classes.firstCloud}`}>
				<SVG src={'/assets/Cloud 1 Asset.svg'} />
			</div>
			<div className={`${classes.cloud} ${classes.secondCloud}`}>
				<SVG src={'/assets/Cloud 2 Asset.svg'} />
			</div>
			<div className={`${classes.cloud} ${classes.thirdCloud}`}>
				<SVG src={'/assets/Cloud 3 Asset.svg'} />
			</div>
			<div className={`${classes.cloud} ${classes.fourthCloud}`}>
				<SVG src={'/assets/Cloud 4 Asset.svg'} />
			</div>
			<div className={classes.airplane}>
				<SVG src={'/assets/Plane Asset.svg'} />
			</div>
			<div className={classes.land}>
				<SVG src={'/assets/Cloud Button Asset.svg'} />
			</div>
		</div>
	)
}

export default Airplane
