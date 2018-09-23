var mysql = require('mysql');

var connection;

if (process.env.JAWSDB_URL) {
  // JawsDB on Heroku
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  // local on localhost
  connection = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'burgers_db'
  });
}

// connect to MySQL
connection.connect(function(err) {
  if (err) {
    console.error('ERROR: MySQL Connection Error -- ' + err.stack + '\n\n');
    return;
  }
  console.log(
    'Connected to MySQL database as id ' + connection.threadId + '\n\n'
  );
});

// export connection for ORM
module.exports = connection;
