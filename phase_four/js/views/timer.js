/*
 * Project:     RunLikeTheWind
 * Class:       Data Representation Final | ITP Fall 2011
 * Description: A visual representation of the race results of the Men's Meet of the Hearts
 * Website:     http://ezraezraezra.com/run
 * 
 * Author:      Ezra Velazquez
 * Website:     http://ezraezraezra.com
 * Date:        December 2011
 * 
 */ 
/**
 * @author Ezra Velazquez
 */

var CANVAS_RACE_TIMER = function() {
	var clock_string = "00:16.07";
	var current_time = {
		ms : 0, 
		sec : 0,
		min : 0,
		start : false,
		reset : false,
		time_string : "00:00:00",
		time_wording : "start"
	}
	
	$(document).ready(function() {
		init();
	});
	
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
	    	// updateInfoText(48, heat, [56,80], [232,12,122]);
	    	// updateInfoText(12, "HEAT", [56,95], [232,12,122]);
	    	// updateInfoText(22, race_name, [135,65], [184,232,37]);
	    	// updateInfoText(16, race_measurement, [190,65],[184,232,37]);
	    	// updateInfoText(22, "  "+ clock_string +" +",[135,95],[255,195,0]);
	    	updateInfoText(32, current_time.time_string, [135,65], [184, 232, 37]);
	    	updateInfoText(22, current_time.time_wording, [52,80], [232,12,122]);
	    	
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
	    
	    function updateTime() {
	    	if(current_time.reset === false) {
		    	if (current_time.start === true) {
		    		if(current_time.ms < 60) {
		    			current_time.ms += 1;
		    		}
		    		else if(current_time.ms == 60) {
		    			current_time.ms = 0;
		    			if(current_time.sec < 60) {
		    				current_time.sec += 1;
		    			}
		    			else if(current_time.sec == 60) {
		    				current_time.sec = 0;
		    				current_time.min +=1;
		    				if(current_time.min == 60) {
		    					current_time.min = 0;
		    				}
		    			}
		    		}
		    	
		    	current_time.time_string =  timeToString(current_time.min) + ":" + timeToString(current_time.sec) + ":" + timeToString(current_time.ms);	
		    		
		    	}
	    	}
	    	else {
	    		current_time.time_string = "00:00:00";
	    	}
	    	
	    	function timeToString(given_number) {
	    		if(given_number < 10) {
	    			return "0"+given_number;
	    		}
	    		else {
	    			return given_number;
	    		}
	    	}
	    }
	    
	    graphics();
	    text();
	    
	    updateTime();
	     
	  };  
	    
	}  
	 
	function init() {  
		var canvas = document.getElementById("canvas_race_info");  
		// attaching the sketchProc function to the canvas  
		var p = new Processing(canvas, sketchProc);  
		// p.exit(); to detach it
	}
	
	function clockStart() {
		current_time.start = true;
		current_time.reset = false;
		current_time.time_wording = "stop";
	}
	function clockStop() {
		current_time.start = false;
		current_time.reset = false;
		current_time.time_wording = "start";
	}
	
	return {
		clockReset : function() {
			current_time.start = false;
			current_time.reset = true;
			current_time.ms = 0;
			current_time.min = 0;
			current_time.sec = 0;
			current_time.time_wording = "start";
		},
		clockStatus : function() {
			if(current_time.start === true) {
				clockStop();
			}
			else {
				clockStart();
			}
			
			return current_time.start;
		}
	};
	
}();
