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
			 
			for(var x = 0; x < data.total; x++) {
				all_lanes_info.push(data.results[x]);
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
				var new_lane = new CANVAS_RACE_LANE("canvas_race_lane_"+x, event, college);
				all_lanes.push(new_lane);
			}
			console.log("Lanes Created");
		},
		updateInfoBox : function(lane_number) {
			console.log ('update info box');
			console.log(lane_number);
			console.log(all_lanes_info[lane_number]);
			return all_lanes_info[lane_number];
		}
	};
}();
