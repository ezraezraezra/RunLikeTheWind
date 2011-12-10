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

var MODAL = function() {
	var options = new Array();
	options['college'] = ['augsburg', 'bethel', 'carleton', 'gustavus', 'hamline', 'luther', 'macalester', 'minn state mankato', 'st. olaf', 'unattached'];
	options['heat'] = ['H1','H2','H3','H4','H5','H6','H7','H8','H9'];
	options['event'] = ['55m','200m','400m','600y','800m','1000m','3000m','5000m'];
	
	function basicDropDown(choice) {
		var output = '<span>pick '+ choice +'</span><br/><select name="filter_'+ choice +'" id="filter_'+ choice +'" class="filter_secondary">';
		for(var x = 0; x < options[choice].length; x++) {
			output += '<option class="secondary_filter" value="'+ options[choice][x] +'">'+ options[choice][x] +'</option>';
		}
		output += '</select>';
		
		return output;
	}
	
	function basicButtons(choice) {
		
		var output = '<span>pick '+ choice +'</span><br/>';
		for(var x = 0; x < options[choice].length; x++) {
			if(options[choice][x].indexOf('minn') != -1) {
				output += '<div class="secondary_filter" style="line-height:18px;">'+ options[choice][x] +'</div>';
			}
			else {
				output += '<div class="secondary_filter">'+ options[choice][x] +'</div>';
			}
		}
		
		return output;
	}
	
	return {
		changeDisplay : function(choice) {
			var response;
			
			switch(choice) {
				case 'person':
					break;
				case 'college':
					//response = basicDropDown('college');
					  response = basicButtons('college');
					break;
				case 'event':
					//response = basicDropDown('event');
					response = basicButtons('event');
					break;
				case 'heat':
					//response = basicDropDown('heat');
					response = basicButtons('heat');
					break;
			}
			
			return response;
		}
	};
}();
