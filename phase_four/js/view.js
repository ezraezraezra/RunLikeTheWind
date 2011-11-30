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

var VIEWER = function() {
	var all_lanes = new Array();
	var all_lanes_info = new Array();
	
	function destroyLanes() {
		for(var x = 0; x < all_lanes.length; x++) {
			all_lanes[x].destroyLane();
		}
		all_lanes = new Array();
		all_lanes_info = new Array();
	}
	
	return {
		createLanes : function(data) {
			
			destroyLanes();
			
			 $("#lane_container").html("");
			 console.log("Start of for loop");
			for(var x = 0; x < data.total; x++) {
				console.log(x);
				all_lanes_info.push(data.results[x]);
				console.log(all_lanes_info[x].time);
				var event = data.results[x].event.substr(0,data.results[x].event.length - 1);
				var college = data.results[x].college;
				$("#lane_container").append('<canvas id="canvas_race_lane_'+x+'" class="canvas_race_lane" width="200" height="200"></canvas><br/>');
				if(event.indexOf("0m") != -1) {
					event = event.substr(0,event.length - 1);
				}
				else if(event.indexOf("0y") != -1) {
					event = event.substr(0,event.lenght - 1);
				}
				else if(event.indexOf("5m") != -1) {
					event = event.substr(0,event.length - 1);
				}
				else {
					event = 1609;
				}
				var new_lane = new CANVAS_RACE_LANE("canvas_race_lane_"+x, event, college, all_lanes_info[x].time);
				all_lanes.push(new_lane);
			}
			console.log("Lanes Created");
		},
		updateInfoBox : function(lane_number) {
			console.log ('update info box');
			console.log(lane_number);
			console.log(all_lanes_info[lane_number]);
			return all_lanes_info[lane_number];
		},
		updateLaneColor: function(lane_number) {
			console.log('update lane color');
			for(var x = 0; x < all_lanes.length; x++) {
				all_lanes[x].updateLaneColor(false);
			}
			all_lanes[lane_number].updateLaneColor(true);
		},
		autoUpdateMarkerPosition: function(timer_state) {
			for(var x = 0; x < all_lanes.length; x++) {
				//all_lanes[x].updateMarkerPosition(all_lanes_info[x].time);
				all_lanes[x].updateMarkerPosition(timer_state);
			}
		}
	};
}();
