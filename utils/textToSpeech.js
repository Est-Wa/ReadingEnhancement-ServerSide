require('dotenv').config
const APIKEY = process.env.APIKEY
const axios = require("axios")
const fs = require('fs');

async function TextToSpeech(text, filePath) {
    const res = await axios.post(`https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${APIKEY}`,
        {
            "audioConfig": {
                "audioEncoding": "MP3",
                "speakingRate": 0.5
            },
            "input": {
                "text": text,
            },
            "voice": {
                "languageCode": "he-IL",
                "name": "he-IL-Wavenet-C"
            }
        }
    )

    const audioContent = res.data.audioContent;

    const audioBuffer = Buffer.from(audioContent, 'base64');

    fs.writeFile(filePath, audioBuffer, (err) => {
        if (err) {
            console.error('Error saving audio file:', err);
            return;
        }
        console.log('Audio file saved successfully!');
    });

}


module.exports = {TextToSpeech}  ;