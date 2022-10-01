export const formatRemainingTime = (endTimestamp: number) => {
	const left = endTimestamp - Math.floor(Date.now() / 1000)
	let hours = Math.floor(left / 60 / 60)
	const days = Math.floor(hours / 24)
	const minutes = Math.floor((left - hours * 60 * 60) / 60)
	hours -= days * 24

	if (days > 0) {
		return `${days}d ${hours}h ${minutes}m`
	}

	return `${hours}h ${minutes}m`
}
