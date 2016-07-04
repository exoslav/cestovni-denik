import { lngs } from '../../constants'

export default function renderUI(selector) {
	$(`#${selector}`).find('.editable').each((index, item) => {
		let UI = $('<button/>', {
			class: `waves-effect waves-light btn ui-edit ui-edit-${selector}`,
			text: lngs.admin.edit,
			type: 'button'
		})

		UI.appendTo($(item))
	})
}