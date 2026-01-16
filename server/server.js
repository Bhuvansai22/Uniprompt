const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rate Limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        error: 'Too many requests.',
        details: 'You have exceeded the limit of 5 prompts per 15 minutes. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply rate limiting to optimization endpoint
app.use('/api/optimize', limiter);

// Basic health check
app.get('/', (req, res) => {
    res.send('Prompt Optimization Server is running');
});

// Prompt Optimization Endpoint
app.post('/api/optimize', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        // Prepare payload for Sarvam AI
        const response = await axios.post('https://api.sarvam.ai/v1/chat/completions', {
            model: "sarvam-m",
            messages: [
                {
                    role: "system",
                    content: "You are an expert prompt engineer. Your task is to REFINE and OPTIMIZE the user's prompt, NOT to answer it. \n\nInput: \"write code for fibonacci\"\nOutput: \"Write a highly efficient Python function to calculate the Fibonacci sequence using dynamic programming. Include comments explaining the time complexity.\"\n\nIf the user asks a question, REWRITE the question to be more specific and detailed. Do NOT answer the question. Output ONLY the professional version of the prompt."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.SARVAM_API_KEY}`
            }
        });

        const optimizedPrompt = response.data.choices[0].message.content.trim();
        res.json({ optimizedPrompt });

    } catch (error) {
        console.error('Error optimizing prompt:', error.response?.data || error.message);
        console.error('Full Error Details:', JSON.stringify(error.response?.data, null, 2));
        res.status(500).json({
            error: 'Failed to optimize prompt',
            details: error.response?.data || error.message
        });
    }
});

// Export the Express API
module.exports = app;

// Only listen if not running in Vercel (local development)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
