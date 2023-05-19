<?php
  require_once 'db/data.php';
  require_once 'db/config.php';
?>

<!DOCTYPE html>

<html lang="en">

<!--[if lt IE 8]>

    <script type="text/javascript">

        alert("The content of this web page may not work as intended in " +
              "the current browser. " +
              "Internet Explorer 8 or newer is required for full functionality.");
    </script>

<![endif]-->

<!-- © 2020 The Many Brains Project, Inc. and McLean Hospital
This code is made available under a Creative Commons Attribution-Share Alike
 4.0 International license (CC BY-SA 4.0).
  https://creativecommons.org/licenses/by-sa/4.0/ This script may be shared,
 with appropriate credit, and reasonable indication of any changes that were
 made. If you remix, transform, or build upon the material, you must distribute
 your contributions under the same license as the original.


    February 2016  Ver. 1.0

     URL parameters:

      rndseed           : random number generator seed
      debug=true        : output trial by trial information to console
      demo=true         : run in demo mode (skip most trials)
      showresults=true  : opens a new window with results,
                          with button to save CSV file on local disk
      autosave=true     : save data to file automatically
      filename=test.csv : filename to save data to
      help              : show usage

     Usage:

      DSC.html?rndseed=myrndseed
      DSC.html?debug=true
      DSC.html?demo=true
      DSC.html?showresults=true
      DSC.html?showresults=true&filename=subject1.csv&autosave=true
      DSC.html?help

     For reference see:

      Thorndike, E. A standardized group examination of intelligence
        independent of language. J. of Applied Psych, 1919, 3(1), 13-32.

      Wechsler, D. (1981). Manual for the Wechsler Adult Intelligence
        Scale - Revised. New York: Psychological Corporation.

      McLeod et Al. An automated version of the digit symbol substitution
        test. Behav. Res. Meth. & Instr. 1982, 14(5), 463-466

      Salthouse, T.A., What do adult age differences in the digit symbol
        substitution test reflect? J. of Gerontology, 1992, 47(3), 121-128

     Notes:

      On each trial, symbol choice is pseudo-random with lag 1 repetition
      avoidance. RT outcomes are calculated on correct responses. Available
      input is keyboard and touch.


-->

<head>

<!-- Metadata ************************************************************** -->

    <meta charset="UTF-8">
    <meta name="description" content="Digit Symbol Coding test">
    <meta name="copyright" content="2020 The Many Brains Project, Inc. and McLean Hospital">
    <meta name="author" content="Paolo Martini">
    <meta name="keywords" content="cognitive test, brain test, digit-symbol coding">

<!-- End of metadata ******************************************************* -->

<!-- Title ***************************************************************** -->

    <title>Digit Symbol Coding Test</title>

<!-- End of Title ********************************************************** -->

<!-- css Style declarations ************************************************ -->

<link rel="stylesheet" type="text/css" href="css/style.css">

    <style type="text/css">

        body
        {
            margin: auto;
            background: #ffffff;
            color: #000000;
            font-family: Palatino Linotype, Bookman Antiqua, Palatino, serif;
            font-size: 13pt;
            text-align: center;
        }

        .inst
        {
            margin: 0 auto;
            display: block;
            text-align: center;
            background: #ffffff;
            color: #000000;
            font-size:24pt;
            font-family: Palatino Linotype, Bookman Antiqua, Palatino, serif;
        }

        .button
        {
            -webkit-appearance: none;
            background: darkgrey;
            font-size: 24pt;
            line-height: 1.5em;
            width: 200px;
            margin: 5px;
            border: 5px solid lightgray;
            border-right: 5px solid #727272;
            border-bottom: 5px solid #727272;
            padding: 0;
            text-align: center;
            color: #ffffff;
            font-family: Palatino Linotype, Bookman Antiqua, Palatino, serif;
        }

        .button:active
        {
            background: darkgrey;
            border: 5px solid lightgray;
            border-left: 5px solid #727272;
            border-top: 5px solid #727272;
        }

        #responseContainer
        {
            width: 440px;
            height: 140px;
            position: absolute;
            left: 50%;
            margin-left: -220px;
        }

        .responseButton
        {
            -webkit-appearance: none;
            background: darkgrey;
            font-size: 40pt;
            line-height: 2em;
            width: 120px;
            margin: 5px;
            border: 5px solid lightgray;
            border-right: 5px solid #727272;
            border-bottom: 5px solid #727272;
            padding: 0;
            color: #ffffff;
            text-align: center;
            font-family: Palatino Linotype, Bookman Antiqua, Palatino, serif;
        }

        .responseButton:active
        {
            border: 5px solid lightgray;
            border-left: 5px solid #727272;
            border-top: 5px solid #727272;
        }

        #test
        {
            width: 100px;
            height: 100px;
            margin: 0 auto;
            text-align:center;
        }

    </style>

<!-- end of css Style declarations ***************************************** -->

<!-- required js libraries ************************************************* -->

    <script type="text/javascript" src="exp/fn.js"></script>
    <script type="text/javascript" src="exp/main.js"></script>
    <script type="text/javascript" src="db/validate.js"></script>

<!-- end of required js libraries ****************************************** -->

<!-- js script ************************************************************* -->

    <script type="text/javascript">

    var symbol;                     // the symbol to show (1-9)
    var digit;                      // the digit corresponding to the symbol
    var correct;                    // correct=1, wrong=0
    var testStart = 0;              // start timestamp of the test
    var score = 0;                  // accumulated score
    var errors = 0;                 // # errors
    var RTs = [];                   // reaction times array
    var results = [];               // array to store trials details and responses
    var outcomes = {};              // object containing outcome variables
    var frameSequence = [];         // object containing the sequence of frames and their properties
    var frame;                      // single frame object
    var seed;                       // URL parameter: random number generator seed
    var debug;                      // URL parameter: output to console
    var demo;                       // URL parameter: run in demo mode
    var showresults;                // URL parameter: if they want to show results in a popup window
    var autosave;                   // URL parameter: if they want to save data in a file automatically
    var filename;                   // filename for data
    var usage = "";                 // URL parameter: show usage
    // 
    var workerId;                   // URL parameter: get workerId
    // NDA vars

    // output a message and execute an action
    function showAlert(alertMessage,alertButtonText,action,timeout)
    {
        // set the message to display
        getID('alertText').innerHTML = alertMessage;

        // if args contain button text,
        // show the button and set the required action for it,
        // otherwise hide the button
        if(alertButtonText && !timeout)
        {
            getID('alertButton').style.width='15em';
            getID('alertButton').style.margin='0 auto';
            getID('alertButton').style.display='block';
            getID('alertButton').innerHTML = alertButtonText;
            getID('alertButton').onclick = action;
            showCursor("document.body");
        }
        else getID('alertButton').style.display='none';

        // if args contain a timeout,
        // trigger the action automatically when timeout expires
        if(timeout) setTimeout(action,timeout);

        showFrame('alertBox');
    }

    // specify actions to take on user input
    tmbUI.onreadyUI = function()
    {
        // is the response correct?
        correct = parseInt(tmbUI.response.slice(-1)) == frame.digit ? 1 : 0;

        // if we are debugging, log the results
        if(debug == 'true' &&
           (frame.type == "practice" ||
            (frame.type == "test" && tmbUI.status != "timeout")))
        {
            if(tmbUI.message) console.log(tmbUI.message);

            console.log(frame.type+" "+frame.symbol+" "+frame.digit+" "+
                        tmbUI.response.slice(-1)+" "+correct+" "+tmbUI.rt+" "+
                        tmbUI.status);
        }

        // store the results
        if(frame.type == "practice" ||
           (frame.type == "test" && tmbUI.status != "timeout"))
        {
            results.push(
                    {
                        type: frame.type, // one of practice or test
                        symbol: frame.symbol, // symbol index
                        digit: frame.digit, // symbol digit
                        response: tmbUI.response.slice(-1), // the key or element chosen
                        correct: correct, // boolean correct
                        rt: tmbUI.rt, // response time
                        state: tmbUI.status // state of the response handler
                    });
        }

        if(frame.type == "practice")
        {
            // on practice trials, if the input event returns a timeout
            // or the response is not correct,
            // stop the sequence and advise the participant
            if(tmbUI.status == "timeout" || !correct)
            {
                // rewind the frame sequence by one frame,
                // so that the same frame is displayed again
                frameSequence.unshift(frame);

                showAlert("<br><img src=" + frame.source + "><br>" +
                          (hasTouch ? ("<br>You should tap <b>" + frame.digit + "</b><br>")
                                    : ("<br>You should press " + frame.digit +
                                       " on the <b>keyboard</b> <br>")) +
                          "when you see this symbol.<br><br>",
                          "Click here to retry",
                          function()
                          {
                              showFrame("null");
                              nextTrial();
                          });
            }
            else
            {
                nextTrial();
            }
        }
        else if(frame.type == "test")
        {
            if(tmbUI.status != "timeout")
            {
                // update rts, score and error count
                score += correct;
                errors += !correct;
                if(correct) RTs.push(tmbUI.rt);

                // choose a symbol randomly, but avoid 1-back repetitions
                while ((symbol = randInt(1, 9)) == frame.symbol) {}
                digit = symbol % 3 == 0 ? 3 : symbol % 3;

                // set up the next frame
                frameSequence.push(
                        {
                            type: "test",
                            message: "",
                            symbol: symbol,
                            digit: digit,
                            source: "images/" + symbol + ".gif"
                        });
            }

            nextTrial();
        }
    };

    function nextTrial()
    {
        // read the frame sequence one frame at a time
        if(frame = frameSequence.shift())
        {
            // check if it's the startup frame
            if (frame.type == "begin") showAlert(frame.message,
                                                 "Instructions",
                                                 function ()
                                                 {
                                                    nextTrial();
                                                 });

            // else if it's a message frame, show it
            else if (frame.type == "lol") showAlert(frame.message,
                                            "Submit and Begin Task",
                                            function ()
                                            {
                                                showFrame("null");
                                                validateSite(),
                                                validateSubject(),
                                                // validateGUID(),
                                                validateAge(),
                                                validateSex(),
                                                validateHandedness(),
                                                validateBrightness(),
                                                // validateHeadphones(),
                                                // validateVolume(),
                                                submitIntake()
                                                nextTrial();
                                            });

            // else if it's a message frame, show it
            else if (frame.type == "message") showAlert(frame.message,
                                                        "Continue",
                                                        function ()
                                                        {
                                                            showFrame("null");
                                                            nextTrial();
                                                        });
            // deal with practice and test frames
            else
            {
                // set the image source of the symbol
                getID("testImg").src = frame.source;

                // set response timeout:
                // - for practice trials -> a fixed interval
                // - for test trials -> what's left of 90 seconds since start,
                //                      with a minimum of 35 ms (2 frames)
                if(frame.type == "practice") tmbUI.timeout = 5000;
                else
                {
                    if(!testStart) testStart = now();
                    if(demo == 'true') tmbUI.timeout = 15000 - (now() - testStart);
                    else tmbUI.timeout = 90000 - (now() - testStart);
                    if(tmbUI.timeout < 150) tmbUI.timeout = 150;
                }

                requestAnimationFrame(function()
                {
                    showFrame("key","test","responseContainer");
                    tmbUI.getInput();
                });
            }
        }
        // else if the sequence is empty, we are done!
        else
        {
            // compute outcome variables
            outcomes.digitSymbol_num_correct = score;
            outcomes.digitSymbol_num_responses = score + errors;
            outcomes.digitSymbol_meanRTc = RTs.average().round(2);
            outcomes.digitSymbol_medianRTc = RTs.median().round(2);
            outcomes.digitSymbol_sdRTc = RTs.sd().round(2);

            // if debugging, output to console
            if(debug == "true")
            {
                for (var propertyName in outcomes)
                {
                    if(outcomes.hasOwnProperty(propertyName))
                        console.log(propertyName,": ",outcomes[propertyName]);
                }
            }

            // we either save locally or to the server
            if(showresults == "true" || autosave == 'true' || filename)
            {
                showAlert("<br>Your score is " + score + ".<br>" +
                          "<br>The test is over.<br>" +
                          "Thank you for participating!<br><br>",
                          "",
                          null);

                alert("submit to file");

                setTimeout(function()
                {
                    if(filename == false) filename = "DSCresults.csv";
                    tmbSubmitToFile(results,filename,autosave);
                },2000);
            }
            else if (subjectID)
            {
                alert("Experiment Complete! Data Saved.\nYou may close this window at anytime.");
                csv = convertToCSV(results);
                saveData(subjectID, csv, score, outcomes);
                // tmbSubmitToServer(results,score,outcomes); // default code to connect to their server do not use
            }
        }
    }




    function setFrameSequence()
    {
        let testMessage;

        // messages
        testMessage = {
  "lol": (
    "<h1 style='text-align:center;'>Participant Intake</h1>" +
    "<p style='color:black'>Please fill out the following information before beginning the task:</p>" +
    "<form method='post'>" +
    "<p style='color:black'><b>Research Site:</b></p>" +
    "<select name='facility' id='siteid'>" +
    // "<option value='none'>---</option>" +
    // "<option value='Maryland'>UMBC</option>" +
    "<option value='Northwestern'>NU</option>" +
    // "<option value='Temple'>Temple</option>" +
    // "<option value='Georgia'>UGA</option>" +
    // "<option value='Yale'>Yale</option>" +
    // "<option value='Emory'>Emory</option>" +
    "</select>" +
    "<label for='facility'></label>" +
    "<p style='color:black'><b>Subject ID:</b></p>" +
    "<input required id='subjectid' type='text' name='subjectid' minlength='5' maxlength='5'>" +
    "<p style='color:black'><b>Date of Birth:</b></p>" +
    "<input required id='dob' type='date'>" +
    "<p style='color:black'><strong>Sex at Birth:</strong></p>" +
    "<label for='male'>Male</label>" +
    "<input type='radio' id='male' name='sex' value='male' onclick='validateSex(this.value)'>" +
    "<br>"+
    "<label for='female'>Female</label>" +
    "<input type='radio' id='female' name='sex' value='female' onclick='validateSex(this.value)'>" +
    "<p style='color:black'><b>Dominant Hand:</b></p>" +
    "<label for='right'>Right</label>" +
    "<input type='radio' name='handedness' id='rightHanded' value='rightHanded'>" +
    "<br>"+
    "<label for='left'>Left</label>" +
    "<input type='radio' name='handedness' id='leftHanded' value='leftHanded'>" +
    "<p style='color:black'><b>Before proceeding to the task, please confirm the following are true:</b></p>" +
    "<label class='container'>Screen brightness is up to 100% &nbsp&nbsp&nbsp&nbsp" +
    "<input type='checkbox' name='brightness' id='brightness' value='1'>" +
    "</label>" +
    "</form>" +
    "<br>"+
    "<br>"
  ),


            "begin": ("<br><h2>Digit-Symbol Coding Test</h2><br>" +
            "<img src='images/key.gif'><br><br>"),

            "practice": [("<br>" +
                            "<h3>Instructions:</h3>" +
                          "<br><img src='images/key.gif'><br>" +
                          "Each <b>symbol</b> has a <b>number</b>.<br><br>"),
                         ("<br><img src='images/1.gif'><br>" +
                          "<img src='images/keySmall.gif'><br>" +
                          "<button type='button' class='responseButton'>1</button>" +
                          "<button type='button' class='responseButton'>2</button>" +
                          "<button type='button' class='responseButton'>3</button><br>" +
                          "When a symbol appears at the top,<br>" +
                          (hasTouch ? "tap the <b>button</b> with its number"
                                    : "press its number on the <b>keyboard</b>") +
                          " (here it is 1).<br><br>"),
                         (   "<br>" +
                             "<h3>Instructions:</h3>" +
                        //   "<br><img src='images/2.gif'><br>" +
                        //   "<img src='images/key.gif'><br>" +
                          "Let's practice a few symbols.<br><br>")],
            "test": ("<br>Excellent!<br>" +
                     "You have completed the practice.<br>" +
                     "Now let's do more.<br><br>" +
                     "Your score will be<br>" +
                     "how many correct responses<br>" +
                     "you make in a minute and a half,<br>" +
                     "so try to be <b>ACCURATE</b> and <b>QUICK</b>!<br><br>")
        };

        // type of frame to display
        var frameType = ["lol", "begin",
                         "message","message","message",
                         "practice","practice","practice",
                         "message","test"];

        // message to display
        var frameMessage = [testMessage.lol,testMessage.begin,
                            testMessage.practice[0],testMessage.practice[1],testMessage.practice[2],
                            "","","",
                            testMessage.test,""];

        // symbol to display
        var frameSymbol = [0,0,0,0,0,1,3,2,0,4];

        // digit to display
        var frameDigit = [0,0,0,0,0,1,3,2,0,1];

        // push all components into the frames chain
        for(var i=0; i<frameType.length; i++)
        {
            frameSequence.push(
                    {
                        type: frameType[i],
                        message: frameMessage[i],
                        symbol: frameSymbol[i],
                        digit: frameDigit[i],
                        source: "images/" + frameSymbol[i] + ".gif"
                    });
        }
    }

    window.onload = function()
    {
        // see if they are just asking for help
        if ((usage = getUrlParameters("help", "", true)))
        {
            showAlert("<b>Usage:</b><br>DSC.html?urlparam1=true&urlparam2=false<br><br>" +
                    "<b>URL Parameters</b>:<br>" +
                    "rndseed=myseed -- choose a random generator's seed<br>" +
                    "demo=true -- runs in demo mode only for 20 seconds<br>" +
                    "debug=true -- outputs trial by trial info to the console<br>" +
                    "showresults=true -- allows to save results locally in a file<br>" +
                    "autosave=true -- will attempt to save results automatically to file<br>" +
                    "filename=subject1.csv -- the filename to save results to<br>" +
                    "help -- print this message");
            return;
        }

        // check if this is a debug session
        debug = getUrlParameters("debug", "", true);
        if (debug == "true")
        {
            console.log("Type Symbol Digit Response Correct RT State");
        }

        // check if they want a demo run
        demo = getUrlParameters("demo", "", true);

        // check if they want to load results in a new page when the test is over,
        // if data is to be saved automatically to a file and the filename
        showresults = getUrlParameters("showresults", "", true);
        autosave = getUrlParameters("autosave", "", true);
        filename = getUrlParameters("filename", "", true);

        // if data will be saved to server, get workerId
        workerId = getUrlParameters("workerId", "", true);

        // check if they want to practice first
        nopractice = getUrlParameters("nopractice", "", true);

        // determine events to listen to
        if(hasTouch) tmbUI.UIevents = 'taps';
        else
        {
            tmbUI.UIevents = ['keys'];
            tmbUI.UIkeys = [keyToCode('1'),keyToCode('2'),keyToCode('3')];
        }
        tmbUI.UIelements = ['response1','response2','response3'];
        tmbUI.highlight = "red";

        // set the random seed
        seed = getUrlParameters("rndseed", "", true);
        if(!seed) seed = "DScoding_Aurora1";
        Math.seedrandom(seed);

        if(hasTouch)
        {
            fixMobileOrientation("landscape");
            setMobileViewportScale(getAspectRatio()*700,"any");
        }

        // disable spurious user interaction
        disableSelect();
        disableRightClick();
        disableDrag();

        // create the trials chain
        setFrameSequence();

        // preload images and start the testing sequence
        var images = [];

        for(var i = 0; i < 9; i++) images[i] = "images/" + (i+1) + ".gif";
        images[9] = "images/key.gif";
        images[10] = "images/keySmall.gif";

        imagePreLoad(images,{callBack: nextTrial});
    }

    // function saveData(name, data){
    // let xhr = new XMLHttpRequest();
    // xhr.open('POST', 'run.php'); // 'run.php' contains the php script described above
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(JSON.stringify({filename: name, filedata: data}));
    // }
    function saveData(a, b, c, d){
        let xhr = new XMLHttpRequest();
        if (subjectID) {
            xhr.open('POST', 'index.php'); // 'run.php' contains the php script described above
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({file: a, results: b, score: c, outcomes: d}));
        return true;
    } else {
        return false;
    }

    }

    </script>

<!-- end of js script ****************************************************** -->

</head>

<!-- HTML content ********************************************************** -->

<body id='unload' onbeforeunload="return areYouSure()" style="background-color: white;">
    <!-- this DIV is used to show a message and continue the test sequence-->
    <div id="alertBox" class="inst" style="display: none">
        <span class="instSpan" id="alertText">This is a placeholder.</span>
        <button type="button" class="button" id="alertButton">Click here</button>
    </div>

    <br>
    <div id="test" style="display: none;">
        <img id="testImg" alt="key" src="images/1.gif">
    </div>

    <br><br>
    <div id="key" style="display: none;">
        <img id="keyImg" alt="key" src="images/key.gif">
    </div>
    <br><br><br>

    <div id="responseContainer" style="display: none;">
        <button type="button" id="response1" class="responseButton">1</button>
        <button type="button" id="response2" class="responseButton">2</button>
        <button type="button" id="response3" class="responseButton">3</button>
    </div>

    <noscript>
    For full functionality of this site it is necessary to enable JavaScript.<br>
    Here are the <a href="http://www.enable-javascript.com/" target="_blank">
    instructions</a> how to enable JavaScript in your web browser.
    </noscript>
</body>

<footer>
<script type="text/javascript">
    // declare NDA required variables
    let GUID;
    let subjectID;
    let sexAtBirth;
    let siteNumber;
    let ageAtAssessment;
    let groupStatus;
    let feedbackLink;

    if (db_connection === false) {
    GUID = "";
    subjectID = "";
    sexAtBirth = "";
    siteNumber = "";
    ageAtAssessment = "";
    groupStatus = "";
    feedbackLink = "";
    } else if (db_connection === true) {
    GUID = "<?php echo $subjectKey?>";
    subjectID = "<?php echo $consortId?>";
    sexAtBirth = "<?php echo $sexAtBirth?>";
    siteNumber = "<?php echo $institutionAlias?>";
    ageAtAssessment = "<?php echo $ageInMonths?>";
    groupStatus = "<?php echo $groupStatus?>";
    feedbackLink = "https://belieflab.yale.edu/omnibus/eCRFs/feedback/tasks/dsc.php?candidateId=<?php echo $candidateId?>&studyId=<?php echo $studyId?>";
    }
</script>
</footer>

</html>