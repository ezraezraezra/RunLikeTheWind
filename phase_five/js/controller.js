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
	
	var name_first = "";
	var name_last = "";
	
	var $lane_container, $filter_by, $filter_advance, $modal_search_type, $modal_tag, $canvas_race_info;
	
	function pickSearch() {
		if(filter_primary.indexOf('college') != -1) {
			SEARCH_DB.searchByCollege(filter_secondary);
		}
		else if(filter_primary.indexOf('event') != -1) {
			SEARCH_DB.searchByEvent(filter_secondary);
		}
		else if(filter_primary.indexOf('heat') != -1) {
			SEARCH_DB.searchByHeat(filter_secondary);
		}
		else if(filter_primary.indexOf('person') != -1) {
			SEARCH_DB.searchByPerson(name_first, name_last);
		}
	}
	
	function init() {
		$lane_container = $("#lane_container");
		$filter_by = $(".primary_filter");//$("#filter_by");
		$filter_advance = $("#filter_advance");
		$modal_search_type = $("#modal_search_type");
		$modal_tag = $("#button_modify"); //$("#modal_tag");
		$canvas_race_info = $("#canvas_race_info");
		$slider_container = $("#slide_container");
		$runner_amount = $("#runner_amount");
		
		var runnerAmount = function() {
			$("#runner_amount").slider({
				change: function(event, ui) {
					
					var lane_amount = VIEWER.getLaneAmount();
					var amount_to_display = map_range($(this).slider("value"), 0, 100, 1, lane_amount);
					
					for(var x = 0; x < lane_amount; x++) {
						if(x <= amount_to_display) {
							$("#canvas_race_lane_" + x).css("display", "inline");
						}
						else {
							$("#canvas_race_lane_" + x).css("display", "none");
						}
					}
					
					function map_range(value, low1, high1, low2, high2) {
						return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
					}
				}
			});
		
		}();
	}
	
	$(document).ready(function() {
		init();
		
		$lane_container.delegate(".canvas_race_lane", "mouseenter", function() {
			console.log($(this).attr("id"));
			var id = $(this).attr("id");
			var lane_number = id.substr(id.indexOf("lane_") + 5, id.length);
			CANVAS_LANE_INFO.update(VIEWER.updateInfoBox(lane_number));
			VIEWER.updateLaneColor(lane_number);
		});
		$filter_by.click(function() {
			
			console.log("filter by");
			
			$filter_by.each(function() {
				$(this).css("backgroundColor", "#0099CC");
			});
			
			$(this).css("backgroundColor", 'red');
			//console.log($(this).attr('id').split('_')[1]);
			filter_primary = $(this).attr('id').split('_')[1];
			$filter_advance.html(MODAL.changeDisplay($(this).attr('id').split('_')[1]));
			$filter_advance.slideDown();
			
			
			// filter_primary = $(this).val();
// 			
			// $filter_advance.html(MODAL.changeDisplay($(this).val()));
			// $filter_advance.slideDown();
		});
		$filter_advance.delegate(".secondary_filter", "click", function() {
			// $filter_advance.slideUp(function() {
				// $modal_search_type.slideUp();
			// });
			
			$(".secondary_filter").each(function() {
				$(this).css("backgroundColor", "#0099CC");
			});
			$(this).css("backgroundColor", 'red');
			
			$filter_advance.slideUp(function() {
				$("#cover_modal").fadeOut();
				$("#container_modal").fadeOut();
			});
			$filter_by.each(function() {
				$(this).css("backgroundColor", "#0099CC");
			});
			
			filter_secondary = $(this).html();
			console.log($(this).html());
			// filter_secondary = $(this).val();
			
			$runner_amount.slider("value", 100);
			$slider_container.css("visibility", "visible");
			CANVAS_RACE_TIMER.clockReset();
			
			pickSearch();
		});
		$filter_advance.delegate("#button_name", "click", function() {
			$(this).css("backgroundColor", "red");
			
			name_first = $("#fa_first").val();
			name_last = $("#fa_last").val();
			
			$filter_advance.slideUp(function() {
				$("#cover_modal").fadeOut();
				$("#container_modal").fadeOut(function() {
					$("#button_name").css("backgroundColor", "#0099CC");
					$filter_by.each(function() {
						$(this).css("backgroundColor", "#0099CC");
					});
				});
			});
			
			
			$runner_amount.slider("value", 100);
			$slider_container.css("visibility", "visible");
			CANVAS_RACE_TIMER.clockReset();
			
			pickSearch();
		});
		$modal_tag.click(function() {
			
			console.log("Modify view");
			//$modal_search_type.slideDown();
			$("#cover_modal").fadeIn();
			$("#container_modal").fadeIn();
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