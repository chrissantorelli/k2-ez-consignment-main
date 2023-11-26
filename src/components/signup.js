const mysql = require('mysql');
//const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {
  const pool = mysql.createPool({
    host: "k2db.cccnfkunau8t.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Cookie599$",
    database: "ktwodatabase",
  });

  const { uid, username, password, role } = event;
  
  // Assuming you have a 'users' table in your database with appropriate columns.
  const insertUserQuery = 'INSERT INTO Users (UserID, Username, Password, Role) VALUES (?, ?, ?, ?)';
  const values = [uid, username, password, role];

  try {
    // Insert the user into the database.
    const insertResult = await executeQuery(pool, insertUserQuery, values);

    // Check if the user was successfully inserted.
    if (insertResult.affectedRows === 1) {
      const response = {
        statusCode: 200,
        body: JSON.stringify({ message: 'User created successfully' }),
      };
      return response;
    } else {
      throw new Error('User creation failed');
    }
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating user', error: error.message }),
    };
    return response;
  }
};

// Function to execute a SQL query with a connection pool.
function executeQuery(pool, query, values) {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
