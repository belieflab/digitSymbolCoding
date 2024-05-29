<?php
$post_data = json_decode(file_get_contents('php://input'), true); 
// the directory "data" must be writable by the server
if ($post_data !== null) {
$filename = "data/dsc_".$post_data['file'].".csv"; 
$results = $post_data['results'];
$score = $post_data['score'];
$outcomes = $post_data['outcomes'];
// echo$filename;
// echo$score;
// echo$outcomes;
// echo$results;



// write the file to disk
// choose only one! otherwise the data will not save

file_put_contents($filename, $results);
}
// file_put_contents($filename, $score);
// file_put_contents($filename, $outcomes);

// $name = "data/".$post_data['filename'].".csv"; 
// $results = $post_data['results'];
// $score = $post_data['score'];
// $outcomes = $post_data['outcomes'];
// // write the file to disk
// file_put_contents($name, $results, $score, $outcomes);

