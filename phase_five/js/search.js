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

var SEARCH_DB = function() {
	
	function standardSearch(type, value) {
		$.getJSON('php/server.php', {
				st_1 : type,
				sv_1 : value
			}, function(data){
				//console.log(data);
				console.log(data.total);
				console.log(data);
				VIEWER.createLanes(data);
			});
	}
	
	function advancedSearch(type_1, value_1, value_2) {
		console.log("st_1: "+type_1);
		console.log("st_2:" +type_1);
		console.log("sv_1: " + value_1);
		console.log("sv_2: "+ value_2);
		$.getJSON('php/server.php', {
			st_1 : type_1,
			st_2 : type_1,
			sv_1 : value_1,
			sv_2 : value_2,
			sq   : 'advanced'
		}, function(data){
			console.log(data);
			console.log(data.total)
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
		searchByEvent : function(race) {
			console.log("This is the event being sent: "+race);
			standardSearch('event', race);
		},
		searchByHeat : function(heat) {
			standardSearch('heat', heat);
		}
	};
}();
