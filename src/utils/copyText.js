export const copyText = async (text) => {
	try {
		await navigator.clipboard.writeText(text)
		return true
	} catch (error) {
		return false
	}
}
