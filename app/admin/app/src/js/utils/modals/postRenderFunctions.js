import { preLoader } from '../templates'
import { storage, createNewsItem, getSingleNewItem, updateSingleNewsItem } from '../../firebase'

export let postRenderFunctions = {
	createNews,
	createGallery
}

function createNews() {
	let opts = {
		gallery: false
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
	console.log(itemKey)
	let form = $('#create-gallery-form'),
			input = form.find('input[type="file"]')

	form.on('submit', e => {

		updateSingleNewsItem(itemKey)

		e.preventDefault()
		return false
		alert('test')
		let files = input.prop('files')
		let storageRef = storage.ref()

		Object.keys(files).forEach(key => {
      let uploadTask = storageRef.child(`images/news/${itemKey}/${files[key].name}`).put(files[key]);

      uploadTask.on('state_changed', null, error => {
        console.error('Upload failed:', error);
      }, () => {
				var url = uploadTask.snapshot.metadata.downloadURLs[0];
				getSingleNewItem(itemKey, () => console.log(url))
        // console.log('File available at', url);
      });
		})

		// zabrani v odeslani formulare
		return false
	})
}
