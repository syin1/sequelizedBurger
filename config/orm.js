// import MySQL connection
var connection = require('./connection.js');

// helper function to create a series of comma separated question marks. This acts as SQL placeholders
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push('?');
  }

  return arr.toString();
}

// helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === 'string' && value.indexOf(' ') >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + '=' + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// object for SQL statement functions
var orm = {
  selectAll: function(tableInput, cb) {
    connection.query('select * from ' + tableInput + ';', function(err, data) {
      if (err) {
        throw err;
      }
      cb(data);
    });
  },

  insertOne: function(table, cols, vals, cb) {
    connection.query(
      'insert into ' +
        table +
        ' (' +
        cols.toString() +
        ') values (' +
        printQuestionMarks(vals.length) +
        ') ',
      vals,
      function(err, data) {
        if (err) {
          throw err;
        }
        cb(data);
      }
    );
  },

  updateOne: function(table, objColVals, condition, cb) {
    // objColVals example - {name: panther, sleepy: true}
    connection.query(
      'update ' +
        table +
        ' set ' +
        objToSql(objColVals) +
        ' where ' +
        condition,
      function(err, data) {
        if (err) {
          throw err;
        }
        cb(data);
      }
    );
  },

  delete: function(table, condition, cb) {
    connection.query('delete from ' + table + ' where ' + condition, function(
      err,
      data
    ) {
      if (err) {
        throw err;
      }
      cb(data);
    });
  }
};

// export orm object for the model (burger.js)
module.exports = orm;
