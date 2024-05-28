import pool from "../../utils/db";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    try {
      console.log(`Attempting to delete item with ID: ${id}`);
      const result = await pool.query("DELETE FROM storage WHERE id = $1", [
        id,
      ]);
      console.log("Item deletion successful:", result.rowCount);

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Item not found" });
      }

      res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      console.error("Database deletion error:", error);
      res.status(500).json({ status: "Error", message: error.message });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
