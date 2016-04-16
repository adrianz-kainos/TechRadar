var db = require('../config/dbConfig.js');
var pg = require('pg');
var dbhelper = require('../utils/dbhelper.js');


var Status = function () {
};


Status.getAll = function (done) {
    var sql = "SELECT * FROM status ORDER BY id ASC";

    dbhelper.query(sql, [],
        function (results) {
            done(results);
        },
        function (error) {
            console.log(error);
            done(null);
        });
}

Status.getHistoryForTechnology = function( technologyid , limit, done)
{
    var sql = "SELECT s.name , u.username, to_char(tsl.date, 'DD/MM/YY') as date  " +
        " FROM tech_status_link tsl" +
        " JOIN STATUS s on tsl.statusid=s.id " +
            " JOIN users u on u.id=tsl.userid" + 
        " WHERE tsl.technologyid=$1" +
        " ORDER BY tsl.date DESC";


    var params = [technologyid];

    if( null !=limit ) {
        sql += " LIMIT $2";
        params.push(limit);
    }

    dbhelper.query(sql, params,
        function (results) {
            done(results);
        },
        function (error) {
            console.log(error);
            done(null);
        });
}

module.exports = Status;