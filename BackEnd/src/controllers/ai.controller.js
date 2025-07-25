const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
    try {
        const code = req.body.code;

        if (!code) {
            return res.status(400).json({ 
                error: "Code is required",
                example: { code: "function example() { return 'code' }" }
            });
        }

        const response = await aiService(code);
        res.json({ review: response }); // Ensure consistent response format

    } catch (error) {
        console.error("Review error:", error);
        res.status(500).json({ 
            error: "Failed to get code review",
            details: error.message 
        });
    }
};