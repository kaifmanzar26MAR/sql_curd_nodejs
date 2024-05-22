import mysql from 'mysql2'

export const sqlDatabase = () => {
  // Create a connection to the database using IP address
  const connection = mysql.createConnection({
    host: "localhost", // e.g., '192.168.1.100'
    user: "root", // e.g., 'root'
    password: "Kaifmanzar@321",
    database: "jung",
  });

  // Connect to the database
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      return;
    }
    console.log("Connected to the database");
  });

  return connection;
};
