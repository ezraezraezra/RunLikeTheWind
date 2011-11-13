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
	    	function markers(meters,position) {
	    		var yPosition;
	    		if(position === 0) {
	    			yText = 0;
	    		}
	    		else {
	    			yText = -20;
	    		}
	    		
	    		processing.pushMatrix();
	    		
	    			processing.translate(30, 45);
		    		
		    		processing.stroke(255,195,0);
		    		processing.strokeWeight(4);
		    		processing.strokeCap(processing.ROUND);
		    		var xMarker = processing.map(meters, 0, 5000, 0, 840);
		    		var yards = metersToYards(meters);
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
	    	}
	    	
	    	markers(0,1);
	    	markers(55,0);
	    	markers(200,1);
	    	markers(400,0);
	    	markers(800,1);
	    	markers(1000,0);
	    	markers(3000,0);
	    	markers(5000,1);
	    }
	    
	    scale();
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    // // determine center and max clock arm length  
	    // var centerX = processing.width / 2, centerY = processing.height / 2; 
	    // //console.log(processing.width()); 
	    // var maxArmLength = Math.min(centerX, centerY);  
// 	  
	    // function drawArm(position, lengthScale, weight) {        
	      // processing.strokeWeight(weight);  
	      // processing.line(centerX, centerY,   
	        // centerX + Math.sin(position * 2 * Math.PI) * lengthScale * maxArmLength,  
	        // centerY - Math.cos(position * 2 * Math.PI) * lengthScale * maxArmLength); 
	        // processing.textFont(font, 32);
	  	// processing.text("word", 15, 50); 
	    // }  
// 	  
	    // // erase background  
	    // processing.background(22,22,22);  
// 	  
	    // var now = new Date();  
// 	  
	    // // Moving hours arm by small increments  
	    // var hoursPosition = (now.getHours() % 12 + now.getMinutes() / 60) / 12;  
	    // drawArm(hoursPosition, 0.5, 5);  
// 	  
	    // // Moving minutes arm by small increments  
	    // var minutesPosition = (now.getMinutes() + now.getSeconds() / 60) / 60;  
	    // drawArm(minutesPosition, 0.80, 3);  
// 	  
	    // // Moving hour arm by second increments  
	    // var secondsPosition = now.getSeconds() / 60;  
	    // drawArm(secondsPosition, 0.90, 1);  
	  };  
	    
	}  
	  
	var canvas = document.getElementById("canvas_scale");  
	// attaching the sketchProc function to the canvas  
	var p = new Processing(canvas, sketchProc);  
	// p.exit(); to detach it
}();
