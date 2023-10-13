	
	'use strict';
	
	$(document).ready(function(){		
		
		// ADD CLASS TO BODY
		//==================================================================================
		var bodyclass = function(){
			if ( window.innerWidth > 1199 ) {
				if (!$("body").hasClass("fullsize"))
				{
					$("body").addClass("fullsize");
				}
			}
			else
			{
				$("body").removeClass("fullsize");
			}
		}	
		
		//Execute on load
		bodyclass();
		
		//Execute on window resize
		$(window).resize(function() {	
			bodyclass();		
		});
	});