
	'use strict';
	
	$(document).ready(function(){
		// WINDOWS
		//======================================================================================
		var snap_window = function(){
			if($(window).width()>1199 ) {
				$('.window').windows({
       	 			snapping: true,
        			snapSpeed: 500,
        			snapInterval: 1200,
        			onScroll: function(scrollPos){
            			// scrollPos:Number										
        			},
        			onSnapComplete: function($el){
            			// after window ($el) snaps into place
        			},
        			onWindowEnter: function($el){
            			// when new window ($el) enters viewport
        			}
    			})
			}
			
		}
		
		//Execute on load
		snap_window();
		
		//Execute on window resize
		$(window).resize(function() {	
			snap_window();
		});
	});