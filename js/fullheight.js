	
	'use strict';
		
	$(document).ready(function(){		
		// FULLHEIGHT
		//==================================================================================
		var fheight = $(window).height();
		var full_height = function(){
			if ( window.innerWidth > 1199 || device.landscape() && window.innerWidth <= 640 ) {
				fheight = $(window).height();				
				
				// Preloader, Slider, Location Height
				$("#preloader-overlay, #slider, #location").css("height",fheight);	
				$("#preloader-overlay, #slider, #location").css("margin-top",0);
				
				// Others
				if ($("body").hasClass("top-bar"))
				{
					$(".fullsize .fullheight").css("height",fheight - $("#logo").innerHeight());	
					$(".fullsize .fullheight").css("margin-top",0);
				}
				else
				{
					$(".fullsize .fullheight").css("height",fheight);	
					$(".fullsize .fullheight").css("margin-top",0);
				}
			
			}
			else
			{
				fheight = $(window).height()-$(".sidebar-menuicon").height();
				
				// Preloader Height 
				$("#preloader-overlay, #location").css("height",$(window).height());
				$("#preloader-overlay, #location").css("margin-top",0);	
				
				// Slider Height
				$("#slider").css("height",fheight);	
				$("#slider").css("margin-top",$(".sidebar-menuicon").height());	
				
				// Others
				$(".fullheight").css("height","auto");
				$(".fullheight").css("margin-top",0);
			}
		}
		
		//Execute on load
		full_height();
		
		//Execute on window resize
		$(window).resize(function() {	
			full_height();
		});
		
		
	});