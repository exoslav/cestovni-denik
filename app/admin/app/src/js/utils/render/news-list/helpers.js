export let renderGallery = (gallery) => {
	let block = ''
	Object.keys(gallery).forEach(key => {
		block += `
			<div>
				${key}
			</div>
			<img src="${gallery[key].url}">`
	})

	return block
}
