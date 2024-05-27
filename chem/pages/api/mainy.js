import pool from "../../utils/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      console.log("Attempting to query the database...");
      const results = await pool.query("SELECT * FROM storage");
      console.log("Database query successful:", results.rows);
      res.status(200).json(results.rows);
    } catch (error) {
      console.error("Database query error:", error);
      res.status(500).json({ status: "Error", message: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
