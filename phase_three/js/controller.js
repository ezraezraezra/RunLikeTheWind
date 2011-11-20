/**
 * @author Ezra Velazquez
 */
var CONTROLLERS = function() {
	// var runnerAmount = function() {
		// $("#runner_amount").slider({
			// change: function(event, ui) {
				// console.log($(this).slider("value"));
			// }
		// });
// 		
	// }();
	$(document).ready(function() {
		$("#lane_container").delegate(".canvas_race_lane", "mouseenter", function() {
			console.log($(this).attr("id"));
			var id = $(this).attr("id");
			var lane_number = id.substr(id.length - 1, id.length);
			VIEWER.updateInfoBox(lane_number);
		});
		$("#filter_by").change(function() {
			console.log("A selection has been made");
			console.log($(this).val());
			$("#filter_advance").html(MODAL.changeDisplay($(this).val()));
			$("#filter_advance").slideDown();
		});
		$("#filter_advance").delegate(".filter_secondary", "change", function() {
			console.log($(this).val());
			$("#filter_advance").slideUp(function() {
				$("#modal_search_type").slideUp();
			});
		});
		$("#modal_tag").click(function() {
			
			$("#modal_search_type").slideDown();
		});
	});
}();