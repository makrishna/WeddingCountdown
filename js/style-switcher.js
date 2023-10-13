'use strict';
	
// Style Switcher
//==================================================================================
$(document).ready(function () {
	var clicked = 0;
	$('#theme_options').click(function(){
		if (clicked == 0)
		{
			$( "#style_switcher" ).animate({ "right": "0px" }, "fast" );
			clicked = 2;
			return false;
		}
		else
		{
			$( "#style_switcher" ).animate({ "right": "-82px" }, "fast" );
			clicked = 0;
			return false;
		}
	});
	
	
	$('#pink').click(function()
	{
		$('link[rel*=jquery]').remove();
		$('head').append('<link rel="stylesheet jquery" href="css/skin/pink.css" type="text/css" />');
		//$("#nav").hide().fadeIn('fast');
		return false;
	});
		
	$('#purple').click(function()
	{
		$('link[rel*=jquery]').remove();
		$('head').append('<link rel="stylesheet jquery" href="css/skin/purple.css" type="text/css" />');
		//$("#nav").hide().fadeIn('fast');
		return false;
	});
	
	$('#reset').click(function()
	{
		$('link[rel*=jquery]').remove();
		//$("#nav").hide().fadeIn('fast');
		return false;
	});
	
	
});