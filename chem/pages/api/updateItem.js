import pool from "../../utils/db";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id, amount } = req.body;

    if (!id || !amount) {
      return res.status(400).json({ error: "ID and amount are required" });
    }

    try {
      console.log(`Attempting to update item with ID: ${id}`);
      const result = await pool.query(
        "UPDATE storage SET amount = $1 WHERE id = $2",
        [amount, id]
      );
      console.log("Item update successful:", result.rowCount);

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Item not found" });
      }

      res.status(200).json({ message: "Item updated successfully" });
    } catch (error) {
      console.error("Database update error:", error);
      res.status(500).json({ status: "Error", message: error.message });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
