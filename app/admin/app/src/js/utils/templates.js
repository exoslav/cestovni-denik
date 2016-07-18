export let administration = lngs => {
	return `
	<header>
		<div>
			<div class="container">
				<div class="project-name">
					<h1>www.${lngs.globals.projectName}.cz</h1>
				</div>

				<div class="control-panel">
					<button id="admin-logout" type="button">Odhlášení</button>
				</div>
			</div>
		</div>
	</header>

	<main class="container">
		<div id="admin-welcome-text">
			<div class="admin-welcome-text-preloader">preloader</div>
		</div>

		<div id="admin-position">
			<div class="admin-position-preloader">preloader</div>
		</div>

		<div id="admin-news">
			<div class="admin-news-preloader">preloader</div>
		</div>
	</main>

	<footer></footer>
	`
}

export let createNewsModalContent = ({
	modalHeader = 'Vytvoření novinky',
	header = 'Název příběhu',
	date = 'Datum',
	lat = 'Lat',
	lng = 'Lng',
	annotation = 'Anotace',
	content = 'Obsah'
}) => {
	let template = `
		<div class="modal-window-header">
			<h2>${modalHeader}</h2>
		</div>

		<div class="modal-window-content">
			<input data-type="header" value="${header}">
			<input data-type="date" value="${date}">
			<input data-type="lat" value="${lat}">
			<input data-type="lng" value="${lng}">
			<input data-type="desc" value="${annotation}">
			<input data-type="content" value="${content}">
		</div>

		<div class="modal-window-footer">
			<button id="create-new-story" class="waves-effect waves-light btn" type="button">Vytvořit novinku</button>
		</div>
	`

	return template
}

export let createGallery = `
	<div id="create-gallery-form">
		<form>
			<input type="file" multiple>
			<label for="create-gallery-file">Nahrajte prosím obrázky</label>
			<button type="submit">Nahrát</button>
		</form>
	</div>
`
export let preLoader = `
	<div id="preloader-overpage">
		<div id="cssload-pgloading">
			<div class="cssload-loadingwrap">
				<ul class="cssload-bokeh">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
		</div>
	</div>
`
