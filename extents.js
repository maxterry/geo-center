Extents = {

	// TODO Dynamic & zoom
	defaults: 'moncrief',

	_handlers: function() {
		yards.onclick = function() {
			Component.sectionVisibility(this, 'yards_set')
		}
		var them = document.getElementsByName('yard')
		for (var i in them) {
			them[i].onclick = function() {
				var bounds = this.title.split(',')
				Extents.spatial(bounds)
				// TODO Don't save if initial
				Prefs.save("Extent/Spatial", this)
			}
		}
		// replay.onclick = function() {
		// 	Component.sectionVisibility(this, 'replay_set')
		// }
		// var theTimes = document.getElementsByName('replay')
		// for (var i in theTimes) {
		// 	theTimes[i].onclick = function() {
		// 		Extents.temporal(this)
		// 		saveState("Extent/Temporal", this)
		// 	}
		// }
	},

	init: function() {
		// TODO
		var extent = [-117.807846, 33.78755, -117.767846, 33.82755]
		var baseBound = new OpenLayers.Bounds(
		    extent[0],
		    extent[1],
		    extent[2],
		    extent[3]
		)
		// Transform projection
		baseBound.transform(
		    new OpenLayers.Projection('EPSG:4326'), 
		    new OpenLayers.Projection('EPSG:900913')
		)
		// Set initial bounds
		var zoomCenter = baseBound.getCenterLonLat()
		var zoomLevel = Map._self.getZoomForExtent(baseBound)
		Map._self.setCenter(zoomCenter, zoomLevel)
		this._handlers()
	},

	load: function(extent) {
		extent = extent || this.defaults
		// TODO
		// for (var i in extents) {
		// 	document.getElementById(extents[i]).click()
		// }
		//alert(extent)
		try {
			document.getElementById(extent).click()	
		}
		catch (e) {
			alert(extent)
		}
		
	},

	selected: function() {
		//var them
		return Prefs.buttons('yard')
		//(them = Prefs.buttons('yard').join())
		//return them
	},

	projection: function(bounds) {
	    var baseBound = new OpenLayers.Bounds(bounds[0], bounds[1], bounds[2], bounds[3])
	    baseBound.transform(
	    	new OpenLayers.Projection('EPSG:4326'),
	    	new OpenLayers.Projection('EPSG:900913')
	    )
	    return baseBound
	},

	spatial: function(bounds) {
		var baseBound = this.projection(bounds)
        var zoomCenter = baseBound.getCenterLonLat()
        var zoomLevel = Map._self.getZoomForExtent(baseBound)
        Map._self.setCenter(zoomCenter, zoomLevel)
	},

	temporal: function() {
		// TODO
	}

}