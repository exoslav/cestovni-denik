import { openModal } from '../../modals'
import { isDeleteEventsBinded, setDeleteEvent } from './index'
import { renderGallery, setStoreNewsItemKey } from './helpers'
import { createPreloader } from '../../helpers'
import { deleteSingleNewItem, getSingleNewItem } from '../../../firebase'

export let actionList = {
	deleteItem,
	editItem,
	createGallery,
	openGallery
}

function deleteItem() {
	$('.admin-news-edit [data-type="delete"]').on('click', function() {
		createPreloader()

		deleteSingleNewItem($(this).closest('.admin-news-item').attr('data-db-key'))
	})
}

// modalni okno s vytvorenim nove galerie
function createGallery() {
	$('.create-gallery').on('click', e => {
		e.preventDefault()

		openModal({
			type: $(e.target).attr('data-type'),
			itemKey: $(e.target).closest('.admin-news-item').attr('data-db-key')
		})
	})
}

// otevre galerii kdyz jiz existuje u novinky
function openGallery() {
	$('.open-gallery').on('click', e => {
		e.preventDefault()

		let itemKey = $(e.target).closest('.admin-news-item').attr('data-db-key')

		$(renderGallery(itemKey)).appendTo($(e.target).closest('.admin-news-item-gallery'))
	})
}

function editItem() {
	$('.admin-news-edit [data-type="edit"]').on('click', function() {
		createPreloader()

		let itemKey = $(this).closest('.admin-news-item').attr('data-db-key')
		setStoreNewsItemKey(itemKey)

		let customFunction = data => {
			let content = data.val()
			content.submit = 'Změnit'
			openModal({
				type: 'edit-news-modal'
			},
			content)
		}

		let id = $(this).closest('.admin-news-item').attr('data-db-key')

		getSingleNewItem(id, customFunction)
	})
}
