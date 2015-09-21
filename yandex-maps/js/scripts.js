(function($) {
	
	var App = {
	
		fullScreen: false,
		
		addDrawConturButton : function(myMap) {
			var ButtonLayout = ymaps.templateLayoutFactory.createClass(
				"<div id='draw-contur' class='btn--common draw-contur [if state.selected]btn--common-selected[endif]' title='$[data.title]'>" +
				"$[data.content]" +
				"</div>", {
					build: function () {
						ButtonLayout.superclass.build.call(this);
						$('#draw-contur').bind('click', this.drawContur);
					},
					drawContur : function(){
						
						// Создаем многоугольник без вершин.
						var myPolygon = new ymaps.Polygon([], {}, {
							// Курсор в режиме добавления новых вершин.
							editorDrawingCursor: "crosshair",
							// Максимально допустимое количество вершин.
							editorMaxPoints: 5,
							// Цвет заливки.
							fillColor: '#00FF00',
							// Цвет обводки.
							strokeColor: '#0000FF',
							// Ширина обводки.
							strokeWidth: 5
						});
						// Добавляем многоугольник на карту.
						myMap.geoObjects.add(myPolygon);

						// В режиме добавления новых вершин меняем цвет обводки многоугольника.
						var stateMonitor = new ymaps.Monitor(myPolygon.editor.state);
						stateMonitor.add("drawing", function (newValue) {
							myPolygon.options.set("strokeColor", newValue ? '#FF0000' : '#0000FF');
						});

						// Включаем режим редактирования с возможностью добавления новых вершин.
						myPolygon.editor.startDrawing();
						
					}
				}
			);
			var button = new ymaps.control.Button({
				data: {
					content: 'Нарисовать контур',
					title: 'Нарисовать контур'
				}
			}, {
				layout: ButtonLayout
			});
			myMap.controls.add(button, {
				left: 14,
				top: 60
			});
		},
		
		addSelectDirectionButton : function(myMap) {
			var button = new ymaps.control.Button({
				data: {
					content: 'Выбрать направление',
					title: 'Выбрать направление'
				}
			}, {
				layout: ymaps.templateLayoutFactory.createClass(
					"<div class='btn--common select-direction [if state.selected]btn--common-selected[endif]' title='$[data.title]'>" +
					"$[data.content]" +
					"</div>"
				)
			});
			myMap.controls.add(button, {
				left: 14,
				top: 160
			});
		},
		
		addZoomControl: function(myMap) {
		
			// Создадим пользовательский макет ползунка масштаба.
			var ZoomLayout = ymaps.templateLayoutFactory.createClass("<div>" +
					"<div id='zoom-in' class='btn--common btn-zoom'>+</i></div><br>" +
					"<div id='zoom-out' class='btn--common btn-zoom'>-</i></div>" +
				"</div>", {

				// Переопределяем методы макета, чтобы выполнять дополнительные действия
				// при построении и очистке макета.
				build: function () {
					// Вызываем родительский метод build.
					ZoomLayout.superclass.build.call(this);

					// Привязываем функции-обработчики к контексту и сохраняем ссылки
					// на них, чтобы потом отписаться от событий.
					this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
					this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

					// Начинаем слушать клики на кнопках макета.
					$('#zoom-in').bind('click', this.zoomInCallback);
					$('#zoom-out').bind('click', this.zoomOutCallback);
				},

				clear: function () {
					// Снимаем обработчики кликов.
					$('#zoom-in').unbind('click', this.zoomInCallback);
					$('#zoom-out').unbind('click', this.zoomOutCallback);

					// Вызываем родительский метод clear.
					ZoomLayout.superclass.clear.call(this);
				},

				zoomIn: function () {
					var map = this.getData().control.getMap();
					// Генерируем событие, в ответ на которое
					// элемент управления изменит коэффициент масштабирования карты.
					this.events.fire('zoomchange', {
						oldZoom: map.getZoom(),
						newZoom: map.getZoom() + 1
					});
				},

				zoomOut: function () {
					var map = this.getData().control.getMap();
					this.events.fire('zoomchange', {
						oldZoom: map.getZoom(),
						newZoom: map.getZoom() - 1
					});
				},
				
			});
			
			var zoomControl = new ymaps.control.SmallZoomControl({
				layout: ZoomLayout
			});
			
			myMap.controls.add(zoomControl, {
				left: 14,
				top:278
			});
			
		},
	
		addSearchControl: function(myMap) {
			// Создание макета для поискового контрола.
			MySearchControlLayout = ymaps.templateLayoutFactory.createClass(
				'<form class="form-search">' +
					'<div class="input-append">' +
						'<input type="text" id="typeahead" class="search-query" data-provide="typeahead">' +
						'<button type="submit" class="btn--common btn--common--search">Показать</button>' +
					'</div>' +
				'</form>', {
				build: function () {
					MySearchControlLayout.superclass.build.call(this);
					this.onSubmit = ymaps.util.bind(this.onSubmit, this);
					this.onFieldChange = ymaps.util.bind(this.onFieldChange, this);
					this.dataSource = ymaps.util.bind(this.dataSource, this);
					this.form = $('.form-search')
						.on('submit', this.onSubmit);
					this.field = $('.search-query')
						.on('change', this.onFieldChange)
						.typeahead({source: this.dataSource, items: 5, minLength: 3});
					this.getData().state.events.add('change', this.onStateChange, this);
				},
				clear: function () {
					this.getData().state.events.remove('change', this.onStateChange, this);
					this.field.off('**');
					this.form.off('submit', this.onSubmit);
					MySearchControlLayout.superclass.clear.call(this);
				},
				onFieldChange: function () {
					if(this.field.is(':focus')) {
						this.form.trigger('submit');
					}
				},
				dataSource: function (query, callback) {
					var provider = this.getData().control.options.get('provider');
					ymaps.geocode(query, {provider: provider})
						.then(function (res) {
							var results = [];
							res.geoObjects.each(function (geoObject) {
								var props = geoObject.properties,
									text = props.get('text'),
									name = props.get('name'),
									description = props.get('description'),
									tags = $.map(props.get('metaDataProperty.PSearchObjectMetaData') &&
											props.get('metaDataProperty.PSearchObjectMetaData.Tags') || [], function (t) { return t.tag });
								results.push(
									text || [name, description]
										.concat(tags)
										.filter(Boolean)
										.join(', ')
								);
							});
							callback(results);
						});
				},
				onSubmit: function (e) {
					e.preventDefault();
					this.events.fire('search', {
						request: this.field.val()
					});
				},
				onStateChange: function () {
					var results = this.getData().state.get('results'),
						result = results && results[0];
					if(result) {
						result.options.set('preset', 'twirl#darkblueStretchyIcon');
						result.properties.set('iconContent', result.properties.get('name'));
					}
				},
				onShowResult: function (e) {
					e.get('target').events.remove('mapchange', this.onShowResult, this);
					e.get('target').balloon.open();
				}
			});
			searchControl = new ymaps.control.SearchControl({
				layout: MySearchControlLayout
			});
			myMap.controls.add(searchControl, {left: 14, top: 10});
			
		},
		
		addFullScreenButton: function(myMap) {

			var that = this
			
			var ButtonLayout = ymaps.templateLayoutFactory.createClass(
				"<div class='btn--common' id='fullScreen'>$[data.content]</div>", {
					build: function () {
						ButtonLayout.superclass.build.call(this);
						$('#fullScreen').bind('click', this.fullScreenClick);
					},
					fullScreenClick : function(){
						that.fullScreen = !that.fullScreen;
						if (that.fullScreen) {
							$('#map').removeClass('smallMap');
						} else {
							$('#map').addClass('smallMap');
						}
						myMap.container.fitToViewport();
					}
				}
			);
			
			var button = new ymaps.control.Button({
				data: {
						content: 'Развернуть карту на весь экран',
						title: 'Развернуть карту на весь экран'
					}
				}, {
				layout: ButtonLayout
			});
			myMap.controls.add(button, {
				left: 58,
				bottom: 24
			});
		}
		
	};
	
	ymaps.ready(init);
			
	function init () {
		var myMap = new ymaps.Map('map', {
			center: [55.751574, 37.573856],
			zoom: 9,
			controls: []
		});

		App.addZoomControl(myMap);
		
		App.addSearchControl(myMap);
			
		App.addDrawConturButton(myMap);
		
		App.addSelectDirectionButton(myMap);
		
		App.addFullScreenButton(myMap);
		
		
	}
})(jQuery)