/**
 * @author Ezra Velazquez
 */

var CANVAS_RACE_INFO = function() {
	var heat = "3";
	var race_name = "  400   DASH";
	var race_measurement = "M";
	var clock_string = "00:16.07";
	
	// Simple way to attach js code to the canvas is by using a function  
	function sketchProc(processing) { 
	  var font;
	  var background = "#161616";
	  processing.setup = function() {
	  	processing.size(300,140);
	  	processing.colorMode(processing.RGB);
	  	processing.background(22,22,22);
	  	font = processing.loadFont("Futura");
	  }
	   
	  // Override draw function, by default it will be called 60 times per second  
	  processing.draw = function() {  
	    processing.background(22,22,22);
	    
	    function graphics() {
	    	rectangle();
	    	diamond();
	    	
	    	function rectangle() {
	    		processing.pushMatrix();
	    			processing.noStroke();
	    			processing.fill(232,12,122);
	    			processing.translate(80, 30);
	    			processing.rect(0,0,200,80);
	    		processing.popMatrix();
	    	
	    	}
	    	function diamond() {
	    		processing.pushMatrix();
	    			processing.noStroke();
	    			processing.fill(184,232,37);
	    			processing.translate(70,15);
	    			processing.rotate(95);
	    			processing.rect(0,0,80,80);
	    		processing.popMatrix();
	    	
	    	}
	    }
	    
	    function text() {
	    	updateInfoText(48, heat, [56,80], [232,12,122]);
	    	updateInfoText(12, "HEAT", [56,95], [232,12,122]);
	    	updateInfoText(22, race_name, [135,65], [184,232,37]);
	    	updateInfoText(16, race_measurement, [190,65],[184,232,37]);
	    	updateInfoText(22, "  "+ clock_string +" +",[135,95],[255,195,0]);
	    	
	    	function updateInfoText(font_size, text_to_display, coordinates, text_color) {
	    		processing.pushMatrix();
	    			processing.translate(coordinates[0], coordinates[1]);
	    			processing.fill(text_color[0],text_color[1],text_color[2])
	    			processing.textFont(font, font_size);
	    			processing.textAlign(processing.LEFT);
	    			processing.text(text_to_display, 0, 0);
	    		processing.popMatrix();
	    	}
	    }
	    
	    graphics();
	    text();
	     
	  };  
	    
	}  
	  
	var canvas = document.getElementById("canvas_race_info");  
	// attaching the sketchProc function to the canvas  
	var p = new Processing(canvas, sketchProc);  
	// p.exit(); to detach it
	
	return {
		updateHeat : function(heat_number) {
				heat = heat_number;
		},
		updateRaceName : function(race_length) {
			raceName();
			raceMeasurement();
			
			function raceName() {
				var string_length = "" + race_length;
				switch(string_length.length) {
					case 1:
						race_name = " MILE   ";
						break;
					case 2:
						race_name ="    "+race_length+"   ";
						break;
					case 3:
						race_name ="  "+race_length+"   ";
						break;
					case 4:
						race_name = ""+race_length+ "   ";
						break;
					default:
						//nothing
				}
			}
			
			function raceMeasurement() {
				if(race_length < 800 && race_length > 1) {
					race_name += "DASH";
				}
				else {
					race_name += "RUN";
				}
				
				if(race_length === 600) {
					race_measurement = "Y";
				}
				else if(race_length === 1) {
					race_measurement = "";
				}
				else {
					race_measurement = "M";
				}
			}
		},
		clockStart : function(end_time) {
			//startProcessingClock(end_time);
		}
	};
	
}();
