const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  try {
    const code = req.body.code;

    if (!code) {
      return res.status(400).send("Code is required");
    }

    const response = await aiService(code);
    res.send(response);
  } catch (err) {
    console.error("❌ AI Review Error:", err.message);
    res.status(500).send("Something went wrong while generating the review.");
  }
};
