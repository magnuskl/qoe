<?php

$file    = "../logs/log.csv";
$data = "";

// Insert header before first entry.
if (!file_exists($file)) {
    $data = "candidate_number"  . "," . 
            "age"               . "," .
            "user_agent_simple" . "," .
            "user_agent_full"   . "," .
            "proficiency"       . "," .
            "experiment_id"     . "," .
            "timestamp"         . "," .
            "first_variant"     . "," .
            "second_variant"    . "," .
            "selected_variant"  . "\n";
}

// Prepend metadata to each entry.
$entries = explode(PHP_EOL, $_GET["data"]);
foreach ($entries as $entry) {
    if (!empty($entry)) {
        $data .= $_GET["cand"]          . ',' .
                 $_GET["age"]           . ',' .
                 $_GET["agent_simple"]  . ',' .
                 $_GET["agent_full"]    . ',' .
                 $_GET["prof"]          . ',' .
                 $_GET["exp"]           . ',' .
                 $_GET["time"]          . ',' .
                 $entry                 . "\n";
    }
}

file_put_contents($file, $data, FILE_APPEND);

?>
