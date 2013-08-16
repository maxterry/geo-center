Map = {

	_host: 'https://www.maxwellterry.com',
	//location.hostname == 'http://0.0.0.0' && 'https://www.maxwellterry.com' || '';

	_self: {},

	_create: function() {
		OpenLayers.DOTS_PER_INCH = 90.71428571428572
		this._self = new OpenLayers.Map('screen', { // TODO dynamic
			controls: [],
			maxExtent: new OpenLayers.Bounds(
				-2.003750834E7, -2.003750834E7, 
				2.0037508345578495E7, 2.0037508345578495E7
			),
			units: 'meters',
			resolutions: [
				156543.033928041, 78271.51696402048, 39135.75848201023, 
				19567.87924100512, 9783.93962050256, 4891.96981025128, 
				2445.98490512564, 1222.99245256282, 611.49622628141, 
				305.7481131407048, 152.8740565703525, 76.43702828517624, 
				38.21851414258813, 19.10925707129406, 9.554628535647032, 
				4.777314267823516, 2.388657133911758, 1.194328566955879, 
				0.5971642834779395, 0.29858214173896974, 0.14929107086948487
			],
			projection: new OpenLayers.Projection('EPSG:900913')
		})
	},

	_controls: function() {
		var overview = new OpenLayers.Control.OverviewMap({
			size: new OpenLayers.Size(300, 200),
			maximized: false,
			minRectSize: 0,
			autoPan: true,
			// layers: [],
			MapOptions: {
				projection: new OpenLayers.Projection('EPSG:900913'),
				displayProjection: new OpenLayers.Projection('EPSG:4326'),
				units: 'm',
				numZoomLevels: 1,
				resolutions: [38.218514137268066]
			}
		})
		this._self.addControls([
			new OpenLayers.Control.Navigation(),
			new OpenLayers.Control.PanZoomBar(),
			new OpenLayers.Control.KeyboardDefaults(),
			// overview
		])
		// TODO
		// the_map = this._self
		// window.infoControl = new OpenLayers.Control.WMSGetFeatureInfo({
		//     url: this._host + '/geoserver/geocenter/wms', 
		//     title: 'Infrastructure',
		//     layers: [roads, buildings],
		//     queryVisible: true,
		//     eventListeners: {
		//         getfeatureinfo: function(event) {
		//             if (event.text.length > 978) {  // 977 = "blank"
		//                 var popup = new OpenLayers.Popup.Anchored('title', the_map.getLonLatFromPixel(event.xy), null, event.text, null, true) // onFeatureUnSelect(evt))
		//                 popup.autoSize = true
		//                 the_map.addPopup(popup)
		//             }
		//         },
		//         beforegetfeatureinfo: function(event) {
		//             // console.log(event)
		//         },
		//         nogetfeatureinfo: function(event) {
		//             // console.log(event)
		//         }
		//     }
		// });
		// this._self.addControl(infoControl)
		// infoControl.activate()
	},

	load: function() {
		var qs = Prefs.decode()
		Module.load(qs.module)
		Component.load(qs.component)
		Layers.load(qs.layers)
		Locations.load(qs.locations)
		// Assets.load(qs.assets)
	},

	init: function() {
		this._create()
		this._controls()
		Layers.init()
		Locations.init()
		Assets.init()
		this.load()
	},

	bounds: function() {
		return this._self.getExtent()
	}

}