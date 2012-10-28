$S(document).ready(function() {
	
	// Expand Panel
	$S(".open").click(function(){
		$S("div.panel").slideDown("slow");
	
	});	
	
	// Collapse Panel
	$S(".close").click(function(){
		$S("div.panel").slideUp("slow");	
	});		
	
	// Switch buttons from "Log In | Register" to "Close Panel" on click
	$S(".toggle a").click(function () {
		$S(".toggle a").toggle();
	});		
		
});