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

var CANVAS_RACE_LANE = function(_canvas, _length,_school, _total_time) {
	var canvas;
	var p;
	var highlight_state = [24,156,255];
	var normal_state = [4,32,53];
	var position_color = [232,12,122];
	var current_state = normal_state;
	var current_position = 0;
	var img;
	var audio_counter = 0;
	var bell_audio = new Audio("assets/bell3.mp3");
	
	var updateMarkerPosition = false;
	var current_time = {
		ms : 0, 
		sec : 0,
		min : 0,
		start : false,
		reset : false,
		end_time : 0,
		current : 0,
		position: 0
	}
	
	function setMarkerTimespan(_total_time) {
			var total_time = _total_time.split(/[\.:]/);
			
			for(var x = total_time.length; x > 0; x--) {
				var temp_time;
				if(x == total_time.length) {
					temp_time = parseInt(total_time[x-1]);
				}
				else if(x == total_time.length - 1) {
					temp_time = parseInt(total_time[x-1] * 60);
				}
				else if(x == total_time.length - 2) {
					temp_time = parseInt(total_time[x-1] * 60 * 60);
				}
				current_time.end_time += temp_time;
			}
			
	}
	
	// Simple way to attach js code to the canvas is by using a function  
	function sketchProc(processing) { 
	  var font;
	  var background = "#161616";
	  processing.setup = function() {
	  	processing.size(900,50);
	  	processing.colorMode(processing.RGB);
	  	processing.background(22,22,22);
	  	font = processing.loadFont("Futura");
	  	if(_school.indexOf("Mankato") != -1) {
	  		_school = "mankato";
	  	}
	  	else if(_school.indexOf("Olaf") != -1) {
	  		_school = "olaf";
	  	}
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
	    		processing.translate(30+current_position, processing.height/2);
	    		processing.imageMode(processing.CENTER);
	    		processing.image(img,current_time.position,0);
	    	processing.popMatrix();
	    }
	    
	    function updateTime() {
		    	if (updateMarkerPosition === true) {
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
		    	
		    	current_time.current = (current_time.min * 60 * 60) + (current_time.sec * 60) + (current_time.ms);
		    	current_time.position = processing.map(current_time.current, 0, current_time.end_time, 0, 840);	
		    	if(current_time.position >= 840) {
		    		current_time.position = 840;
		    		updateMarkerPosition = false;
		    		if(audio_counter == 0) {
		    			audio_counter += 1;
		    			bell_audio.play();
		    		}
		    	}
		    		
		    	}
	    }
	    
	    
	   updateTime(); 
	  }; 
	}
	
	function init(_canvas) {
		setMarkerTimespan(_total_time);
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
		},
		updateMarkerPosition: function(timer_state) {			
			updateMarkerPosition = timer_state;
		}
	};
	
};