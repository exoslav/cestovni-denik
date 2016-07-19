import { openModal } from '../../modals'
import { isDeleteEventsBinded, setDeleteEvent } from './index'
import { createPreloader } from '../../helpers'
import { deleteSingleNewItem, getSingleNewItem } from '../../../firebase'

export let actionList = {
	deleteItem,
	editItem,
	createGallery
}

function deleteItem() {
	$('.admin-news-edit [data-type="delete"]').on('click', function() {
		createPreloader()

		deleteSingleNewItem($(this).closest('.admin-news-item').attr('data-db-key'))
	})
}

function createGallery() {
	$('.create-gallery').on('click', e => {
		e.preventDefault()

		openModal({
			type: $(e.target).attr('data-type'),
			itemKey: $(e.target).closest('.admin-news-item').attr('data-db-key')
		})
	})
}

function editItem() {
	$('.admin-news-edit [data-type="edit"]').on('click', function() {
		createPreloader()

		let customFunction = data => {
			openModal({
				type: 'create-news-modal'
			},
			data.val())
		}

		let id = $(this).closest('.admin-news-item').attr('data-db-key')

		getSingleNewItem(id, customFunction)
	})
}
