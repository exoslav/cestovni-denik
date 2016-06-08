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

export let createNewsModalContent = () => {
	return `
		<div class="modal-window-header">
			<input value="Název příběhu">
			<input value="Datum">
			<input value="Lat">
			<input value="Lng">
		</div>

		<div class="modal-window-content">
			<input value="Anotace">
			<input value="Obsah">
			<input value="Lat">
			<input value="Lng">
		</div>
	`
}
