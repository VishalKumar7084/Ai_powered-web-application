const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const ai = new GoogleGenAI({}); 

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/summarize', upload.single('mediaFile'), async (req, res) => {
    try {
        const textPrompt = req.body.text || "";
        // AI ko command di hai ki structured format me hi reply kare
        const prompt = "Please analyze the provided document/image/text and give a well-structured, detailed summary with proper Headings and Bullet points:\n\n" + textPrompt;
        
        let inputData = []; 
        inputData.push({ type: "text", text: prompt });

        if (req.file) {
            const isImage = req.file.mimetype.startsWith('image/');
            inputData.push({
                type: isImage ? "image" : "document", 
                data: req.file.buffer.toString("base64"),
                mime_type: req.file.mimetype 
            });
        }

        if (inputData.length === 1 && !textPrompt.trim()) {
             return res.status(400).json({ error: "Please provide some text or upload a file." });
        }

        const response = await ai.interactions.create({
            model: 'gemini-3.8-flash',
            input: inputData
        });

        res.json({ 
            success: true, 
            summary: response.output_text 
        });

    } catch (error) {
        console.error("AI API Error:", error.message);
        res.status(500).json({ success: false, error: "Failed to generate summary. Please try again later." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});