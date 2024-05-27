import pool from "../../utils/db";

export default async function signup(req, res) {
  if (req.method === "POST") {
    const { cas, name, amount, si } = req.body;

    try {
      // Check if a user with the same username already exists
      const elementExists = await pool.query(
        "SELECT cas FROM storage WHERE cas = $1",
        [cas]
      );

      if (elementExists.rows.length > 0) {
        res
          .status(409)
          .json({ status: "Error", message: "Cas already exists" });
        return;
      }

      // Hash the password

      // Store the username and hashed password in the database
      const result = await pool.query(
        "INSERT INTO storage(cas, name, amount, si) VALUES($1, $2, $3, $4) RETURNING *",
        [cas, name, amount, si]
      );

      // If user is created successfully, return a success message
      res.status(201).json({ status: "Created", user: result.rows[0] });
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
      console.error("Server error:", error.stack);
    }
  } else {
    res.status(405).json({ status: "Method Not Allowed" });
  }
}
