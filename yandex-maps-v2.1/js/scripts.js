(function($) {
	var MapApp = {
		myMap : false,
		getMap: function() {
			return this.myMap;
		},
		initMap: function() {
			this.myMap = new ymaps.Map("map", {
				center: [55.76, 37.64],
				zoom: 10,
				controls: []
			});
			
		},
		geocode: function(str) {
			var that = this;
			var myGeocoder = ymaps.geocode(str);
			myGeocoder.then(function(res){
				that.myMap.setCenter(res.geoObjects.get(0).geometry.getCoordinates());
				var myPlacemark = new ymaps.Placemark(
				  res.geoObjects.get(0).geometry.getCoordinates(),
				  {},
					{
					iconLayout: 'default#image',
					iconImageHref: './icon.png',
					iconImageSize: [40, 40],
					iconImageOffset: [-20, -20],
					// Определим интерактивную область над картинкой.
					iconShape: {
						type: 'Circle',
						coordinates: [0, 0],
						radius: 20
					}
				  }
				);
				that.myMap.geoObjects.add(myPlacemark);
				console.log(that.myMap)
			}, function(err) {
				alert("Ошибка геокодирования");
			})
		},
		drawPoligon: function() {
			var myMap = this.myMap;
			var myPolygon = new ymaps.Polygon([], {}, {
				editorDrawingCursor: "crosshair",
				editorMaxPoints: 5,
				fillColor: '#00FF00',
				strokeColor: '#0000FF',
				strokeWidth: 5
			});
			myMap.geoObjects.add(myPolygon);
			var stateMonitor = new ymaps.Monitor(myPolygon.editor.state);
			stateMonitor.add("drawing", function (newValue) {
				myPolygon.options.set("strokeColor", newValue ? '#FF0000' : '#0000FF');
			});
			myPolygon.editor.startDrawing();
		},
		init: function() {
			this.initMap();
			Controls.events();
			//console.log()
		}
	};
	
	var Controls = {
		fullScreenMap: false,
		events: function(){
			$("#zoom-in").on("click", function(){
				MapApp.getMap().setZoom(MapApp.getMap().getZoom() + 1);
			});
			$("#zoom-out").on("click", function(){
				MapApp.getMap().setZoom(MapApp.getMap().getZoom() - 1);
			});
			$(".search-button").on("click", function(){
				MapApp.geocode($("#search-query").val());
			});
			$("#draw-contur").on("click", function(){
				MapApp.drawPoligon();
			});
			$("#fullscreen").on("click", function(){
				this.fullScreenMap = !this.fullScreenMap;
				$("#map-container").toggleClass("full-page");
				MapApp.myMap.container.fitToViewport();
				if(this.fullScreenMap) {
					$("#fullscreen").text($("#fullscreen").data("fullText"))
				} else {
					$("#fullscreen").text($("#fullscreen").data("smallText"))
				}
			});
		}
	};
	
	ymaps.ready(function () {
		MapApp.init();
	});
	
})(jQuery)