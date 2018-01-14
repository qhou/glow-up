
//document.getElementById("webcam").addEventListener("click", webcamTrigger);
$(window).on('load',function(){
    $('#webCamModal').modal('show');
    webcamTrigger();
});

var takenImg;
var video = document.querySelector('video')
    , canvas;
var BASE64_MARKER = ';base64,';
var uploadedImgUrl;
/* var prop = ""
var highestScore = ""
var finalEmotion = "" */

/**
 *  generates a still frame image from the stream in the <video>
 *  appends the image to the <body>
 */
function takeSnapshot() {
    var img = document.querySelector('img') || document.createElement('img');
    var context;
    var width = video.offsetWidth
        , height = video.offsetHeight;

    canvas = canvas || document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, width, height);

    img.src = canvas.toDataURL('image/png');
    document.getElementById("webCamModal").appendChild(img);
    takenImg = null;
    takenImg = canvas.toDataURL();
}

function uploadToImgur() {
    var uploadImg = takenImg.replace(/.*,/, '');
    $.ajax({
        url: 'https://api.imgur.com/3/image',
        type: 'POST',
        headers: { "Authorization": "Client-ID cc86a8de0e7c459" },
        dataType: 'json',
        data: {
            image:uploadImg
        },
        success: function (response) {
            console.log(response.data.link);
            uploadedImgUrl = null;
            uploadedImgUrl = response.data.link;
            getEmotion();
        },
        error: function (response) {
            console.log(response);
        }
    });
}

function getEmotion() {
   // $("#emotions").show();
    var params = {};
    var varURLFromForm = $("#basic-url")[0].value;
    console.log("URL is: " + '{"url":' + "\""+ varURLFromForm + "\""+'}');
    $.ajax({
        // NOTE: You must use the same location in your REST call as you used to obtain your subscription keys.
        //   For example, if you obtained your subscription keys from westcentralus, replace "westus" in the 
        //   URL below with "westcentralus".
        url: "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?" + $.param(params),
        beforeSend: function (xhrObj) {
            // Request headers, also supports "application/octet-stream"
            xhrObj.setRequestHeader("Content-Type", "application/json");

            // NOTE: Replace the "Ocp-Apim-Subscription-Key" value with a valid subscription key.
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "767ed67a14854e14b0337fff78523710");
        },
        type: "POST",
        contentType: "application/octet-stream",
        // Request body
        data: '{"url":' + "\""+ uploadedImgUrl + "\""+'}'
    }).done(function (data) {
        // Get face rectangle dimensions
        var faceRectangle = data[0].faceRectangle;
        var faceRectangleList = $('#faceRectangle');

        // Append to DOM
        for (var prop in faceRectangle) {
            faceRectangleList.append("<li> " + prop + ": " + faceRectangle[prop] + "</li>");
        }

        // Get emotion confidence scores
        var scores = data[0].scores;
        var highestScore = -1;
        var scoresList = $('#scores');
        var finalEmotion;
        var count = 0;

        // Append to DOM
        for (var prop in scores) {
            scoresList.append("<li> " + prop + ": " + scores[prop] + "</li>")
            console.log("original loop " + scores[prop]);
            console.log("what is prop: " + prop);
            count++;
            if (scores[prop] > highestScore) {
                console.log("Count is " + count.toString() + " Score is " + scores[prop]);
                highestScore = scores[prop];
                finalEmotion = prop;
            }
        }

        console.log("final is : " + highestScore);
        console.log("final emotion is: " + finalEmotion);
        var highestScore = $('#hScore');
        return finalEmotion;
    }).fail(function (err) {
        alert("Error: " + JSON.stringify(err));
    });
}

function webcamTrigger() {
    // use MediaDevices API
    // docs: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    if (navigator.mediaDevices) {
        // access the web cam
        navigator.mediaDevices.getUserMedia({ video: true })
            // permission granted:
            .then(function (stream) {
                video.srcObject = stream;
                video.addEventListener('click', takeSnapshot);
                video.addEventListener('click', uploadToImgur);
            })
            // permission denied:
            .catch(function (error) {
                document.body.textContent = 'Could not access the camera. Error: ' + error.name;
            });
    }
}
