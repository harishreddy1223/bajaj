const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const USER_ID = "BanaHarishReddy";
const EMAIL = "banaharish531@gmail.com";
const ROLL_NUMBER = "22BCS14697";

// POST Endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format" });
        }

        let numbers = [], alphabets = [], highestAlphabet = "";
        
        data.forEach(item => {
            if (/^\d+$/.test(item)) {
                numbers.push(item);
            } else if (/^[a-zA-Z]$/.test(item)) {
                alphabets.push(item);
            }
        });
        
        if (alphabets.length > 0) {
            highestAlphabet = [alphabets.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })).pop()];
        }

        return res.status(200).json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        });
    } catch (error) {
        return res.status(500).json({ is_success: false, message: "Internal server error" });
    }
});

// GET Endpoint
app.get('/bfhl', (req, res) => {
    return res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
