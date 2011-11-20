/**
 * @author Ezra Velazquez
 */
/**
 * @author Ezra Velazquez
 */

var CANVAS_LANE_INFO = function() {
	var canvas;
	var p;
	var text_color = [255,195,0];
	var divider_color = [232,12,122];
	var img;
	var school = "carleton";
	var runner = "Ezra Velazquez";
	var time = "00:55.26";
	var year = "SR";
	var position = "15";
	var position_string = "TH";
	
	$(document).ready(function() {
		init("canvas_lane_info");
	});
	
	// Simple way to attach js code to the canvas is by using a function  
	function sketchProc(processing) { 
	  var font;
	  var background = "#161616";
	  processing.setup = function() {
	  	processing.size(450,100);
	  	processing.colorMode(processing.RGB);
	  	processing.background(22,22,22);
	  	font = processing.loadFont("Futura");
	  	img = processing.loadImage("assets/big_"+school.toLowerCase()+".png");
	  }
	   
	  // Override draw function, by default it will be called 60 times per second  
	  processing.draw = function() {  
	    processing.background(22,22,22);
	    //drawTrack(_length);
	    //drawPosition();
	    drawDividers();
	    drawImage();
	    drawText();
	    
	    
	    function drawDividers() {
	    	// Main divider
	    	processing.pushMatrix();
	    		processing.stroke(divider_color[0], divider_color[1], divider_color[2]);
	    		processing.strokeWeight(5);
	    		processing.translate(100,50);
	    		processing.strokeCap(processing.ROUND);
	    		processing.line(0,0,250,0);
	    	processing.popMatrix();
	    	// Image divider
	    	processing.pushMatrix();
	    		processing.translate(100,10);
	    		processing.line(0,0,0,80);
	    	processing.popMatrix();
	    	// Time divider
	    	processing.pushMatrix();
	    		processing.translate(225,processing.height/2);
	    		processing.line(0,0,0,40);
	    	processing.popMatrix();
	    	// Year divider
	    	processing.pushMatrix();
	    		processing.translate(265, processing.height/2);
	    		processing.line(0,0,0,40);
	    	processing.popMatrix();
	    }
	    
	    function drawImage() {
	    	processing.pushMatrix();
	    		processing.translate(60,processing.height/2);
	    		processing.imageMode(processing.CENTER);
	    		processing.image(img,0,0);
	    	processing.popMatrix();
	    }
	    function drawText() {
	    	// Name
	    	updateInfoText(18, runner.toUpperCase(), [110,processing.height/2 - 10]);
	    	// Time
	    	updateInfoText(24, time, [110,processing.height/2 + 30]);
	    	// Year
	    	updateInfoText(18, year.toUpperCase(), [235, processing.height/2 + 30]);
	    	// Position
	    	updateInfoText(24, position, [272, processing.height/2 + 30]);
	    	// Position string
	    	updateInfoText(18, position_string, [304, processing.height/2 + 30]);
	    }
	    
	    function updateInfoText(font_size, text_to_display, coordinates) {
    		processing.pushMatrix();
    			processing.translate(coordinates[0], coordinates[1]);
    			processing.fill(text_color[0],text_color[1],text_color[2])
    			processing.textFont(font, font_size);
    			processing.textAlign(processing.LEFT);
    			processing.text(text_to_display, 0, 0);
    		processing.popMatrix();
	    }
	    
	  }; 
	}
	
	function init(_canvas) {
		console.log(_canvas);
		canvas = document.getElementById(_canvas);
		// attaching the sketchProc function to the canvas 
		p = new Processing(canvas, sketchProc);
		// p.exit(); to detach it
	}
	
	//init(_canvas);
	  
	return {
		update : function(data) {
			console.log("Update lane info box");
			school = data.school;
			runner = data.runner;
			time = data.time;
			year = data.year.toUpperCase();
			position = data.position;
			if( (position >= 4 && position <= 20) || (position >= 24 && position <= 30) || (position >=34 && position <= 40)) {
				position_string = "TH";
			}
			else if(position === 1 || position === 21 || position === 31 || position === 41) {
				position_string = "ST";
			}
			else if(position === 2 || position === 22 || position === 32 || position === 41) {
				position_string = "ND";
			}
			else if(position === 3 || position === 23 || position === 33 || position === 43) {
				position_string = "RD";
			}
		}
	};
	
}();