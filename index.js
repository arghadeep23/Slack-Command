const { WebClient } = require('@slack/web-api');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', async (req, res) => {
    try {
        // Extract necessary information from the request
        const { text, channel_name, team_id } = req.body;
        console.log(req.body);
        // Check if the message is from the desired channel and workspace
        if (channel_name === 'channel-1' && team_id === process.env.SLACK_WORKSPACE_ID) {
            // Convert the text to uppercase
            const uppercaseText = text.toUpperCase();
            console.log(uppercaseText);

            // Send the modified text to Slack
            const response = await fetch(process.env.SLACK_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: uppercaseText
                })
            });

            // Handle the response from Slack
            if (response.ok) {
                console.log("Message successfully sent!");
                res.status(200).send("Message successfully sent!");
            } else {
                console.error("Failed to send message:", response.statusText);
                res.status(500).send("Failed to send message");
            }
        } else {
            // Ignore messages from other channels or workspaces
            console.log("Message ignored: Not from channel-1 or different workspace.");
            res.status(200).send("Message ignored");
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
