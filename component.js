Component = {

	 _self: {
		locations: {
			value: 'locations',
			index: 0,
			icon: 'photo'
		},
		assets: {
			value: 'assets',
			index: 1,
			icon: 'transmit'
		},
		layers: {
			value: 'layers',
			index: 2,
			icon: 'layers'
		}
	},

	_handlers: function() {
		component.onchange = function() { 
			var cmp = this[this.selectedIndex].value.toLowerCase()
			Component.load(cmp)
			Prefs.save("Module/Component", this[this.selectedIndex])
		}	
	},

	defaults: 'locations',

	load: function(label) {
		var cmp = this._self[label]
		// Change UI
		component.selectedIndex = cmp.index
		// Hide settings panel content
		label != 'locations' && (document.getElementById('locations').style.display = 'none')
		label != 'assets' && (document.getElementById('assets').style.display = 'none')
		label != 'layers' && (document.getElementById('layers').style.display = 'none')
		// Make component visible
		document.getElementById(label).style.display = ''
		document.getElementById(label).style.visibility = 'visible'
		// Change component icon
		document.getElementById('cmp_icon').src = Prefs.icon(cmp.icon)
		this._handlers()
	},

	selected: function() {
		return component.value.toLowerCase()
	},

	// TODO Save pref
	sectionVisibility: function(self, id) {
		if (self.checked) {
			self.parentElement.style.color = '#04408c'
			document.getElementById(id).style.display = 'block'
		}
		else {
			self.parentElement.style.color = 'gray'
			// self.parentElement.style.borderBottomColor = 'red'
			try {
				document.getElementById(id).style.display = 'none'
			}
			catch(e) {
				alert(id)
			}
		}
		console.log(self.checked? "Show" : "Hide", self)
	}

}