const { WebClient } = require('@slack/web-api');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', async (req, res) => {
    const { text } = req.body;
    const uppercaseText = text.toUpperCase();
    console.log(uppercaseText);
    console.log(process.env.CHANNEL1_ID)
    try {
        const response = await fetch(process.env.SLACK_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: uppercaseText
            })
        });

        if (response.ok) {
            console.log("Message successfully sent!");
            res.status(200).send("Message successfully sent!");
        } else {
            console.error("Failed to send message:", response.statusText);
            res.status(500).send("Failed to send message");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred");
    }
});

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello World');
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
