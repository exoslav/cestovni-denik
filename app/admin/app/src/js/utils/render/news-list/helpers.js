export let handleNews = (data, selector) => {
	/*
	$('body').on('click', `.${selector}-item`, e => {
		e.preventDefault()

		renderNewsDetailContent(data, selector, $(e.target))
	})
*/
}

function renderNewsDetailContent(data, selector, item) {
	let itemData = data[item.attr('data-db-key')],
			itemTemplate = $(`
			<div class="${selector}-detail">
				<span class="${selector}-detail-date">${itemData.date}</span>
				<div class="${selector}-detail-annotation">${itemData.desc}</div>
				<div class="${selector}-detail-content">${itemData.content}</div>
			</div>`)

	openModal({header: itemData.header}, itemTemplate)
}