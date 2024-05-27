import pool from "../../utils/db";
import bcrypt from "bcrypt";

export default async function login(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Get the user with the provided username
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (user.rows.length > 0) {
        const passwordMatches = await bcrypt.compare(
          password,
          user.rows[0].password
        );

        if (passwordMatches) {
          // Passwords match, return a success message
          res
            .status(200)
            .json({ status: "Success", message: "Login successful" });
        } else {
          // Passwords don't match, return an error message
          res
            .status(403)
            .json({ status: "Error", message: "Invalid password" });
        }
      } else {
        res.status(404).json({ status: "Error", message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
      console.error("Server error:", error.stack);
    }
  } else {
    res.status(405).json({ status: "Method Not Allowed" });
  }
}
