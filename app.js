import express from "express";
import { sqlDatabase } from "./DB/sql.config.js";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());
const connection = sqlDatabase();

app.get("/", (req, res) => {
  res.json({ data: "hiiiiii form sql server!" });
});
app.get("/allproducts", (req, res) => {
  try {
    const query = "select * from product";
    connection.query(query, (error, result) => {
      if (error) {
        console.error("Error executing query:", err);
        return res.json(error);
      }
      console.log("Product inserted successfully:", result);
      connection.end(); // Close the connection
      return res.json(result);
    });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

app.get("/insertproduct", (req, res) => {
  try {
    const product = {
      prod_name: "Product 1",
      series_id: 1,
      category_id: 1,
      color_id: 1,
      user_id: 1,
      archive: 0,
      stock: 10,
      photo: "xyz.jpg",
    };

    // SQL query to insert a single product
    const sql =
      "INSERT INTO product (prod_name, series_id, stock,category_id,color_id,user_id,archive,photo) VALUES (?, ?, ?,?,?,?,?,?)";

    // Execute the query
    connection.query(
      sql,
      [
        product.prod_name,
        product.series_id,
        product.stock,
        product.category_id,
        product.color_id,
        product.user_id,
        product.archive,
        product.photo,
      ],
      (err, results) => {
        if (err) {
          console.error("Error executing query:", err);
          return;
        }
        console.log("Product inserted successfully:", results.insertId);
        connection.end(); // Close the connection
        return res.json(results);
      }
    );
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

app.get("/getprodcutbyid/:id", (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const query = `SELECT 
    product.prod_name, 
    series.ser_name, 
    product.photo, 
    category.cat_name, 
    color.col_name, 
    user.user_name, 
    product.archive, 
    product.stock, 
    product.created_at, 
    product.updated_at
FROM 
    product
JOIN 
    series ON product.series_id = series.ser_id
JOIN 
    category ON product.category_id = category.cat_id
JOIN 
    color ON product.color_id = color.col_id
JOIN 
    user ON product.user_id = user.user_id
WHERE 
    product.prod_id = ${id}`;
    connection.query(query, (error, result) => {
      if (error) {
        return res.json(error);
      }

      console.log("get the prodcut  successfully:", result);
      connection.end(); // Close the connection

      return res.json(result);
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/updateproductbyid", (req, res) => {
  try {
    const { prod_id, new_name } = req.body;
    console.log(prod_id, new_name);

    if (!prod_id || !new_name) {
      throw new Error("All fields are required");
    }

    const query = `SELECT * FROM product WHERE prod_id = ?`;
    connection.query(query, [prod_id], (error, result) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ error: "Database error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      const updateQuery = `UPDATE product SET prod_name = ? WHERE prod_id = ?`;
      connection.query(
        updateQuery,
        [new_name, prod_id],
        (err, updateResult) => {
          if (err) {
            console.error("Error executing update query:", err);
            return res.status(500).json({ error: "Database error" });
          }

          console.log("Product updated!!");
          return res.json({
            message: "Product updated successfully",
            updateResult,
          });
        }
      );
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(400).json({ error: error.message });
  }
});

app.get("/deleteprodcut/:id", (req, res) => {
  try {
    const { id } = req.params;

    const query = `DELETE FROM product WHERE prod_id = ${id}`;

    connection.query(query, (error, result) => {
      if (error) return res.json(error);
      console.log("prodcut deleted");
      return res.json(result);
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000, () => {
  console.log("app is running on 5000");
});
