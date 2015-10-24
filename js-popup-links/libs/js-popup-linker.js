(function($) {
	
	/* Настройки */
	var options = {
		selector : '.open-law',
		tag      : 'date-link',
		action   : 'click',
		maxWidth : '600px',
		maxHeight: '400px',
		notFoundText : '<h3>Информация не найдена!</h3>'
	};
	
	/* Main class */
	var JS_Popup_Linker = ( function( window, undefined ) {

		$("body").remove("#JS_Popup_Linker");
		var hidDiv = $("<div id='JS_Popup_Linker'></div>").appendTo($("body")).hide();

		function MyModule(options) {
			
			
			this.init = function init() {
				this.attachEvents();
			};
			
			this.attachEvents = function attachEvents() {
				$(options.selector).on(options.action, function(e) {
					e.preventDefault();
					var elemId = "#" + $(this).attr(options.tag);
					
					var url = elemId.replace(/#/, '').replace(/-st-.*/, '') + '.php'
					
					$.get(url, function(resp) {
						var data = $(resp);
						hidDiv.html(data);
						var res = $("#JS_Popup_Linker").find(elemId);
						if(res.text() == '')
							res = $(options.notFoundText);
						$.featherlight(res, {
							afterContent: function() {
								$(".featherlight-content").css("max-width", options.maxWidth);
								$(".featherlight-content").css("max-height", options.maxHeight);
							}
						});
					});
					
					return false;
				})
			};
			
			this.init();
			
		}

		return MyModule;

	} )( window );
	
	/* Use it */
	var jpl = new JS_Popup_Linker(options);
	
})(jQuery)