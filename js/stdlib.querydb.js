/**
 * Returns mood data from user
 * @param {string} id user ID
 * @returns {any}
 */

module.exports = (id, callback) => {
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
                var sql = "SELECT * FROM moods WHERE id = ?";
                con.query(sql,[id],function(err,result){
                    if (err) throw err;
                    var moods = {};
                    for (var i=0; i<result.length; i++){
                        var date = new Date(result[i].whenTime*1000).toISOString().slice(0, 10);
                        var emotion = result[i].mood;
                        if (!moods.hasOwnProperty(date)){
                            moods[date] = {};
                            moods[date][emotion] = (moods[date][emotion] || 0) + 1;
                        } else{
                            moods[date][emotion] = (moods[date][emotion] || 0) + 1;
                        }
                    }
                    callback(null, moods);
                });
            }
        });
    } else {
        callback(null,"Error: no param")
    }
};

