/* Calculator options */
var options = {
	id: "calculator",
	currency: ' руб.',
	beforePrice: 'Стоимость ',
	prices: {
		'10x15': {
			price: 99,
			rounds: 4,
			lamination: 26
		},
		'20x20': {
			price: 115,
			rounds: 4,
			lamination: 30
		},
		'20x30': {
			price: 139,
			rounds: 4,
			lamination: 36
		}
	}
};
(function($){
	/*
	 * Simple calculator
	 */
	var Calculator = {
		attachEvents: function(){
			var options= this.options;
			var data   = false;
			var that   = this;
			$("#" + options.id + " input").on("change", function(){
				data = {
					size      : $("#" + options.id + " input[type=radio]:checked").val(),
					lamination: $("#lamination").is(':checked'),
					rounds    : $("#rounds").is(':checked')
				};
				that.calculate(data);
			})
		},
		calculate: function(data) {
			var options= this.options;
			var currentPrices = options.prices[data.size];
			var result = currentPrices.price;
			result = data.rounds ? result + currentPrices.rounds : result;
			result = data.lamination ? result + currentPrices.lamination : result;
			$("#result").html(options.beforePrice + result + options.currency);
		},
		init: function(options) {
			this.options = options;
			this.attachEvents();
		}
	};
	
	Calculator.init(options);
	
})(jQuery)