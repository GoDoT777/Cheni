import pool from "../../utils/db";
import bcrypt from "bcrypt";
import validator from "validator";

export default async function signup(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
      })
    ) {
      res.status(400).json({
        status: "Error",
        message: "Password does not meet complexity requirements",
      });
      return;
    }

    try {
      // Check if a user with the same username already exists
      const userExists = await pool.query(
        "SELECT email FROM users WHERE email = $1",
        [email]
      );

      if (userExists.rows.length > 0) {
        res
          .status(409)
          .json({ status: "Error", message: "Email already exists" });
        return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Store the username and hashed password in the database
      const result = await pool.query(
        "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *",
        [email, hashedPassword]
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
