type Mimetypes = 'image/svg+xml'

const doFetch = async (
	path: string,
	method: string,
	body?: any, // eslint-disable-line @typescript-eslint/no-explicit-any
	mimetype?: Mimetypes,
) => {
	const options: RequestInit = {
		mode: 'cors',
		method: method,
		body: body && JSON.stringify(body),
		headers: {
			Accept: mimetype || 'application/json',
		},
	}
	if (method !== 'GET') {
		options.headers = { ...options.headers, 'Content-Type': 'application/json' }
	}
	const res = await fetch(path, options)
	let data
	if (mimetype === 'image/svg+xml') {
		data = await res.blob()
	} else {
		data = await res.json()
	}

	return data
}

export default doFetch
