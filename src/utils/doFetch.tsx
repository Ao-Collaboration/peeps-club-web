type Mimetypes  = 'image/svg+xml'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const doFetch = async (path: string, method: string, body?: any, mimetype?:Mimetypes) => {
	const res = await fetch(path, {
		method: method,
		body: body && JSON.stringify(body),
		credentials: 'omit',
		headers: {
			'Content-Type': method !== 'GET' ? 'application/json' : 'text/plain',
			'Accept': mimetype || 'application/json'
		}
	})
	let data
	if(mimetype === 'image/svg+xml'){
		data = await res.text()
	} else {
		data = await res.json()
	}

	return data
}

export default doFetch
