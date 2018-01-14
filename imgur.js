var callback = function (res) {
    if (res.success === true) {
        console.log(res.data.link);
    }
};

new Imgur({
    clientid: 'cc86a8de0e7c459',
    callback: callback
});