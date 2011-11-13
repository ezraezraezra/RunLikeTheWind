/**
 * @author Ezra Velazquez
 */

var CANVAS_LEGEND = function() {
	// Simple way to attach js code to the canvas is by using a function  
	function sketchProc(processing) { 
	  var font;
	  var background = "#161616";
	  processing.setup = function() {
	  	processing.size(900,150);
	  	processing.colorMode(processing.RGB);
	  	processing.background(22,22,22);
	  	font = processing.loadFont("Futura");
	  	processing.textFont(font, 32);
	  	processing.text("word", 15, 50);
	  }
	   
	  // Override draw function, by default it will be called 60 times per second  
	  processing.draw = function() {  
	    processing.background(22,22,22);
	    function scale() {
	    	// Bar
	    	processing.pushMatrix();
	    	processing.stroke(255,195,0);
	    	processing.strokeWeight(10);
	    	processing.translate(30,processing.height/2);
	    	processing.strokeCap(processing.SQUARE);
	    	processing.line(0,0, 840,0);
	    	processing.popMatrix();
	    	
	    	// Makers
	    	function markers(meters,position,measurement) {
	    		var yText;
	    		var yards;
	    		var xMarker
	    		
	    		if(position === 0) {
	    			yText = 0;
	    		}
	    		else {
	    			yText = -20;
	    		}
	    		
	    		if(measurement.charAt(0) == 'm') {
	    			yards = metersToYards(meters);
	    		}
	    		else {
	    			yards = meters;
	    			meters = yardsToMeters(yards);
	    		}
	    		
	    		xMarker = processing.map(meters, 0, 5000, 0, 840);
	    		
	    		processing.pushMatrix();
	    			processing.translate(30, 45);
		    		
		    		processing.stroke(255,195,0);
		    		processing.strokeWeight(4);
		    		processing.strokeCap(processing.ROUND);
		    		processing.textFont(font, 12);
		    		processing.textAlign(processing.CENTER);
		    		
		    		// Meters Marker
		    		processing.text(meters,xMarker, yText);
		    		// Yards Marker
		    		processing.text(yards, xMarker, 70 -(yText));
		    		// Marker
		    		processing.line(xMarker,10,xMarker, 50);
	    		processing.popMatrix();
	    		
	    		function metersToYards(meters) {
	    			return Math.round(meters * 1.0936133);
	    		}
	    		function yardsToMeters(yards) {
	    			return Math.round(yards * 0.9144);
	    		}
	    	}
	    	
	    	markers(   0,1,'m');
	    	markers(  55,0,'m');
	    	markers( 200,1,'m');
	    	markers( 400,0,'m');
	    	markers( 600,1,'y')
	    	markers( 800,0,'m');
	    	markers(1000,1,'m');
	    	markers(3000,0,'m');
	    	markers(5000,1,'m');
	    	markers(1760,0,'y');
	    }
	    
	    scale();
	     
	  };  
	    
	}  
	  
	var canvas = document.getElementById("canvas_scale");  
	// attaching the sketchProc function to the canvas  
	var p = new Processing(canvas, sketchProc);  
	// p.exit(); to detach it
}();
