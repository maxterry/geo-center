Prefs = {

	// Structure icon URL for `.src`
	icon: function(x) {
		var filename = {
			Home: 'house'
		}[x]
		return 'icons/' + x + '.png'
	},

	// Sections & items
	stringify: function(xs) {
		var list = []
		for (var i in xs) { list.push(xs[i].join(',')) }
		return list.join('+')
	},

	// Get a `param` from each section in a `module`
	// `param` can currently be either 'id' or, by default, 'label'
	sections: function(module, param) {
		var collected = []
		var elements = document.getElementById(module.toLowerCase())
		// Labels
		if (!param || param == 'label') {
			for (var i=0, l=elements.childElementCount; i<l; i++) {
				collected.push(
					elements.children[i].children[0].children[0].children[0]
					.textContent.substr(1)
				)
			}
		}
		// IDs
		else if (param == 'id') {
			for (var i=0, l=elements.childElementCount; i<l; i++) {
				collected.push(
					elements.children[i].children[0].children[0].children[0]
					.childNodes[0].childNodes[0].id
				)
			}
		}
		return collected
	},

	buttons: function(name, indices) {
		var buttons = document.getElementsByName(name)
		var selected = []
		for (var i in buttons) {
			buttons[i].checked && selected.push(indices? i : buttons[i].id)
		}
		return selected
	},

	// Get selected button ids via `component` id, optionally limited to a single `section`
	// TODO? Could take param, but should probably always return id?
	// TODO? Return elts instead of ids?
	// function newbuttons(component, section) {
	// 	var selected = []
	// 	if (!section) {
	// 		var sects = Prefs.sections(component, 'id')
	// 		for (var i in sects) {
	// 			var bs = document.getElementsByName(sects[i])
	// 			for (var i in document.getElementsByName(sects[i])) {
	// 				bs[i].checked && selected.push(bs[i].id)	
	// 			}
	// 		}
	// 	}
	// 	//Prefs.sections('assets', 'id'); for (var i in x) { console.log(buttons(x[i])) }
	// 	return selected
	// }

	selected: function() { return {
		module: Module.selected(),
		component: Component.selected(),
		locations: Locations.selected(),
		assets: Assets.selected(),
		layers: Layers.selected()
	}},

	// State managed with query string or hash segment parameters
	// TODO Keep track of history
	decode: function(hash) {
		var params = {}
		// var qs = document.location.search.substr(1).split(';')
		hash = hash || document.location.hash.substr(1).split(';')
		if (!hash || (hash.length && !hash[0])) {
			hash = Prefs.encode().split(';')
		}
		// if (qs.length > 1 || qs[0]) {
		// 	for (var i in qs) {
		// 		var param = qs[i].split('=')
		// 		params[param[0]] = param[1].split('+')
		// 	}
		// 	document.location.hash = document.location.search.substr(1)
		// 	document.location.search = ""
		// }
		if (hash.length > 1 || hash[0]) {
			for (var i in hash) {
				var param = hash[i].split('=')
				params[param[0]] = param[1].split('+')	
			}
		}
		// TODO
		// if (!params.cmp) {
		// 	var cmp = params.component? params.component[0] : Component.defaults
		// 	params.cmp = [Object.keys(Component.load).indexOf(cmp)]
		// }
		//!params.component && (params.component = Component.defaults)
		// console.log("params", params)
		return params
	},

	// Convert object to query/hash parameters
	encode: function() {
		var ps = Prefs.selected()
		var acc = []
		for (var i in ps) {
			if (ps[i]) {
				acc.push(i+'='+ps[i])
			}
		}
		return acc.join(';')
	},

	load: function() {
		return this.decode()
	},

	// Save state to query/hash params
	// TODO Remove args to fully automate by diffing against previous state
	save: function(msg, val) {
		document.location.hash = this.encode()
		console.log(msg, val)
	}

}