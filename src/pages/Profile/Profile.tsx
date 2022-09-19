import { ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { getPeepsContractId } from '../../config/contract'
import { Web3Context } from '../../context/Web3/Web3Context'
import doFetch from '../../utils/doFetch'
import peepsABI from '../../abi/peepsABI.json'
import useStyles from './Profile.styles'
import Button from '../../components/Button/Button'
import { host } from '../../config/api'
import Loading from '../../components/Loading/Loading'
import { useLocation } from 'react-router-dom'

interface propState {
	tokenId: number
}

function Profile() {
	const classes = useStyles()
	const [name, setName] = useState<string | null>(null)
	const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [svgText, setSvgText] = useState<string | null>(null)
	const [zoom, setZoom] = useState(500)
	const [isTransparent, setIsTransparent] = useState(false)

	const { tokenId } = useLocation().state as propState

	const { web3Provider } = useContext(Web3Context)
	const signer = web3Provider?.getSigner()
	const peepsContract = new ethers.Contract(
		getPeepsContractId(web3Provider?.network?.chainId),
		peepsABI,
		signer,
	)
	const centerX = 570
	const centerY = 450

	if (!web3Provider || !signer) {
		return <></>
	}

	useEffect(() => {
		const load = async () => {
			setIsLoading(true)


			const canvas = document.getElementById('canvas') as HTMLCanvasElement
			if(canvas){
				setCtx(canvas.getContext('2d'))
			}
			const uriLink = await peepsContract.tokenURI(tokenId)
			const uri = uriLink.split(/\/(\d+)/)[1]

			const metadata = await doFetch(`${host}/peep/${uri}.json`, 'GET')
			setName(metadata.name)

			const image = await doFetch(
				`${host}/peep/${uri}.svg`,
				'GET',
				null,
				'image/svg+xml',
			)
			const svgString = await image.text()
			setSvgText(svgString)

			setIsLoading(false)
		}
		load()
	}, [])

	useEffect(() => {
		drawToCanvas()
	}, [svgText, zoom, isTransparent])

	const drawToCanvas = () => {
		let svgString = svgText

		if (isTransparent) {
			// if transparent then use the inline svg but removing certain layers
			const svgElement = document.getElementById('svg5') as HTMLImageElement
			svgElement.querySelector('#Time')?.remove()
			svgElement.querySelector('#District')?.remove()
			svgString = new XMLSerializer().serializeToString(svgElement)
		}

		if (!svgString) {
			return
		}

		const imageElement = new Image()
		const svgBlob = new Blob([svgString], {
			type: 'image/svg+xml;charset=utf-8',
		})
		imageElement.src = URL.createObjectURL(svgBlob)
		imageElement.onload = () => {
			ctx?.clearRect(0, 0, 500, 500)
			ctx?.drawImage(
				imageElement,
				mmToPixel(centerX - zoom / 2),
				mmToPixel(centerY - zoom / 2),
				mmToPixel(zoom),
				mmToPixel(zoom),
				0,
				0,
				500,
				500,
			)
			imageElement.remove()
		}
	}

	const toggleBackground = (isTransparent: boolean) => {
		setIsTransparent(isTransparent)
	}

	const changeZoom = (zoomValue: number) => {
		setZoom(zoomValue)
	}

	const mmToPixel = (value: number) => {
		const dpi = 96
		const inch = value * 0.0393701
		return dpi * inch
	}

	const download = () => {
		const canvas = document.getElementById('canvas') as HTMLCanvasElement
		const dt = canvas.toDataURL('image/png')
		const aDownloadLink = document.createElement('a')
		aDownloadLink.download = `${name}_pfp.png`
		aDownloadLink.href = dt
		aDownloadLink.click()
	}

	return (
		<div className={classes.page}>
			{isLoading && <Loading />}
			<canvas
				id="canvas"
				height={500}
				width={500}
				className={`${classes.picture} ${!svgText && classes.hidden}`}
			/>
			<div
				id="hiddenSVG"
				className={classes.hidden}
				dangerouslySetInnerHTML={{ __html: svgText ?? '' }}
			/>
			{svgText && svgText.length > 0 && (
				<>
					<div className={classes.row}>
						<div className={classes.column}>
							<label htmlFor={'zoomLevel'}>Zoom</label>
							<input
								type="range"
								min="400"
								max="700"
								defaultValue={500}
								onChange={e => {
									changeZoom(Number(e.target.value))
								}}
								className={classes.slider}
								id="zoomLevel"
							/>
						</div>
						<div className={classes.column}>
							<label htmlFor={'isTransparent'}>Hide Background</label>
							<input
								type={'checkbox'}
								id="isTransparent"
								className={classes.checkbox}
								onChange={e => {
									toggleBackground(e.target.checked)
								}}
							/>
						</div>
					</div>

					<div className={classes.buttonRow}>
						<Button
							onClick={() => {
								history.back()
							}}
						>
							Back
						</Button>
						<Button onClick={download} className={'primary'}>
							Save
						</Button>
					</div>
				</>
			)}
		</div>
	)
}

export default Profile
