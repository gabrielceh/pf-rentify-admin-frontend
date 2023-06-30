async function encodeFileAsBase64URL(file) {
	return new Promise((resolve) => {
		const reader = new FileReader()
		reader.addEventListener('loadend', () => {
			resolve(reader.result)
		})
		reader.readAsDataURL(file)
	})
}

export const getImageToShow = async (file) => {
	const url = await encodeFileAsBase64URL(file)
	return url
}
