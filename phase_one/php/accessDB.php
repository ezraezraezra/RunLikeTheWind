<?php
require 'info.php';
	
class AccessDB	{
	var $info_object;
	var $connection;
	var $db_selected;
	var $client;
	
	function AccessDB() {
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
	
	function importData($file_name, $event) {
		$row = 1;
		$string_to_send = "";
		$debug = FALSE;

		if(($file = fopen($file_name, "r")) !== FALSE) {
			while(($line = fgetcsv($file,1500,",")) !== FALSE) {
				$num = count($line);
				if($debug == TRUE) {
					echo "<p> $num fields in line $row: <br/></p>\n";
					$row++;
					for($c=0; $c < $num; $c++) {
						echo $line[$c]."<br />\n";
					}
				}
				else {
					$string_to_send = "INSERT INTO data_rep_final (position,runner,year,college,time,heat,event) VALUES('$line[0]','$line[1]','$line[2]','$line[3]','$line[4]','$line[5]','$event')";
					
					$string_to_send = $this->submit_info($string_to_send, $this->connection, true);
				}
			}
			fclose($file);
			echo "Done with: ".$event."<br />";
		}
	}
	
	function getData($column, $value) {
		$request = "SELECT * FROM data_rep_final WHERE $column='$value'";
		$request = $this->submit_info($request, $this->connection, true);
		
		while(($rows[] = mysql_fetch_assoc($request)) || array_pop($rows));
		$counter = 0;
		foreach ($rows as $row):
			$position[$counter] =  "{$row['position']}";
			$runner[$counter] =  "{$row['runner']}";
			$year[$counter] =  "{$row['year']}";
			$college[$counter] =  "{$row['college']}";
			$time[$counter] =  "{$row['time']}";
			$heat[$counter] =  "{$row['heat']}";
			$event[$counter] =  "{$row['event']}";
			
			$counter = $counter + 1;
		endforeach;
		
		 $arr = array('status'=>'200', 'position'=>$position, 'runner'=>$runner, 'year'=>$year, 'college'=>$college, 'time'=>$time, 'heat'=>$heat, 'event'=>$event);
		 return $arr;
	}
}

$write_to_database = FALSE;
if($write_to_database == TRUE) {
	$scrape = new AccessDB();
	$scrape->startApp();
	$scrape->importData("../track_results/55.csv", "55m");
	$scrape->importData("../track_results/200.csv", "200m");
	$scrape->importData("../track_results/400.csv", "400m");
	$scrape->importData("../track_results/600.csv", "600y");
	$scrape->importData("../track_results/800.csv", "800m");
	$scrape->importData("../track_results/1000.csv", "1000m");
	$scrape->importData("../track_results/3000.csv", "3000m");
	$scrape->importData("../track_results/5000.csv", "5000m");
	$scrape->closeApp();	
}
else {
	$data = new AccessDB();
	$data->startApp();
	$data->getData("event", "55m");
	$data->closeApp();
}		
?>