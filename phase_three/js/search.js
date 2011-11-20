/**
 * @author Ezra Velazquez
 */

var SEARCH_DB = function() {
	
	function standardSearch(type, value) {
		$.get('php/server.php', {
				st_1 : type,
				sv_1 : value
			}, function(data){
				console.log(data);
				VIEWER.createLanes(data);
			});
	}
	
	function advancedSearch(type_1, value_1, value_2) {
		$.get('php/server.php', {
			st_1 : type_1,
			st_2 : type_1,
			sv_1 : value_1,
			sv_2 : value_2,
			sq   : 'advanced'
		}, function(data){
			console.log(data);
			VIEWER.createLanes(data);
		});
	}
	
	return {
		searchByPerson : function(first_name, last_name) {
			advancedSearch('runner', first_name, last_name);
		},
		searchByCollege : function(college) {
			standardSearch('college', college);
		},
		searchByRace : function(race) {
			standardSearch('event', race);
		},
		searchByHeat : function(heat) {
			standardSearch('heat', heat);
		}
	};
}();
