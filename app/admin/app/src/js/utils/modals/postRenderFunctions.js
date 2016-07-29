import { preLoader } from '../templates'
import { storeNewsItemKey } from '../render/news-list/helpers'
import { db, storage, createNewsItem, editNewsItem, getSingleNewItem, updateSingleNewsItem } from '../../firebase'

export let postRenderFunctions = {
	editNews,
	createNews,
	createGallery
}

function createNews() {
	// optiony k itemu v galrii
	let opts = {
		gallery: {}
	}
	$('#news-modal-submit').on('click', e => {
		e.preventDefault()

		$(preLoader).appendTo('body')

		$('.modal-window-content input').each((index, item) => {
			let val = $(item).val()

			if($(item).attr('data-type') === 'date')
				opts['dateStamp'] = -createTimeStamp($(item).val()) // je zaporny kvuli vypisu z firebase

			opts[$(item).attr('data-type')] = val
		})

		createNewsItem(opts)
	})
}

function editNews() {
	$('#news-modal-submit').on('click', e => {
		e.preventDefault()
		let opts = {}

		$(preLoader).appendTo('body')

		$('.modal-window-content input').each((index, item) => {
			let val = $(item).val()

			if($(item).attr('data-type') === 'date')
				opts['dateStamp'] = -createTimeStamp($(item).val()) // je zaporny kvuli vypisu z firebase

			opts[$(item).attr('data-type')] = val
		})

		editNewsItem(opts, storeNewsItemKey)
	})
}

function createGallery(itemKey) {
	let form = $('#create-gallery-form'),
			input = form.find('input[type="file"]')

	form.on('submit', e => {
		e.preventDefault()

		let files = input.prop('files'),
				storageRef = storage.ref()

		Object.keys(files).forEach(key => {
      let uploadTask = storageRef.child(`images/news/${itemKey}/${files[key].name}`).put(files[key])

      uploadTask.on('state_changed', null, error => {
        console.error('Upload failed:', error)
      }, () => {
				console.log(uploadTask.snapshot)
				let url = uploadTask.snapshot.metadata.downloadURLs[0],
						name = uploadTask.snapshot.metadata.name.replace(/\.[^/.]+$/, "")

				firebase.database().ref(`news/${itemKey}/gallery/${name}`).set({
					url
				})
      })
		})

		// zabrani v odeslani formulare
		return false
	})
}

function createTimeStamp(dateFromInput) {
	let date = new Date(),
			currentDate = `${dateFromInput}`.split(".")
			// currentDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`.split("-")

	return new Date(`${currentDate[1]}/${currentDate[0]}/${currentDate[2]}`).getTime()
}
