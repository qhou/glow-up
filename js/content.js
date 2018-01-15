
//document.getElementById("webcam").addEventListener("click", webcamTrigger);
$(window).on('load', function () {
    $('#webCamModal').modal('show');
    webcamTrigger();
});

var takenImg;
var video = document.querySelector('video')
    , canvas;
var BASE64_MARKER = ';base64,';
var uploadedImgUrl;
var emotion = "";

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
    $("#responseContainer").hide();
    img.src = canvas.toDataURL('image/png');
    //document.getElementById("webCamModal").appendChild(img);
    takenImg = null;
    takenImg = canvas.toDataURL();
    $("#loadingContainer").show();
}

function uploadToImgur() {
    var uploadImg = takenImg.replace(/.*,/, '');
    $.ajax({
        url: 'https://api.imgur.com/3/image',
        type: 'POST',
        headers: { "Authorization": "Client-ID cc86a8de0e7c459" },
        dataType: 'json',
        data: {
            image: uploadImg
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
        data: '{"url":' + "\"" + uploadedImgUrl + "\"" + '}'
    }).done(function (data) {
        // Get face rectangle dimensions
        var faceRectangle = data[0].faceRectangle;
        var faceRectangleList = $('#faceRectangle');

        $("#loadingContainer").hide();
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
        //std lib
        var user = "alex";
        lib.carhuang.feelyglad(user, finalEmotion, (err, result) => {
            if (err) {
                console.log("feelyerr: " + err);
            } else {
                console.log(result);
            }
        });
        //end
        emotion = finalEmotion;
        scoresList.append("<li> " + "You are feeling" + ": " + emotion + "</li>");
        emotionalResponse();
        var button = document.getElementById("respondBtn");
        $("#respondBtn").show();
        button.addEventListener('click', responder);
        return emotion;
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
                //button.addEventListener('click',takeSnapshot);
                //button.addEventListener('click',uploadToImgur);
                video.addEventListener('click', takeSnapshot);
                video.addEventListener('click', uploadToImgur);
            })
            // permission denied:
            .catch(function (error) {
                document.body.textContent = 'Could not access the camera. Error: ' + error.name;
            });
    }
}

function emotionalResponse() {
    console.log(emotion);

    if (emotion === "happiness") {
        q = "Dad joke";

        const url = 'https://icanhazdadjoke.com/';

        let fetchData = new Request(url, {
            method: 'GET',
            headers: new Headers({
                "Accept": "Application/json"
            })
        });

        fetch(url, fetchData).then(function (response) {
            //Convert to JSON
            return response.json();
        }).then(function (j) {
            //'j' is a JS object
            console.log(j);

            let joke = j.joke;
            console.log(joke);

            document.getElementById("gift").innerHTML = q;
            document.getElementById("json").innerHTML = 
                JSON.stringify(joke, undefined, 2);
        }).catch(function (error) {
            console.log(error);
        });
    } else if (emotion === "neutral") {
        q = "rainbow"; // search query
        jQuery(function ($) {
            fetch('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + q).then(function (response) {
                return response.json();
            }).then(function (my_result) {
                console.log("gif result: " + my_result.data.image_url);
                document.getElementById("gift").innerHTML = q;
                $('#json').html('<img src="' + my_result.data.image_url + '">');
            });
        });
    } else if (emotion === "anger") {
        q = "calm"; // search query
        jQuery(function ($) {
            fetch('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + q).then(function (response) {
                return response.json();
            }).then(function (my_result) {
                console.log("gif result: " + my_result.data.image_url);
                document.getElementById("gift").innerHTML = q;
                $('#json').html('<img src="' + my_result.data.image_url + '">');
            });
        });
    }

    else if (emotion === "contempt") {
        q = "thumbsup"; // search query
        jQuery(function ($) {
            fetch('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + q).then(function (response) {
                return response.json();
            }).then(function (my_result) {
                console.log("gif result: " + my_result.data.image_url);
                document.getElementById("gift").innerHTML = q;
                $('#json').html('<img src="' + my_result.data.image_url + '">');
            });
        });
    }

    else if (emotion === "disgust") {
        q = "disgusting"; // search query
        jQuery(function ($) {
            fetch('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + q).then(function (response) {
                return response.json();
            }).then(function (my_result) {
                console.log("gif result: " + my_result.data.image_url);
                document.getElementById("gift").innerHTML = q;
                $('#json').html('<img src="' + my_result.data.image_url + '">');
            });
        });
    }

    else if (emotion === "fear") {
        q = "hide"; // search query
        jQuery(function ($) {
            fetch('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + q).then(function (response) {
                return response.json();
            }).then(function (my_result) {
                console.log("gif result: " + my_result.data.image_url);
                document.getElementById("gift").innerHTML = q;
                $('#json').html('<img src="' + my_result.data.image_url + '">');
            });
        });
    }

    else if (emotion === "sadness") {
        q = "hug"; // search query
        jQuery(function ($) {
            fetch('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + q).then(function (response) {
                return response.json();
            }).then(function (my_result) {
                console.log("gif result: " + my_result.data.image_url);
                document.getElementById("gift").innerHTML = q;
                $('#json').html('<img src="' + my_result.data.image_url + '">');
            });
        });
    }

    else if (emotion === "surprise") {
        q = "omg"; // search query
        jQuery(function ($) {
            fetch('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + q).then(function (response) {
                return response.json();
            }).then(function (my_result) {
                console.log("gif result: " + my_result.data.image_url);
                document.getElementById("gift").innerHTML = q;
                $('#json').html('<img src="' + my_result.data.image_url + '">');
            });
        });
    }
}

function responder() {
    $("#webCamModal").hide()
    $(".modal-backdrop").hide();
    $("#responseContainer").show();
}