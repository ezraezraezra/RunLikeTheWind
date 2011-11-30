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
var CONTROLLERS = function() {
	var filter_primary = "";
	var filter_secondary = "";
	
	var $lane_container, $filter_by, $filter_advance, $modal_search_type, $modal_tag, $canvas_race_info;
	
	function pickSearch() {
		if(filter_primary.indexOf('college') != -1) {
			SEARCH_DB.searchByCollege(filter_secondary);
		}
		else if(filter_primary.indexOf('event') != -1) {
			SEARCH_DB.searchByEvent(filter_secondary);
		}
	}
	
	function init() {
		$lane_container = $("#lane_container");
		$filter_by = $("#filter_by");
		$filter_advance = $("#filter_advance");
		$modal_search_type = $("#modal_search_type");
		$modal_tag = $("#modal_tag");
		$canvas_race_info = $("#canvas_race_info");
		
		var runnerAmount = function() {
			$("#runner_amount").slider({
				change: function(event, ui) {
					console.log($(this).slider("value"));
				}
			});
		
		}();
	}
	
	$(document).ready(function() {
		init();
		
		$lane_container.delegate(".canvas_race_lane", "mouseenter", function() {
			console.log($(this).attr("id"));
			var id = $(this).attr("id");
			console.log("This is the id: "+id);
			console.log(id.substr(id.indexOf("lane_") + 5, id.length));
			var lane_number = id.substr(id.indexOf("lane_") + 5, id.length);
			CANVAS_LANE_INFO.update(VIEWER.updateInfoBox(lane_number));
			VIEWER.updateLaneColor(lane_number);
		});
		$filter_by.change(function() {
			console.log("A selection has been made");
			console.log($(this).val());
			
			filter_primary = $(this).val();
			
			$filter_advance.html(MODAL.changeDisplay($(this).val()));
			$filter_advance.slideDown();
		});
		$filter_advance.delegate(".filter_secondary", "change", function() {
			console.log($(this).val());
			$filter_advance.slideUp(function() {
				$modal_search_type.slideUp();
			});
			
			filter_secondary = $(this).val();
			
			CANVAS_RACE_TIMER.clockReset();
			
			pickSearch();
		});
		$modal_tag.click(function() {
			
			$modal_search_type.slideDown();
		});
		$canvas_race_info.click(function() {
			var clock_status = CANVAS_RACE_TIMER.clockStatus();
			if(clock_status === true) {
				console.log("run little piggies, run");
				VIEWER.autoUpdateMarkerPosition(true);
			}
			else {
				console.log("that will do, pig, that will do");
				VIEWER.autoUpdateMarkerPosition(false);
			}
		});
	});
}();