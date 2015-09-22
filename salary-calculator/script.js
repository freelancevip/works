jQuery(document).ready(function(){
	$(function() {
	var options = {
		per_hour: 95,
		courses: {
			hrn: 1,
			usd: 22,
			rur: 0.33
		}
	};
	var SalaryCalculator = {
		currency:  $(".currency.active").data('currency'),
		humanCurrency: $(".currency.active").data('humanCurrency'),
		currencyImgSrc: "100hrn.png",
		perDayText: '',
		currencyImgClass: 'money-blank hrn',
		handleEvents: function() {
			var that = this;
			$("#period").slider({
				value:2,
				min:1,
				max:6,
				step:1,
				slide: function( event, ui ) {
					if(ui.value < 2) {
						return false;
					}
					if(ui.value >5) {
						return false;
					}
					var hours = $("#hours").slider("value");
					var period = ui.value;
					that.calculateHours(hours);
					that.calculateMoney(hours, period)
				}
			});
			$("#hours").slider({
				value:4,
				min:1,
				max:24,
				step:1,
				slide: function( event, ui ) {
					/* if(ui.value < 0) {
						return false;
					}
					if(ui.value >25) {
						return false;
					} */
					var hours = ui.value;
					var period = $("#period").slider("value");
					that.calculateHours(hours);
					that.calculateMoney(hours, period)
				}
			});
			$(".currency").on("click", function(e){
				$(".currency").removeClass("active");
				$(this).addClass("active");
				that.currency = $(this).data('currency');
				that.humanCurrency = $(this).data('humanCurrency');
				that.currencyImgSrc = "100"+$(this).data('currency')+".png";
				that.currencyImgClass = 'money-blank ' + $(this).data('currency');
				var hours = $("#hours").slider("value");
				var period = $("#period").slider("value");
				that.calculateHours(hours);
				that.calculateMoney(hours, period)
			});
			
			var hours = $("#hours").slider("value");
			var period = $("#period").slider("value");
			that.calculateHours(hours);
			that.calculateMoney(hours, period);
		},
		calculateHours: function(h) {
			var totalHours = h;
			var that = this;
			var html = '';
			if(h == 1 || h==21) {
				html = h+" час";
			} else if(h==2 || h==3 || h==4 || h>=22) {
				html = h+" часа";
			} else {
				html = h+" часов";
			}
			$("#result-hours").html(html + " в день");
		},
		calculateMoney: function(hours, period) {
			
			var money = 0;
			var total = 0;
			var that = this;
			switch (period) {
				case 2:
					total = options.per_hour * hours / options.courses[that.currency];
					money = that.formatCurrency(total) + that.humanCurrency + " в день";
					break;
				case 3:
					total = options.per_hour * hours * 7 / options.courses[that.currency];
					money = that.formatCurrency(total) + that.humanCurrency + " в неделю";
					break;
				case 4:
					total = options.per_hour * hours * 30 / options.courses[that.currency];
					money = that.formatCurrency(total) + that.humanCurrency + " в месяц";
					break;
				case 5:
					total = options.per_hour * hours * 365 / options.courses[that.currency];
					money = that.formatCurrency(total) + that.humanCurrency + " в год";
					break;
			}
			that.setMoneyImages(total, period);
			console.log()
			$("#result-salary").html(money)
		},
		setMoneyImages : function(moneyCount, period) {
			var that = this;
			var moneyCount = parseInt(Math.pow(moneyCount, 0.3));
			$("#money-img").html('');
			for(var i=0; i<=moneyCount; i++) {
				//$("#money-img").append("<img src='"+that.currencyImgSrc+"' style='left:"+i*5+"px;'>");
				$("#money-img").append("<div class='"+that.currencyImgClass+"' style='left:"+i*5+"px;'>");
			}
		},
		formatCurrency: function(total) {
			total = Math.abs(total);
			return parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ").replace(/\.00/g, '').toString();
		},
		init: function(){
			this.handleEvents();
		}
	};
	SalaryCalculator.init();
	
});
})