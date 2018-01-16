/**
 * Input mood data into Feelyglad DB
 * @param {string} id user ID
 * @param {string} mood user's mood
 * @returns {string}
 */

module.exports = (id, mood, context, callback) => {
    if (id) {
        const mysql = require('mysql2');

        const con = new mysql.createConnection({
            host: "feelyglad.mysql.database.azure.com",
            user: "feelyglad@feelyglad",
            password: "3Ha6!9$h1UYK",
            database: 'moods',
            ssl: true,
            port: 3306
        });

        con.connect(function(err){
            if (err) {throw err} else{
                var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
                var post = {
                    id : id,
                    mood : mood,
                    whenTime : Math.floor(new Date() / 1000)
                }
                var sql = "INSERT INTO moods SET ?";
                con.query(sql,post,function(err,result){
                    if (err) throw err;
                });
                callback(null,"Uploaded. Time:" + date)
            }
        });
    } else {
        callback(null,"Error: no param")
    }
};



