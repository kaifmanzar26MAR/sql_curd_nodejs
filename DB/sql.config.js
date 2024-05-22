import mysql from 'mysql2'

export const sqlDatabase = () => {
  // Create a connection to the database using IP address
  const connection = mysql.createConnection({
    host: "localhost", // e.g., '192.168.1.100'
    user: "root", // e.g., 'root'
    password: "Kaifmanzar@321",
    database: "jung",

    //m2a
    // host: "instance1.ch0u2emkohha.ap-south-1.rds.amazonaws.com", // e.g., '192.168.1.100'
    // user: "admin", // e.g., 'root'
    // password: "2024Made2Automate",
    // database: "MainDatabase",
    
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
