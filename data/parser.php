<?php

echo 'INSERT INTO locations (latitude, longitude, description) VALUES' . PHP_EOL;

$handle = fopen('DE.txt', 'r');
if ($handle) {
	$c = 0;
    while (($line = fgets($handle)) !== false) {
        $arr = explode("\t", $line);

        // berlin only
        // if ($arr[4] <= 52.548172 && $arr[4] >= 52.465473 && $arr[5] >= 13.281509 && $arr[5] <= 13.486328) {
        	printf(
        		'("%s", "%s", "%s"),' . PHP_EOL, 
        		floatval($arr[4]), 
        		floatval($arr[5]), 
        		htmlspecialchars($arr[1])
    		);
        // }
    }

    fclose($handle);
}
