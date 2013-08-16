Module = {

	_handlers: function() {

		var them = document.getElementsByName('module')
		for (var i in them) {
			them[i].onclick = function() {
				Module.load(this.text)
				Prefs.save("Module", this)
			}
		}

		// Reveal or conceal module menu
		// TODO
		// module.onclick = function() {
		// 	var shown = document.getElementById('menu').style.display
		// 	if (shown && shown != 'none') {
		// 		//this.style.color = 'purple'
		// 		document.getElementById('menu').style.display = ''
		// 	}
		// 	else {
		// 		var links = document.getElementsByTagName('a')
		// 		for (var i in links) {
		// 			links[i]['style'] && (links[i].style.fontWeight = 'normal')
		// 		}
		// 		try {
		// 			document.getElementById(this.innerHTML.toLowerCase()).style.fontWeight = 'bold'
		// 			document.getElementById(this.innerHTML.toLowerCase()).parentElement.style.background = '#F3F7FB'
		// 			document.getElementById('module_icon').style.display = 'none'
		// 		}
		// 		catch(e) {
		// 			console.log(this.innerHTML)
		// 		}
		// 		this.fontWeight = 'bold'
		// 		this.innerHTML = '';
		// 		this.style.color = '#04408c'
		// 		document.getElementById('menu').style.display = 'block'
		// 	}
		// 	console.log("Module Menu", shown)
		// }

	},

	load: function(module) {

		module = module[0][0].toUpperCase() + module[0].substr(1)

		// Module icon
		document.getElementById('module_icon').style.display = ''
		document.getElementById('module_icon').src = Prefs.icon(module)

		// Current module display
		document.getElementById('module').innerHTML = module
		document.getElementById('module').style.fontWeight = 'bold'

		// Component selector
		var show = ['Home', 'Help', 'Log Out'].indexOf(module) == -1
		var it = document.getElementById('component').value.toLowerCase()
		var val = show? '' : 'none'
		document.getElementById('component').style.display = val
		document.getElementById(it).style.display = val

		// Close menu
		document.getElementById('menu').style.display = 'none'

		// Change screen
		// TODO

		//console.log("setModule")
		this._handlers()

	},

	selected: function() {
		return module.text.toLowerCase()
	}

}