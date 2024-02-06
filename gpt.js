const axios = require('axios');
const { response } = require('express');

const sendChatRequest = async prompt => {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                {role: 'system', content: 'You: ' + prompt}
            ]
        }, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer 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'
            }
        });

        return response.data.choices[0].message.content;
    } catch (err) {
        console.log('Error: ', err.response.data);
        return null;
    }
}

const prompt = 'Hello, how are you?';
sendChatRequest(prompt)
    .then(response => {
        console.log('ChatGPT response: ', response);
    })
    .catch(err => {
        console.log('Error:', err);
    })