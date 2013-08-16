Layers = {

	_base: {},
	// _data: {},

	_handlers: function() {
		function handler(id, name) {
			// Section expand/collapse
			var it = document.getElementById(id)
			it.onchange = function() {
				Component.sectionVisibility(it, name+'_set')	
			}
			// Item select/deselect
			var them = document.getElementsByName(id)
			for (var i in them) {
				var item = them[i]
				item.onclick = function(x) {
					Layers[name](this)
					Prefs.save("Layer/"+name, this)
				}
			}
		}
		handler('base', 'base')
		handler('data', 'data')
		Component.sectionVisibility(data, 'data_set')
	},

	init: function() {
		var host = Map._host
		var imgtype = 'image/png'
		// Load base layers
		this._base.osm = new OpenLayers.Layer.OSM("OpenStreetMap")
		this._base.gmap = new OpenLayers.Layer.Google("Street", {
			sphericalMercator: true,
			numZoomLevels: 20
		})
		this._base.gsat = new OpenLayers.Layer.Google("Satellite", {
			type: google.maps.MapTypeId.SATELLITE,
			sphericalMercator: true,
			numZoomLevels: 20
		})
		// Load data layers
		// this._data.roads = new OpenLayers.Layer.WMS("Roads", host+"/geoserver/geocenter/wms", {
		//     id: 'roads',
		//     LAYERS: 'roads',
		//     transparent: true,
		//     STYLES: '',
		//     format: imgtype,
		//     tiled: true,
		//     tilesOrigin: Map._self.maxExtent.left + ',' + Map._self.maxExtent.bottom
		// }, {
		//     strategies: [new OpenLayers.Strategy.Fixed({ preload: false })],        
		//     displayOutsideMaxExtent: true,
		//     spericalmercator: true,
		//     isBaseLayer: false,
		//     tileSize: new OpenLayers.Size(256, 256),
		//     buffer: 2
		// })
		Map._self.addLayers([this._base.osm, this._base.gmap, this._base.gsat])
		this._handlers()
	},

	defaults: [
		'gsat',
		''
	],

	load: function(layers) {
		var selected = typeof layers != 'undefined' && layers.length
		!selected && (layers = this.defaults)
		document.getElementById(layers[0]).click()
		if (layers.length == 2 && layers[1].length) {
			var dlayers = layers[1].split(',')
			for (var i in dlayers) {
				document.getElementById(dlayers[i]).click()
			}
		}
	},

	base: function(self) {
		Map._self.setBaseLayer(Map._self.getLayersByName(self.title)[0])
	},

	data: function(self) {
		var layer = this._data[self.id]
		Map._self.layers.indexOf(layer) > -1?
			Map._self.removeLayer(layer) :
			Map._self.addLayer(layer)
		// Set z-indices
		// this._data.LAYER.setZIndex(n)
	},

	selected: function() {
		var baselayers = Prefs.buttons('base')
		// var datalayers = Prefs.buttons('data')
		var any = baselayers.length // || datalayers.length
		return any?
			Prefs.stringify({
				base: baselayers //,
				// data: datalayers
			}) :
			null
	}

}