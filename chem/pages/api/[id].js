import pool from "../../utils/db";
app.delete("/api/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM storage WHERE id = $1", [id]);
    res.status(200).json({ status: "Success", message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
    console.error("Server error:", error.stack);
  }
});
