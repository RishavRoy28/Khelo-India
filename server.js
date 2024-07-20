const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(bodyParser.json());

const configuration = new Configuration({
    apiKey: 'YOUR_OPENAI_API_KEY',
});
const openai = new OpenAIApi(configuration);

app.post('/ask', async (req, res) => {
    const question = req.body.question;
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-004',
            prompt: question,
            max_tokens: 150,
        });
        res.json({ answer: response.data.choices[0].text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
