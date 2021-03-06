import { lngs } from '../../../constants'
import { storage } from '../../../firebase'
import { setGallery, galleryStorage } from './helpers'
import { actionList } from './actions'
import { callFunctionsInObject, checkAsyncFirebase } from '../../helpers'

export let isDeleteEventsBinded = false

export let renderNewsList = data => {
	let selector = 'admin-news',
			news = data,
			el = $('<ul/>', {
				class: 'collapsible popout collapsible-accordion'
			})

	$(`#${selector}`).empty()

	Object.keys(news).forEach(key => {
		let newsType = news[key].type === 1 ? 'nz' : 'aust'

		let newPost = `
			<li
				class="admin-news-item"
				data-db-key="${news[key].key}"
				id="admin-news-item-${news[key].id}"
			>
				<div class="collapsible-header">
					<img class="admin-news-icon" src="../src/imgs/${newsType}-icon.png">
					<h3>
						${news[key].header} ${news[key].date}
					</h3>
				</div>

				<div class="admin-news-edit">
					<button data-type="edit" class="waves-effect waves-light btn" type="button">
						<i class="material-icons">mode_edit</i>
					</button>
					<button data-type="delete" class="waves-effect waves-light btn" type="button">
						<i class="material-icons">delete</i>
					</button>
				</div>`

			newPost += `
				<div class="collapsible-body">
					<div class="admin-news-item-content">
						${news[key].desc}
					</div>

					<div class="admin-news-item-gallery">`

			if(typeof news[key].gallery === 'undefined')
				newPost += `
						<button class="create-gallery waves-effect waves-light btn" data-type="create-news-item-gallery" type="button">Vytvořit galerii</button>`
			else {
				setGallery(news[key].key, news[key].gallery)
				newPost += `
						<button class="open-gallery waves-effect waves-light btn" data-type="create-news-item-gallery" type="button">Otevřít galerii</button>`
			}
			newPost += `</div></div></li>`

		$(newPost).appendTo(el)
	})

  $(`.${selector}-preloader`).remove()

  $('<h2/>', {
  	text: lngs.admin.ourStories
  }).appendTo(`#${selector}`)
  $('<a/>', {
  	id: 'new-story',
		class: 'waves-effect waves-light btn modal-trigger',
		'data-modal-type': 'create-news-modal',
		href: '#modal1',
  	text: 'nový příběh'
  }).appendTo(`#${selector}`)

	$(el).appendTo(`#${selector}`)

	callFunctionsInObject(actionList)

	$(document).ready(() => {
	  $('.collapsible').collapsible({
	    accordion : false
	  })
	})

	checkAsyncFirebase()
}
