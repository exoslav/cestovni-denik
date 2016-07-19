import { preLoader } from '../templates'
import { db, storage, createNewsItem, getSingleNewItem, updateSingleNewsItem } from '../../firebase'

export let postRenderFunctions = {
	createNews,
	createGallery
}

function createNews() {
	// optiony k itemu v galrii
	let opts = {
		gallery: {}
	}
	$('#create-new-story').on('click', e => {
		e.preventDefault()

		$(preLoader).appendTo('body')

		$('.modal-window-content input').each((index, item) => {
			opts[$(item).attr('data-type')] = $(item).val()
		})

		createNewsItem(opts)
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
