import { black, translucent_white } from './colors'
import { headingFontFamily } from './jss-vars'

export const translucent_section = {
	background: translucent_white,
	padding: '0.8rem 2.5rem',
	borderRadius: '5rem',
	textAlign: 'center',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
}

export const mint_page_bg = {
	backgroundImage: 'url("assets/mint_bg.png")',
	backgroundSize: 'cover',
	minHeight: '100vh',
	width: '100vw',
	position: 'absolute',
	top: 0,
	zIndex: '-100',
	paddingTop: '50px',
	boxSizing: 'border-box',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
}

export const mint_title = {
	fontFamily: headingFontFamily,
	color: black,
	background: translucent_white,
	fontSize: '2.5rem',
	padding: '1rem 2.5rem',
	borderRadius: '5rem',
	margin: '0.5em',
	textAlign: 'center',
}

export const checklist = {
	composes: '$text',
	listStyle: 'none',
	textAlign: 'center',
	'& li:not(:last-child):after ': {
		content: '"✓"',
		padding: '0.5em',
	},
}
