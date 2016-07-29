// uklada vsechny galerie a jejich itemy do tohoto objektu, ze ktereho potom vytahujeme konkretni galerii, kdyz ji otevirame
export let galleryStorage = {}

// uklada konkretni galerii do storage
export let setGallery = (key, data) => galleryStorage[key] = data

// rendruje galerii (vytahne si ji z galleryStorage), vraci blok s obrazky
export let renderGallery = (itemKey) => {
	let block = ''
	Object.keys(galleryStorage[itemKey]).forEach(key => {
		block += `
			<div>
				${key}
			</div>
			<img src="${galleryStorage[itemKey][key].url}">`
	})

	return block
}

export let storeNewsItemKey = ''
export let setStoreNewsItemKey = key => storeNewsItemKey = key
