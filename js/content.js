console.log("here");
let emotion = "neutral";

if (emotion === "happiness") {

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

        document.getElementById("json").innerHTML =
            JSON.stringify(joke, undefined, 2);

    }).catch(function (error) {
        console.log(error);
    });
} else if (emotion === "sad") {
  //  $("#catContainer").show();
}
else if (emotion === "neutral") {
    q = "dramatic"; // search query
    jQuery(function($) {
        fetch('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+q).then(function(response) {
            return response.json();
        }).then(function(my_result) {
            console.log("gif result: " + my_result.data.image_url);
            $('#fetch-result').html('<img src="'+my_result.data.image_url+'">');
        });
    });
}

else if (emotion === "anger") {
    q = "anger"; // search query
    jQuery(function($) {
        fetch('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+q).then(function(response) {
            return response.json();
        }).then(function(my_result) {
            console.log("gif result: " + my_result.data.image_url);
            $('#fetch-result').html('<img src="'+my_result.data.image_url+'">');
        });
    });
}

else if (emotion === "contempt") {
    q = "contempt"; // search query
    jQuery(function($) {
        fetch('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+q).then(function(response) {
            return response.json();
        }).then(function(my_result) {
            console.log("gif result: " + my_result.data.image_url);
            $('#fetch-result').html('<img src="'+my_result.data.image_url+'">');
        });
    });
}

else if (emotion === "disgust") {
    q = "disgust"; // search query
    jQuery(function($) {
        fetch('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+q).then(function(response) {
            return response.json();
        }).then(function(my_result) {
            console.log("gif result: " + my_result.data.image_url);
            $('#fetch-result').html('<img src="'+my_result.data.image_url+'">');
        });
    });
}

else if (emotion === "fear") {
    q = "fear"; // search query
    jQuery(function($) {
        fetch('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+q).then(function(response) {
            return response.json();
        }).then(function(my_result) {
            console.log("gif result: " + my_result.data.image_url);
            $('#fetch-result').html('<img src="'+my_result.data.image_url+'">');
        });
    });
}

else if (emotion === "sadness") {
    q = "crying"; // search query
    jQuery(function($) {
        fetch('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+q).then(function(response) {
            return response.json();
        }).then(function(my_result) {
            console.log("gif result: " + my_result.data.image_url);
            $('#fetch-result').html('<img src="'+my_result.data.image_url+'">');
        });
    });
}

else if (emotion === "suprise") {
    q = "suprise"; // search query
    jQuery(function($) {
        fetch('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+q).then(function(response) {
            return response.json();
        }).then(function(my_result) {
            console.log("gif result: " + my_result.data.image_url);
            $('#fetch-result').html('<img src="'+my_result.data.image_url+'">');
        });
    });
}

