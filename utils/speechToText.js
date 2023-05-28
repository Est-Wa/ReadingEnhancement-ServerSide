require('dotenv').config
const APIKEY = process.env.APIKEY
const axios = require("axios")
const fs = require("fs")

async function SpeechToText(filePath) {

    const binaryData = fs.readFileSync(filePath);
    const base64Data = binaryData.toString('base64');
    const res = await axios.post(`https://speech.googleapis.com/v1p1beta1/speech:recognize?key=${'AIzaSyAE-xzt4CN_gboJm7JNFm1YTqbDCulohNk'}`,
    {
        "audio": {
          "content": base64Data
        },
        "config": {
            "encoding": "LINEAR16",
            "sampleRateHertz": 16000,
            "languageCode": "he-IL",
        }
      }
    )

    const data = res.results ;

    console.log(data)

}
SpeechToText('../public/audio/tmp.mp3');
module.exports = {SpeechToText}  ;