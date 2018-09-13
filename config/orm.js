
const connection = require("./connection.js");
// helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  

var orm = {

    selectAll:function(tableName,cb){

        var queryString="SELECT * FROM " +tableName + ";";

        connection.query(queryString,function(err,result){
            if(err) throw err;
            cb(result);
        })

    },
    insertOne:function(tableName,colToUse,valOfCol,cb){
        var queryString = "INSERT INTO " + tableName; 
        queryString += " (";
        queryString += colToUse.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(valOfCol.length);
        queryString += ") ";
        console.log(queryString);

        connection.query(queryString,valOfCol,function(err,result){
            if(err) throw err;
            cb(result);
        })

},

updateOne: function(burgerId, cb){
    var queryString="UPDATE burgers SET ? WHERE ?"
    connection.query(queryString, [{devoured: true}, {id: burgerId}], function (err, result) {
        if (err) throw err;
        cb(result);
      });

}

}

module.exports = orm;