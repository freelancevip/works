$(document).ready(function(){
	$("#myTable").tablesorter();
	
	// Aug 24, 2015
	var options = {
		dateFormat: "M dd, yy"
	};
	$("#date_from").datepicker(options);
	$("#date_to").datepicker(options);
	
	$("#proxy-toggler").click(function(){
		$("#proxy-container").toggleClass("hidden")
		$("#info-container").addClass("hidden")
	})
	
	$("#info-toggler").click(function(){
		$("#proxy-container").addClass("hidden")
		$("#info-container").toggleClass("hidden")
	})
	
})