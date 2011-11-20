/**
 * @author Ezra Velazquez
 */

var CANVAS_RACE_LANE = function(_canvas, _length,_school) {
	var canvas;
	var p;
	var highlight_state = [24,156,255];
	var normal_state = [4,32,53];
	var position_color = [232,12,122];
	var current_state = normal_state;
	var current_position = 0;
	var img;
	
	// Simple way to attach js code to the canvas is by using a function  
	function sketchProc(processing) { 
	  var font;
	  var background = "#161616";
	  processing.setup = function() {
	  	processing.size(900,50);
	  	processing.colorMode(processing.RGB);
	  	processing.background(22,22,22);
	  	font = processing.loadFont("Futura");
	  	img = processing.loadImage("assets/small_"+_school.toLowerCase()+".png");
	  }
	   
	  // Override draw function, by default it will be called 60 times per second  
	  processing.draw = function() {  
	    processing.background(22,22,22);
	    drawTrack(_length);
	    drawPosition();
	    
	    function drawTrack(_length) {
	    	processing.pushMatrix();
	    		processing.stroke(current_state[0],current_state[1],current_state[2]);
	    		processing.strokeWeight(10);
	    		processing.translate(30,processing.height/2);
	    		processing.strokeCap(processing.SQUARE);
	    		processing.line(0,0, 840,0);
	    	processing.popMatrix();
	    }
	    
	    function drawPosition() {
	    	processing.pushMatrix();
	    		//processing.ellipseMode(processing.CENTER);
	    		//processing.noStroke();
	    		//processing.fill(position_color[0], position_color[1], position_color[2]);
	    		processing.translate(30+current_position, processing.height/2);
	    		//processing.ellipse(0,0,20,20);
	    		processing.imageMode(processing.CENTER);
	    		processing.image(img,0,0);
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
	
	init(_canvas);
	  
	return {
		updateMarker : function(_x) {
			current_position = _x;
		},
		updateLaneColor : function(_selected) {
			if(_selected === true) {
				current_state = highlight_state;
			}
			else {
				current_state = normal_state;
			}
		},
		destroyLane : function() {
			p.exit();
		}
	};
	
};