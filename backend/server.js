const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/upload");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Make generated CSV files downloadable
app.use("/output", express.static("output"));

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 TransGuard AI Backend is Running!",
  });
});

// Upload API
app.use("/api/upload", uploadRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});