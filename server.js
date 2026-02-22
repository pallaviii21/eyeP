require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = 3000;

app.get("/api/ip/:ip", async (req, res) => {
  const ip = req.params.ip;

  try {
    const response = await fetch(
      `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&ip_address=${ip}`
    );

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ error: "API request failed." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});