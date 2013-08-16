// TODO
var departmentData = [{"id": 1, "name": "Cars"}]
var assetData = [{"id": 123, "name": "Car #1", "owner": "Bob", "type": "car", "department": 1, "location": [-73.94940822794996, 40.76210137435909] }]

Assets = {

	_handlers: function() {
		var depts = Prefs.sections('assets', 'id')
		for (var i in depts) {
			var dept = document.getElementById(depts[i])
			dept.onclick = function() {
				Component.sectionVisibility(this, this.id+'_set')
			}
			var theDeptAssets = document.getElementsByName(depts[i])
			for (var i in theDeptAssets) {
				theDeptAssets[i].onclick = function() {
					Assets.visible(this)
				}
			}
		}
	},

	init: function() {
		function latest() {
			// var request = new XMLHttpRequest()
			// request.open('GET', 'http://0.0.0.0:6543/locations')
			// request.send()
			// if (request.status === 200) {
			// 	console.log(request.responseText)
			// }
			// else {
			// 	console.log("!!!"+request.status)
			// }
			//return assetData	
		}
		// var assetData = latest('/asset')
		// var locationData = latest('/location')
		// var departmentData = latest('/department')
		// Start refresh strategy
		// TODO
		// Accumulate assets
		var depts = [[], []] // [], []] // HACK
		for (var i in assetData) {
			var asset = assetData[i]
			depts[asset.department].push(asset)
		}
		// Place assets in departments
		var accAssets = []
		for (var i in departmentData) {
			accAssets.push([
				departmentData[i].name, depts[departmentData[i].id]
			])
		}
		// Asset panel
		var depts = []
		for (var i in accAssets) {
			depts.push(this.department(accAssets[i][0], accAssets[i][1]))
		}
		// Set content
		assets.innerHTML = '<tr><td class="section" colspan=3>' + depts.join('') + '</td></tr>'
		//return depts
		this._handlers()
	},

	load: function(assets) {
		var sectionCount = document.getElementById('assets').childElementCount
		for (var i=0, l=sectionCount; i<l; i++) {
			for (var i in assets) {
				var assetId = '_'+assets[i]
				try {
					assetId && document.getElementById(assetId).click()
				}
				catch (e) {
					//console.log(qs.assets[i])
				}
			}
		}
	},

	selected: function() {
		var assetDepts = Prefs.sections('assets', 'id')
		var them = []
		for (var i=0, l=assetDepts.length; i<l; i++) {
			var bs = Prefs.buttons(assetDepts[i])
			bs.length && them.push(b).join(',')
		}
		them.length && (o.assets = them.join('+'))
		return them
	},

	// TODO Pass true/false to select/deselect all
	// TODO Pass array to select/deselect multiple ids
	visible: function(self, dept) {
		var ll = self.title.split(',')
		this.addMarker(self.getAttribute('label'), ll[0], ll[1])
		// TODO
		// markAsset(self.id)
		//Prefs.save('asset/'+self.name, self)
	},

	status: function(id, code) {
		// TODO Set id to code
		// TODO Pass { id: code } array/args to change multiple statuses
	},

	follow: function(bool) {
		// TODO
	},

	addMarker: function(assetName, lon, lat, date) {
		var AutoSizeFramedCloud = OpenLayers.Class(OpenLayers.Popup.FramedCloud, {
			autoSize: true
		})
		var point = new OpenLayers.Geometry.Point(lon, lat)
		P = point
		point.transform(new OpenLayers.Projection('EPSG:4326'), new OpenLayers.Projection('EPSG:900913'))
		var pointFeature = new OpenLayers.Feature.Vector(point, null, null)
		P2 = pointFeature
		pointFeature.attributes = {}
		pointFeature.attributes['name'] = assetName
		pointFeature.attributes['url'] = 'icons/car.png'
		pointFeature.closeBox = true
		pointFeature.popupClass = AutoSizeFramedCloud
		// pointFeature.data.popupContentHTML = Map._self.buildPopupContentHTML(assetName, lon, lat, date)
		pointFeature.data.overflow = 'auto' // 'hidden'
		pointFeature.id = assetName
		this.markerlayer.addFeatures([pointFeature])
	},

	// TODO
	markers: function() {

		function style() {
			return(new OpenLayers.StyleMap(new OpenLayers.Style({
				strokeColor: '#0000FF',
				strokeOpacity: 1,
				strokeWidth: 3,
				fillColor: '#00AAFF',
				fillOpacity: 1,
				pointRadius: 5,
				pointerEvents: 'visiblePainted',
				externalGraphic: '${url}',
				graphicXOffset: -8,
				graphicYOffset: 0,
				graphicWidth: 16,
				graphicHeight: 16,
				rotation: 0,
				label : '${name}', // label from attribute name
				labelXOffset: 0,
				labelYOffset: -24,
				fontColor: 'red',
				fontSize: '12px',
				fontFamily: 'Arial',
				fontWeight: 'bold',
				labelAlign: 'c'
			})))
		}

		// Asset vector layer
		var markerRefresh = new OpenLayers.Strategy.Refresh({
			interval: 1000,
			force: true,
			active: true
		})
		this.markerlayer = new OpenLayers.Layer.Vector("Things", {
			styleMap: style(),
			strategies: [markerRefresh]
		})
		Map.addLayer(this.markerlayer)

		function onFeatureSelect(feature) {
			var onPopupClose = function() {
				map.removePopup(currentPopup)
				currentPopup.destroy()
				currentPopup = null
			}
			var currentPopup
			if (feature.popup == null) {
				feature.popup = new OpenLayers.Popup.FramedCloud(
					feature.id,
					new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y),
					null,
					feature.data.popupContentHTML,
					null,
					feature.closeBox,
					onPopupClose
				)
				Map.addPopup(feature.popup, true)
				feature.popup.show()
			} else {
				feature.popup.toggle() // TODO toggle
			}
			currentPopup = feature.popup
			OpenLayers.Event.stop(this)
		}

		function onFeatureUnSelect(feature) {
			Map.removePopup(feature.popup)
			feature.popup.destroy()
			feature.popup = null
		}	

		// Popups?
		// var selectControl = new OpenLayers.Control.SelectFeature(this.markers, {
		//     onSelect: onFeatureSelect,
		//     onUnSelect: onFeatureUnSelect
		// })
		// Map.addControl(selectControl)
		// selectControl.activate()
		
	},

	// Asset department list item
	department: function(dept, assets) {
		// Asset list item
		function asset(o) {
			return [
				'<li class="', o.status, '"><label>',
					'<input id="', o.id, '" name="', o.name, '" label="', o.label, '" title=', o.location, ' type="checkbox" />',
					' ' + o.label,
				'</label></li>'
			].join('')
		}
		var dept_id = dept.toLowerCase().replace(/\s|-/g, '_')
		// Section heading, where department name listed and can be expanded/collapsed
		// TODO? Get callback outta HTML
		// TODO Don't do this label nesting, which makes querying a bit more difficult
		var head = [
			'<li><label><input id="', dept_id,'" type="checkbox" checked /> ',
			dept,
			'</label></li>'
		].join('')
		// Accumulate assets
		var body = ""
		for (var i in assets) {
			var status = 'black' // FIXME
			body += asset({
				id: '_'+assets[i].id,
				name: dept_id,
				title: status,
				label: assets[i].name,
				location: assets[i].location
			})
		}
		// Wrap in span for easy hiding
		body = ['<span id="', dept_id, '_set">', body, '</span>'].join('')
		// Section's unordered list
		var ul = ['<ul>', head, body, '</ul>'].join('')
		// Generated section
		return ul
	}

}