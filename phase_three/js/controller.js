/**
 * @author Ezra Velazquez
 */
var CONTROLLERS = function() {
	var filter_primary = "";
	var filter_secondary = "";
	
	// var runnerAmount = function() {
		// $("#runner_amount").slider({
			// change: function(event, ui) {
				// console.log($(this).slider("value"));
			// }
		// });
// 		
	// }();
	
	function pickSearch() {
		if(filter_primary.indexOf('college') != -1) {
			SEARCH_DB.searchByCollege(filter_secondary);
		}
		else if(filter_primary.indexOf('event') != -1) {
			SEARCH_DB.searchByEvent(filter_secondary);
		}
	}
	
	$(document).ready(function() {
		$("#lane_container").delegate(".canvas_race_lane", "mouseenter", function() {
			console.log($(this).attr("id"));
			var id = $(this).attr("id");
			console.log("This is the id: "+id);
			console.log(id.substr(id.indexOf("lane_") + 5, id.length));
			var lane_number = id.substr(id.indexOf("lane_") + 5, id.length);
			CANVAS_LANE_INFO.update(VIEWER.updateInfoBox(lane_number));
		});
		$("#filter_by").change(function() {
			console.log("A selection has been made");
			console.log($(this).val());
			
			filter_primary = $(this).val();
			
			$("#filter_advance").html(MODAL.changeDisplay($(this).val()));
			$("#filter_advance").slideDown();
		});
		$("#filter_advance").delegate(".filter_secondary", "change", function() {
			console.log($(this).val());
			$("#filter_advance").slideUp(function() {
				$("#modal_search_type").slideUp();
			});
			
			filter_secondary = $(this).val();
			
			pickSearch();
		});
		$("#modal_tag").click(function() {
			
			$("#modal_search_type").slideDown();
		});
	});
}();