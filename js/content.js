console.log("here");
let emotion = "happy";

if (emotion === "happy") {

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
