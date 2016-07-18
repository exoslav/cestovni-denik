import { preLoader } from '../templates'
import { createNewsItem, storage } from '../../firebase'

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
		e.preventDefault()

		let files = input.prop('files')

		Object.keys(files).forEach(key => {
      let uploadTask = storage.ref().child(`images/news/${itemKey}/${files[key].name}`).put(files[key]);

      uploadTask.on('state_changed', null, function(error) {
        console.error('Upload failed:', error);
      }, function() {
        var url = uploadTask.snapshot.metadata.downloadURLs[0];
        console.log('File available at', url);
      });
		})

		// zabrani v odeslani formulare
		return false
	})
}
