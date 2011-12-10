
<?php
header('Content-type: application/json; charset=utf-8');
require 'info.php';

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
 
class Server {
	// GLOBAL VARS GO HERE
	var $connection;
	var $db_selected;
	var $client;
	var $info_object;
	
	function Server() {
		// INITIALIZE HERE
		$this->info_object = new info();
	}
	
	function startApp() {
		$this->connection = mysql_connect($this->info_object->hostname, $this->info_object->user, $this->info_object->pwd);
		if(!$this->connection) {
			die("Error ".mysql_errno()." : ".mysql_error());
		}
		
		$this->db_selected = mysql_select_db($this->info_object->database, $this->connection);
		if(!$this->db_selected) {
			die("Error ".mysql_errno()." : ".mysql_error());
		}
	}
	
	function closeApp() {
		mysql_close($this->connection);
	}
	
	function submit_info($data, $conn, $return) {
		$result = mysql_query($data,$conn);
		if(!$result) {
			die("Error ".mysql_errno()." : ".mysql_error());
		}
		else if($return == true) {
			return $result;
		}
	}
	
	function requestRaceData($search_type, $search_value){
		$request = "SELECT * FROM data_rep_final WHERE $search_type ='$search_value'";
		return $this->getRaceData($request);
	}
	
	function requestAdvancedRaceData($search_type_1, $search_value_1, $search_type_2, $search_value_2) {
		$request = "SELECT * FROM data_rep_final WHERE ($search_type_1 LIKE '%$search_value_1%') AND ($search_type_2 LIKE '%$search_value_2%')";
		echo $this->getRaceData($request);
	}
	
	function getRaceData($request_string) {
		$request = $this->submit_info($request_string, $this->connection, true);
		
		while(($rows[] = mysql_fetch_assoc($request)) || array_pop($rows));
		$counter = 0;
		foreach ($rows as $row):
			$result[$counter] = array('position'=>"{$row['position']}", 'runner'=>"{$row['runner']}", 'year'=>"{$row['year']}", 'college'=>"{$row['college']}", 'time'=>"{$row['time']}", 'heat'=>"{$row['heat']}", 'event'=>"{$row['event']}");
			$counter = $counter + 1;
		endforeach;
		
		if($counter != 0) {
			$arr = array("status"=>200, "results"=>$result, "total"=>$counter);
		}
		else {
			$arr = array('status'=>'400');
		}
		//$output = json_encode($arr);
		return $arr;
	}
}
$search_quality = $_GET['sq'];
$st_1 = $_GET['st_1'];
$sv_1 = $_GET['sv_1'];
$st_2 = $_GET['st_2'];
$sv_2 = $_GET['sv_2'];
$results = "";

$server = new Server();
$server->startApp();

if(strcasecmp($search_quality, 'advanced') == 0) {
	$server->requestAdvancedRaceData($st_1, $sv_1, $st_2, $sv_2);
}
else {
	$results =  json_encode($server->requestRaceData($st_1, $sv_1));
}
$server->closeApp();
echo $results;
?>