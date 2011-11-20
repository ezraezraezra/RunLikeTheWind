/**
 * @author Ezra Velazquez
 */

var CONTROLLERS = function() {
	var runnerAmount = function() {
		$("#runner_amount").slider({
			change: function(event, ui) {
				console.log($(this).slider("value"));
			}
		});
		
	}();

	
}();
