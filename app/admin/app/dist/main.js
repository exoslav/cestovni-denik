/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _constants = __webpack_require__(1);
	
	var _firebase = __webpack_require__(3);
	
	var _helpers = __webpack_require__(2);
	
	__webpack_require__(17);
	
	
	window.adminInit = function () {
		var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
		(0, _constants.setCustomFunctions)(opts.customFunctions);
	
		// volani preInitCustom funkci
		(0, _helpers.callFunctionsInObject)(_constants.customFunctions.preInitFunction);
	
		// initialize firebase
		firebase.initializeApp(opts.fireBaseConfig);
	
		(0, _firebase.setDBreference)();
	
		// get languages async
		firebase.database().ref('langs').on('value', function (data) {
			if (!_constants.appStatus) {
				firebase.database().ref('langs').off(); // dettach listener
	
				(0, _constants.setLangs)(data.val());
	
				(0, _firebase.setUserState)(opts);
			} else (0, _constants.setAppStatus)(true);
		});
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.setCustomFunctions = exports.setLangs = exports.setAppStatus = exports.appStatus = exports.preloaderOverpage = exports._postInitFunctions = exports.customFunctions = exports.lngs = exports.setAppState = exports.appState = undefined;
	
	var _helpers = __webpack_require__(2);
	
	// uklada stav aplikace... pokud se nactou vsechny komponenty, je appState true
	var appState = exports.appState = false;
	var setAppState = exports.setAppState = function setAppState(val) {
		return exports.appState = appState = val;
	};
	
	var lngs = exports.lngs = {};
	var customFunctions = exports.customFunctions = {};
	var _postInitFunctions = exports._postInitFunctions = {
		removePreloader: _helpers.removePreloader
	};
	var preloaderOverpage = exports.preloaderOverpage = 'preloader-overpage';
	
	var appStatus = exports.appStatus = false;
	
	var setAppStatus = exports.setAppStatus = function setAppStatus(status) {
		exports.appStatus = appStatus = status;
	};
	
	var setLangs = exports.setLangs = function setLangs(data) {
		exports.lngs = lngs = data;
	};
	
	// set functions
	var setCustomFunctions = exports.setCustomFunctions = function setCustomFunctions(functions) {
		Object.assign(customFunctions, functions);
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.callFunctionsInObject = exports.checkAsyncFirebase = exports.removePreloader = exports.createPreloader = exports.setCheckAsyncTotal = undefined;
	
	var _templates = __webpack_require__(6);
	
	var _constants = __webpack_require__(1);
	
	var checkAsyncCounter = 0;
	var checkAsyncTotal = void 0;
	
	var setCheckAsyncTotal = exports.setCheckAsyncTotal = function setCheckAsyncTotal(total) {
	  checkAsyncTotal = total - 1;
	};
	
	var createPreloader = exports.createPreloader = function createPreloader() {
	  $(_templates.preLoader).appendTo('body');
	};
	
	var removePreloader = exports.removePreloader = function removePreloader() {
	  $('#' + _constants.preloaderOverpage).hide().remove();
	};
	
	var checkAsyncFirebase = exports.checkAsyncFirebase = function checkAsyncFirebase() {
	  if (checkAsyncCounter === checkAsyncTotal && !_constants.appState) {
	    callFunctionsInObject(_constants.customFunctions.postInitFunction);
	    callFunctionsInObject(_constants._postInitFunctions);
	
	    (0, _constants.setAppState)(true);
	  } else checkAsyncCounter++;
	};
	
	var callFunctionsInObject = exports.callFunctionsInObject = function callFunctionsInObject(obj) {
	  if (Object.keys(obj).length !== 0 && obj.constructor === Object) {
	    Object.keys(obj).forEach(function (key) {
	      if (typeof obj[key] === 'function') obj[key]();
	    });
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getPosition = exports.getWelcomeText = exports.deleteSingleNewItem = exports.getSingleNewItem = exports.getNews = exports.createNewsItem = exports.setDBreference = exports.setUserState = exports.setFirebaseAuth = exports.user = exports.db = undefined;
	
	var _formLogin = __webpack_require__(4);
	
	var _administration = __webpack_require__(5);
	
	var _index = __webpack_require__(11);
	
	var _index2 = __webpack_require__(13);
	
	var _index3 = __webpack_require__(14);
	
	var _helpers = __webpack_require__(2);
	
	var db = exports.db = void 0;
	var user = exports.user = void 0;
	
	// firebase authentication on click
	var setFirebaseAuth = exports.setFirebaseAuth = function setFirebaseAuth(email, password) {
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
			(0, _formLogin.createAlertMsg)(error);
		});
	};
	
	// get user, if user is not logged then user is null
	var setUserState = exports.setUserState = function setUserState(opts) {
		firebase.auth().onAuthStateChanged(function (data) {
			exports.user = user = data;
	
			if (data) {
				(0, _administration.createAdministration)();
				console.log('user is sign in: ', user);
			} else {
				// run login form to administartion
				(0, _formLogin.createLoginForm)({
					id: opts.formId
				});
				console.log('fail to log in: ', user);
			}
		});
	};
	
	var setDBreference = exports.setDBreference = function setDBreference() {
		exports.db = db = firebase.database();
	};
	
	var createNewsItem = exports.createNewsItem = function createNewsItem(opts) {
		db.ref('news').push(opts, function (error) {
			var errorMsg = error ? 'Error has occured during saving process' : 'Data has been saved succesfully';
			console.log(errorMsg);
	
			(0, _helpers.removePreloader)();
		});
	};
	
	var getNews = exports.getNews = function getNews() {
		db.ref('news').on('value', function (data) {
			//db.ref('news').off()
			(0, _index3.renderNewsList)(data.val());
		});
	};
	
	var getSingleNewItem = exports.getSingleNewItem = function getSingleNewItem(item, customFunction) {
		db.ref('news/' + item).once('value').then(function (data) {
	
			if (customFunction && typeof customFunction === 'function') {
				alert('custom function in firebase');
				customFunction(data);
			}
	
			(0, _helpers.removePreloader)();
		});
	};
	
	var deleteSingleNewItem = exports.deleteSingleNewItem = function deleteSingleNewItem(item) {
		db.ref('news/' + item).remove(function (error) {
			var errorMsg = error ? 'Error has occured during removing process' : 'Data has been removed succesfully';
	
			console.log(errorMsg);
	
			(0, _helpers.removePreloader)();
		});
	};
	
	var getWelcomeText = exports.getWelcomeText = function getWelcomeText() {
		db.ref('welcomeText').on('value', function (data) {
			db.ref('welcomeText').off();
	
			(0, _index.renderWelcomeText)(data.val());
		});
	};
	
	var getPosition = exports.getPosition = function getPosition() {
		db.ref('position').on('value', function (data) {
			db.ref('position').off();
	
			(0, _index2.renderPosition)(data.val());
		});
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.hideAdminLogin = exports.createAlertMsg = exports.createLoginForm = undefined;
	
	var _constants = __webpack_require__(1);
	
	var _firebase = __webpack_require__(3);
	
	var admin = void 0; // jQuery obj
	
	// create login form
	var createLoginForm = exports.createLoginForm = function createLoginForm() {
	
		$('body').empty().addClass('admin-login');
	
		var theClass = 'admin-login';
	
		admin = $('<div/>', {
			id: 'admin-login'
		});
	
		var header = $('<h1/>', {
			text: _constants.lngs.admin.welcomeText
		}).appendTo(admin);
	
		var form = $('<form/>').appendTo(admin);
	
		for (var i = 0; i < 2; i++) {
			var type = i === 0 ? 'text' : 'password',
			    inputName = i === 0 ? 'name' : 'password',
			    inputText = i === 0 ? _constants.lngs.globals.loginName : _constants.lngs.globals.loginPassword;
	
			$('<input/>', {
				type: type,
				placeholder: inputText,
				class: theClass + '-' + inputName
			}).appendTo(form);
		}
	
		$('<button/>', {
			type: 'submit',
			class: 'btn waves-effect waves-light',
			text: _constants.lngs.globals.loginSignIn
		}).appendTo(form);
	
		handleAdminLogin(form);
	
		admin.appendTo('.admin-login');
	};
	
	var createAlertMsg = exports.createAlertMsg = function createAlertMsg(error) {
		$('#login-alert').remove();
	
		var errorMsg = void 0;
		switch (error.code) {
			case 'auth/wrong-password':
				errorMsg = _constants.lngs.admin.errorWrongPassword;
				break;
			case 'auth/invalid-email':
				errorMsg = _constants.lngs.admin.errorWrongUsername;
				break;
		}
	
		var alertBox = $('<div/>', {
			id: 'login-alert'
		});
	
		$('<h2/>', {
			text: errorMsg
		}).appendTo(alertBox);
	
		alertBox.appendTo(admin);
	};
	
	// hide login form
	var hideAdminLogin = exports.hideAdminLogin = function hideAdminLogin() {
		$('#admin-login').empty();
	};
	
	function handleAdminLogin(form) {
		form.on('submit', function (e) {
			e.preventDefault();
	
			var username = form.find('.admin-login-name').val(),
			    password = form.find('.admin-login-password').val();
	
			(0, _firebase.setFirebaseAuth)(username, password);
		});
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.createAdministration = undefined;
	
	var _formLogin = __webpack_require__(4);
	
	var _firebase = __webpack_require__(3);
	
	var _templates = __webpack_require__(6);
	
	var _index = __webpack_require__(7);
	
	var _constants = __webpack_require__(1);
	
	var createAdministration = exports.createAdministration = function createAdministration() {
		(0, _formLogin.hideAdminLogin)();
		$('body').removeClass().attr('id', 'administration');
	
		var adminContent = $((0, _templates.administration)(_constants.lngs));
	
		adminContent.appendTo('body');
	
		$('#admin-logout').on('click', function (e) {
			e.preventDefault();
	
			firebase.auth().signOut().then(function () {
				console.log('logged out succesfully');
			}, function (error) {
				console.log('error has occured', error);
				// An error happened.
			});
		});
	
		(0, _index.loadAdministrationModules)();
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var administration = exports.administration = function administration(lngs) {
		return '\n\t<header>\n\t\t<div>\n\t\t\t<div class="container">\n\t\t\t\t<div class="project-name">\n\t\t\t\t\t<h1>www.' + lngs.globals.projectName + '.cz</h1>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="control-panel">\n\t\t\t\t\t<button id="admin-logout" type="button">Odhlášení</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</header>\n\n\t<main class="container">\n\t\t<div id="admin-welcome-text">\n\t\t\t<div class="admin-welcome-text-preloader">preloader</div>\n\t\t</div>\n\n\t\t<div id="admin-position">\n\t\t\t<div class="admin-position-preloader">preloader</div>\n\t\t</div>\n\n\t\t<div id="admin-news">\n\t\t\t<div class="admin-news-preloader">preloader</div>\n\t\t</div>\n\t</main>\n\n\t<footer></footer>\n\t';
	};
	
	var createNewsModalContent = exports.createNewsModalContent = function createNewsModalContent(_ref) {
		var _ref$modalHeader = _ref.modalHeader;
		var modalHeader = _ref$modalHeader === undefined ? 'Vytvoření novinky' : _ref$modalHeader;
		var _ref$header = _ref.header;
		var header = _ref$header === undefined ? 'Název příběhu' : _ref$header;
		var _ref$date = _ref.date;
		var date = _ref$date === undefined ? 'Datum' : _ref$date;
		var _ref$lat = _ref.lat;
		var lat = _ref$lat === undefined ? 'Lat' : _ref$lat;
		var _ref$lng = _ref.lng;
		var lng = _ref$lng === undefined ? 'Lng' : _ref$lng;
		var _ref$annotation = _ref.annotation;
		var annotation = _ref$annotation === undefined ? 'Anotace' : _ref$annotation;
		var _ref$content = _ref.content;
		var content = _ref$content === undefined ? 'Obsah' : _ref$content;
	
		var template = '\n\t\t<div class="modal-window-header">\n\t\t\t<h2>' + modalHeader + '</h2>\n\t\t</div>\n\n\t\t<div class="modal-window-content">\n\t\t\t<input data-type="header" value="' + header + '">\n\t\t\t<input data-type="date" value="' + date + '">\n\t\t\t<input data-type="lat" value="' + lat + '">\n\t\t\t<input data-type="lng" value="' + lng + '">\n\t\t\t<input data-type="desc" value="' + annotation + '">\n\t\t\t<input data-type="content" value="' + content + '">\n\t\t</div>\n\n\t\t<div class="modal-window-footer">\n\t\t\t<button id="create-new-story" class="waves-effect waves-light btn" type="button">Vytvořit novinku</button>\n\t\t</div>\n\t';
	
		return template;
	};
	
	var preLoader = exports.preLoader = '\n\t<div id="preloader-overpage">\n\t\t<div id="cssload-pgloading">\n\t\t\t<div class="cssload-loadingwrap">\n\t\t\t\t<ul class="cssload-bokeh">\n\t\t\t\t\t<li></li>\n\t\t\t\t\t<li></li>\n\t\t\t\t\t<li></li>\n\t\t\t\t\t<li></li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n';

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.loadAdministrationModules = undefined;
	
	var _constants = __webpack_require__(1);
	
	var _modals = __webpack_require__(8);
	
	var _helpers = __webpack_require__(2);
	
	var _firebase = __webpack_require__(3);
	
	var loadAdministrationModules = exports.loadAdministrationModules = function loadAdministrationModules() {
		var renderFunctions = {
			getWelcomeText: _firebase.getWelcomeText,
			getPosition: _firebase.getPosition,
			getNews: _firebase.getNews
		};
	
		(0, _helpers.setCheckAsyncTotal)(Object.keys(renderFunctions).length);
	
		Object.keys(renderFunctions).forEach(function (key, index) {
			if (typeof renderFunctions[key] === 'function') renderFunctions[key]();
		});
	
		administrationPostRenderFunction();
	};
	
	function administrationPostRenderFunction() {
		$('body').on('click', '.ui-edit', function (e) {
			var self = $(e.target),
			    savedData = {};
	
			self.toggleClass('ui-edit-is-open').text(self.hasClass('ui-edit-is-open') ? _constants.lngs.admin.done : _constants.lngs.admin.edit);
	
			var elems = self.closest('.editable').find('[data-editable-save="true"]');
	
			var updateData = {},
			    pathName = '';
	
			elems.each(function (index, item) {
				$(item).attr('disabled', self.hasClass('ui-edit-is-open') ? false : true);
				pathName = $(item).attr('data-db-path');
				updateData[$(item).attr('data-db-key')] = $(item).val();
			});
	
			if (!self.hasClass('ui-edit-is-open')) writeUserData(pathName, updateData);
		});
	
		$('body').on('click', '#new-story', function (e) {
			(0, _modals.openModal)({
				type: $(e.target).attr('data-modal-type')
			}, {
				modalHeader: 'Název nového příběhu'
			});
		});
	}
	
	function writeUserData(pathName, opts) {
		_firebase.db.ref(pathName).update(opts);
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.openModal = undefined;
	
	var _actions = __webpack_require__(9);
	
	var _postRenderFunctions = __webpack_require__(10);
	
	var _templates = __webpack_require__(6);
	
	var defaultOpts = {
		header: 'modalni okno'
	};
	
	/* otevre modalni okno
	opts - type obj
		opts.type - typ modalniho okna
	content - type obj
		data pro vykresleni do template
	*/
	var openModal = exports.openModal = function openModal() {
		var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		var content = arguments[1];
	
		removeModal();
		opts = Object.assign(defaultOpts, opts);
	
		var modalPostRenderFunctions = {};
	
		var modalWindow = $('<div/>', {
			id: 'modal-window',
			class: 'modal'
		});
	
		var template = void 0;
		modalPostRenderFunctions.globalPostRenderFunction = postRenderFunction;
		switch (opts.type) {
			case 'create-news-modal':
				template = (0, _templates.createNewsModalContent)(content);
				modalPostRenderFunctions.createNews = _postRenderFunctions.postRenderFunctions.createNews;
				break;
		}
	
		$(template).appendTo(modalWindow);
	
		modalWindow.appendTo('body');
	
		// volani postrender funkci
		Object.keys(modalPostRenderFunctions).forEach(function (key) {
			if (typeof modalPostRenderFunctions[key] === 'function') modalPostRenderFunctions[key]();
		});
	};
	
	function removeModal() {
		$('#modal-window').remove();
	}
	
	function postRenderFunction() {
		//closeModalWindow()
		console.log('modal postRenderFunction');
		// otevre modalni okno
		$('#modal-window').openModal();
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var closeModalWindow = exports.closeModalWindow = function closeModalWindow() {
		$('body').on('click', '.modal-window-close, .modal-window-overlay', function () {
			closeWindow();
		});
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.postRenderFunctions = undefined;
	
	var _templates = __webpack_require__(6);
	
	var _firebase = __webpack_require__(3);
	
	var postRenderFunctions = exports.postRenderFunctions = {
		createNews: createNews
	};
	
	function createNews() {
		var opts = {};
		$('#create-new-story').on('click', function (e) {
			e.preventDefault();
	
			$(_templates.preLoader).appendTo('body');
	
			$('.modal-window-content input').each(function (index, item) {
				opts[$(item).attr('data-type')] = $(item).val();
			});
	
			(0, _firebase.createNewsItem)(opts);
		});
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.renderWelcomeText = undefined;
	
	var _renderUi = __webpack_require__(12);
	
	var _renderUi2 = _interopRequireDefault(_renderUi);
	
	var _helpers = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var renderWelcomeText = exports.renderWelcomeText = function renderWelcomeText(data) {
		var selector = 'admin-welcome-text',
		    welcomeText = data,
		    el = '\n\t\t\t\t<div class="editable welcome-text">\n\t\t\t\t\t<input\n\t\t\t\t\t\tdisabled\n\t\t\t\t\t\tdata-db-key="header"\n\t\t\t\t\t\tdata-db-path="welcomeText"\n\t\t\t\t\t\tdata-editable-save="true"\n\t\t\t\t\t\tvalue="' + welcomeText.header + '"\n\t\t\t\t\t>\n\t\t\t\t\t<input\n\t\t\t\t\t\tdisabled\n\t\t\t\t\t\tdata-db-key="desc"\n\t\t\t\t\t\tdata-db-path="welcomeText"\n\t\t\t\t\t\tdata-editable-save="true"\n\t\t\t\t\t\tvalue="' + welcomeText.desc + '"\n\t\t\t\t\t>\n\t\t\t\t</div>';
	
		$('.' + selector + '-preloader').remove();
		$(el).appendTo('#' + selector);
	
		(0, _renderUi2.default)(selector);
	
		(0, _helpers.checkAsyncFirebase)();
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = renderUI;
	
	var _constants = __webpack_require__(1);
	
	function renderUI(selector) {
		$('#' + selector).find('.editable').each(function (index, item) {
			var UI = $('<button/>', {
				class: 'waves-effect waves-light btn ui-edit ui-edit-' + selector,
				text: _constants.lngs.admin.edit,
				type: 'button'
			});
	
			UI.appendTo($(item));
		});
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.renderPosition = undefined;
	
	var _renderUi = __webpack_require__(12);
	
	var _renderUi2 = _interopRequireDefault(_renderUi);
	
	var _helpers = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var renderPosition = exports.renderPosition = function renderPosition(data) {
		var selector = 'admin-position',
		    position = data,
		    el = '\n\t\t\t<div>\n\t\t\t\t<div class="editable where-we-are">\n\t\t\t\t\t<input\n\t\t\t\t\t\tdisabled\n\t\t\t\t\t\tdata-db-key="header"\n\t\t\t\t\t\tdata-db-path="position/whereWeAre"\n\t\t\t\t\t\tdata-editable-save="true"\n\t\t\t\t\t\tvalue="' + position.whereWeAre.header + '"\n\t\t\t\t\t>\n\t\t\t\t\t<input\n\t\t\t\t\t\tdisabled\n\t\t\t\t\t\tdata-db-key="desc"\n\t\t\t\t\t\tdata-db-path="position/whereWeAre"\n\t\t\t\t\t\tdata-editable-save="true"\n\t\t\t\t\t\tvalue="' + position.whereWeAre.desc + '"\n\t\t\t\t\t>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="editable where-we-go">\n\t\t\t\t\t<input\n\t\t\t\t\t\tdisabled\n\t\t\t\t\t\tdata-db-key="header"\n\t\t\t\t\t\tdata-db-path="position/whereWeGo"\n\t\t\t\t\t\tdata-editable-save="true"\n\t\t\t\t\t\tvalue="' + position.whereWeGo.header + '"\n\t\t\t\t\t>\n\t\t\t\t\t<input\n\t\t\t\t\t\tdisabled\n\t\t\t\t\t\tdata-db-key="desc"\n\t\t\t\t\t\tdata-db-path="position/whereWeGo"\n\t\t\t\t\t\tdata-editable-save="true"\n\t\t\t\t\t\tvalue="' + position.whereWeGo.desc + '"\n\t\t\t\t\t>\n\t\t\t\t</div>\n\t\t\t</div>';
	
		$('.' + selector + '-preloader').remove();
		$(el).appendTo('#' + selector);
	
		(0, _renderUi2.default)(selector);
	
		(0, _helpers.checkAsyncFirebase)();
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.renderNewsList = exports.isDeleteEventsBinded = undefined;
	
	var _constants = __webpack_require__(1);
	
	var _helpers = __webpack_require__(15);
	
	var _actions = __webpack_require__(16);
	
	var _helpers2 = __webpack_require__(2);
	
	var isDeleteEventsBinded = exports.isDeleteEventsBinded = false;
	
	var renderNewsList = exports.renderNewsList = function renderNewsList(data) {
		var selector = 'admin-news',
		    news = data,
		    el = $('<ul/>', {
			class: 'collapsible popout collapsible-accordion'
		});
	
		$('#' + selector).empty();
	
		Object.keys(news).forEach(function (key) {
			var newsType = news[key].type === 1 ? 'nz' : 'aust';
	
			var newPost = '\n\t\t\t<li \n\t\t\t\tclass="admin-news-item"\n\t\t\t\tdata-db-key="' + key + '"\n\t\t\t\tid="admin-news-item-' + news[key].id + '"\n\t\t\t>\n\t\t\t\t<div class="collapsible-header">\n\t\t\t\t\t<img class="admin-news-icon" src="../src/imgs/' + newsType + '-icon.png">\n\t\t\t\t\t<h3>\n\t\t\t\t\t\t' + news[key].header + '\n\t\t\t\t\t</h3>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="admin-news-edit">\n\t\t\t\t\t<button data-type="edit" class="waves-effect waves-light btn" type="button">\n\t\t\t\t\t\t<i class="material-icons">mode_edit</i>\n\t\t\t\t\t</button>\n\t\t\t\t\t<button data-type="delete" class="waves-effect waves-light btn" type="button">\n\t\t\t\t\t\t<i class="material-icons">delete</i>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<div class="collapsible-body">\n\t\t\t\t\t' + news[key].desc + '\n\t\t\t\t</div>\n\n\t\t\t</li>';
	
			$(newPost).appendTo(el);
		});
	
		$('.' + selector + '-preloader').remove();
	
		$('<h2/>', {
			text: _constants.lngs.admin.ourStories
		}).appendTo('#' + selector);
		$('<a/>', {
			id: 'new-story',
			class: 'waves-effect waves-light btn modal-trigger',
			'data-modal-type': 'create-news-modal',
			href: '#modal1',
			text: 'nový příběh'
		}).appendTo('#' + selector);
	
		$(el).appendTo('#' + selector);
	
		(0, _helpers2.callFunctionsInObject)(_actions.actionList);
	
		$(document).ready(function () {
			$('.collapsible').collapsible({
				accordion: false
			});
		});
	
		(0, _helpers2.checkAsyncFirebase)();
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var handleNews = exports.handleNews = function handleNews(data, selector) {
		/*
	 $('body').on('click', `.${selector}-item`, e => {
	 	e.preventDefault()
	 
	 	renderNewsDetailContent(data, selector, $(e.target))
	 })
	 */
	};
	
	function renderNewsDetailContent(data, selector, item) {
		var itemData = data[item.attr('data-db-key')],
		    itemTemplate = $('\n\t\t\t<div class="' + selector + '-detail">\n\t\t\t\t<span class="' + selector + '-detail-date">' + itemData.date + '</span>\n\t\t\t\t<div class="' + selector + '-detail-annotation">' + itemData.desc + '</div>\n\t\t\t\t<div class="' + selector + '-detail-content">' + itemData.content + '</div>\n\t\t\t</div>');
	
		openModal({ header: itemData.header }, itemTemplate);
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.actionList = undefined;
	
	var _modals = __webpack_require__(8);
	
	var _index = __webpack_require__(14);
	
	var _helpers = __webpack_require__(2);
	
	var _firebase = __webpack_require__(3);
	
	var actionList = exports.actionList = {
		deleteItem: deleteItem,
		editItem: editItem
	};
	
	function deleteItem() {
		$('.admin-news-edit [data-type="delete"]').on('click', function () {
			(0, _helpers.createPreloader)();
	
			(0, _firebase.deleteSingleNewItem)($(this).closest('.admin-news-item').attr('data-db-key'));
		});
	}
	
	function editItem() {
		$('.admin-news-edit [data-type="edit"]').on('click', function () {
			(0, _helpers.createPreloader)();
	
			var customFunction = function customFunction(data) {
				(0, _modals.openModal)({
					type: 'create-news-modal'
				}, data.val());
			};
	
			var id = $(this).closest('.admin-news-item').attr('data-db-key');
	
			(0, _firebase.getSingleNewItem)(id, customFunction);
		});
	}

/***/ },
/* 17 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map