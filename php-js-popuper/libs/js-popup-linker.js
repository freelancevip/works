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
	var JS_Popup_Linker = ( function( window ) {
		
		function MyModule(options) {
			
			
			this.init = function init() {
				this.attachEvents();
			};
			
			this.attachEvents = function attachEvents() {
				$(options.selector).on(options.action, function(e) {
					e.preventDefault();
					var elemId   = $(this).attr(options.tag);
					var url      = $.trim(elemId.replace(/-st-.*/, '') + '.php');
					var reqData = {
						mode : 'one_article',
						articleId : elemId
					};
					$.get( url, reqData, function(response) {
						var $content = $(options.notFoundText);
						if(response != '') {
							$content = $(response);
						}
						$.featherlight($content, {
							afterContent: function() {
								$(".featherlight-content").css("max-width", options.maxWidth);
								$(".featherlight-content").css("max-height", options.maxHeight);
							}
						});
						}
					);
					
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