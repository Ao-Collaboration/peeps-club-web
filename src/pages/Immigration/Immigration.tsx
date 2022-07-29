import { useContext, useState } from 'react'
import FadeTo from '../../components/Scene/FadeTo'
import { black } from '../../config/colors'
import { MetadataContext } from '../../context/Metadata/MetadataContext'
import useStyles from './Immigration.styles'
import TraitSelector from '../../components/Trait/TraitSelector'
import Passport from '../../components/Passport/Passport'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { ImmigrationExitRoute, WardrobeRoute } from '../routes'
import { useMediaQuery } from 'react-responsive'
import { tableOrMobileQuery } from '../../utils/mediaQuery'

function Immigration() {
	const classes = useStyles()
	const { metadata, setMetadata, availableTraits } = useContext(MetadataContext)
	const [isFlipped, setIsFlipped] = useState(false)
	const [isFadeOut, setIsFadeOut] = useState(false)

	const navigate = useNavigate()

	if (!metadata || !setMetadata || !availableTraits) {
		return <></>
	}

	const isTabletOrMobile = useMediaQuery({ query: tableOrMobileQuery })

	const completePassport = () => {
		const form = document.getElementById('passportForm') as HTMLFormElement
		if (form.reportValidity()) {
			setIsFlipped(true)
			setInterval(() => {
				setIsFadeOut(true)
			}, 3000)
		}
	}

	const moveToClothing = () => {
		if (isFlipped) {
			navigate(ImmigrationExitRoute.path)
		}
	}

	const finishButton = (
		<div className={classes.buttonGroup}>
			{!isFlipped && (
				<Button onClick={completePassport} className="primary">
					Finished
				</Button>
			)}
		</div>
	)

	return (
		<div className={classes.background}>
			<FadeTo
				onAnimationEnd={moveToClothing}
				color={black}
				isFadeOut={isFadeOut}
				isFading={true}
			/>
			<div
				className={classes.pageLarge}
				aria-description="You walk towards the immigration gates"
			>
				{isFlipped && (
					<>
						<img
							aria-hidden
							className={`${classes.arm} ${classes.stampPosition} ${classes.stampArmAnimation}`}
							src={'/assets/stamp_arm.svg'}
						/>
						<img
							aria-hidden
							className={`${classes.stamp} ${classes.stampPosition} ${classes.stampAnimation}`}
							src={'/assets/stamp.svg'}
						/>
					</>
				)}
				<div
					className={
						isTabletOrMobile
							? classes.passportSmall
							: `${classes.passport} ${classes.pullUpPassportAnimation}`
					}
				>
					<div
						className={
							isTabletOrMobile
								? classes.passportContainerSmall
								: classes.passportContainer
						}
					>
						<img aria-hidden src={'/assets/passport_top.svg'} />
						<img
							aria-hidden
							id="pageToFlip"
							className={`${classes.pageToFlip} ${
								isFlipped && classes.flipAnimation
							}`}
							src={'/assets/passport_page.svg'}
						/>
						<div className={classes.bottom}>
							<img aria-hidden src={'/assets/passport_mid.svg'} />
							{metadata && (
								<Passport
									finishButton={isTabletOrMobile ? finishButton : null}
								/>
							)}
						</div>
						{!isTabletOrMobile && finishButton}
						{!isTabletOrMobile && (
							<img
								aria-hidden
								className={classes.hands}
								src={'/assets/passport_hands.svg'}
							/>
						)}
					</div>
				</div>
			</div>
			<div>
				{availableTraits && (
					<div
						className={`${
							isTabletOrMobile
								? classes.traitsContainerSmall
								: classes.traitsContainer
						} ${isFlipped && classes.squashTraitsAnimation}`}
					>
						<TraitSelector availableTraits={availableTraits} />
					</div>
				)}
			</div>
		</div>
	)
}

export default Immigration
