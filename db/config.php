<?php

$studyAlias = "YOUR STUDY HERE";

/* SELECT A LANGUAGE */
$language = 'english';
// $language = 'french';
// $language = 'german';

/* assign PHP variable to JS variable */
switch ($language) {
  case 'english':
    '<script type="text/javascript">language = "english";</script>';
    break;
  case 'french':
    '<script type="text/javascript">language = "french";</script>';
    break;
  case 'german':
    '<script type="text/javascript">language = "german";</script>';
    break;
}

$studyId = $_GET["studyId"];
$candidateId = $_GET["candidateId"];
$workerId = $_GET["workerId"];
$subjectId = $_GET["src_subject_id"];

$subjectKey = $_GET["subjectkey"];
$consortId = $_GET["src_subject_id"];
$sexAtBirth = $_GET["sex"];
$institutionAlias = $_GET["site"];
$ageInMonths = $_GET["interview_age"];
$visit = $_GET["visit"];
$week = $_GET["week"];
$db_connection_status = true;
$db_connection = true;

// check for configuration file on server; if it does not exist, set db_connection_status to false.
// if (file_exists($_SERVER["DOCUMENT_ROOT"] . '/config.php')) {
//   include_once($_SERVER["DOCUMENT_ROOT"] . '/config.php');
//   // echo$_SERVER["DOCUMENT_ROOT"];


//   if (isset($workerId)) {
//     // include the consent form
//     $db_connection_status = false;
//   } else if (isset($candidateId)) {
//     // is connected to omnibus...

//     // get GUID from db
//     $query = "SELECT GUID from phi where sub_id = $candidateId";
//     $prepare = $db_connection->prepare($query);
//     $prepare->execute();
//     $result = $prepare->get_result();
//     $row = $result->fetch_assoc();
//     $guid = $row["GUID"];
//     $prepare->close();

//     // get studyAlias from db
//     $query = "SELECT study_alias from study where study_HIC = '$studyId'";
//     $prepare = $db_connection->prepare($query);
//     $prepare->execute();
//     $result = $prepare->get_result();
//     $row = $result->fetch_assoc();
//     $studyAlias = $row["study_alias"];
//     $prepare->close();

//     // get rest from query string
//     $subjectKey = $_GET["subjectkey"];
//     $consortId = $_GET["src_subject_id"];
//     $sexAtBirth = $_GET["sex"];
//     $institutionAlias = $_GET["site"];
//     $ageInMonths = $_GET["interview_age"];
//     $visit = $_GET["visit"];
//     $week = $_GET["week"];

//     echo '<script type="text/javascript">db_connection = true</script>';

//     // in order to include nda.js
//   } else if (isset($subjectId)) {
//     $subjectKey = $_GET["subjectkey"];
//     $consortId = $_GET["src_subject_id"];
//     $sexAtBirth = $_GET["sex"];
//     $institutionAlias = $_GET["site"];
//     $ageInMonths = $_GET["interview_age"];
//     $visit = $_GET["visit"];
//     $week = $_GET["week"];

//     $db_connection_status = true;
//     echo '<script type="text/javascript">db_connection = true</script>';
// } 
// }
