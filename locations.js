Locations = {

	// TODO Dynamic & zoom
	defaults: 'manhattan',

	_handlers: function() {
		spatial.onclick = function() {
			Component.sectionVisibility(this, 'spatial_set')
		}
		var them = document.getElementsByName('spatial')
		for (var i in them) {
			them[i].onclick = function() {
				var bounds = this.title.split(',')
				Locations.spatial(bounds)
				// TODO Don't save if initial
				Prefs.save("Location/Spatial", this)
			}
		}
		// TODO
		Component.sectionVisibility(temporal, 'temporal_set')
		// temporal.onclick = function() {
		// 	Component.sectionVisibility(this, 'temporal_set')
		// }
		// var times = document.getElementsByName('temporal')
		// for (var i in times) {
		// 	times[i].onclick = function() {
		// 		Locations.temporal(this)
		// 		saveState("Locations/Temporal", this)
		// 	}
		// }
	},

	init: function() {
		// TODO this.projection
		var extent = [-117.807846, 33.78755, -117.767846, 33.82755]
		var baseBound = new OpenLayers.Bounds(extent[0], extent[1], extent[2], extent[3])
		// Transform projection
		baseBound.transform(new OpenLayers.Projection('EPSG:4326'), new OpenLayers.Projection('EPSG:900913'))
		// Set initial bounds
		var zoomCenter = baseBound.getCenterLonLat()
		var zoomLevel = Map._self.getZoomForExtent(baseBound)
		Map._self.setCenter(zoomCenter, zoomLevel)
		this._handlers()
	},

	load: function(locations) {
		// locations = locations || this.defaults
		if (locations.length == 1 && !locations[0]) {
			locations = [this.defaults]
		}
		for (var i in locations) {
			document.getElementById(locations[i]).click()
		}
	},

	selected: function() {
		return Prefs.buttons('spatial')
		// var them = Prefs.buttons('yard').join()
		// return them
	},

	projection: function(bounds) {
		var baseBounds = new OpenLayers.Bounds(bounds[0], bounds[1], bounds[2], bounds[3])
		baseBounds.transform(new OpenLayers.Projection('EPSG:4326'), new OpenLayers.Projection('EPSG:900913'))
		return baseBounds
	},

	spatial: function(bounds) {
		var baseBounds = this.projection(bounds)
		var zoomCenter = baseBounds.getCenterLonLat()
		var zoomLevel = Map._self.getZoomForExtent(baseBounds)
		Map._self.setCenter(zoomCenter, zoomLevel)
	},

	temporal: function() {
		// TODO
	},

	// Current extents as comma-separated string
	bounds: function() {
		var bounds = Map._self.getExtent()
		var currentBounds = new OpenLayers.Bounds(bounds.left, bounds.bottom, bounds.right, bounds.top)
		currentBounds.transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection('EPSG:4326'))
		return [currentBounds.left, currentBounds.bottom, currentBounds.right, currentBounds.top].join(',')
	},

	// Current center
	center: function() {
		var center = Map._self.getCenter()
		var currentCenter = new OpenLayers.LonLat(center.lon, center.lat)
		currentCenter.transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection('EPSG:4326'))
		return [currentCenter.lon, currentCenter.lat].join(',')
	}

}