const db = require('../models/index')
const { Op } = require("sequelize");
const Vowelization_for_word = db.vowelizations_for_words
const Words = db.words
const Vowelization = db.vowelization

//✌
const getVowelsOfWord = async (word) => {
    const vowels = word.match(/[\u0591-\u05C7]/g);
    const unicodes = vowels.map((char) => `&#${char.charCodeAt(0)}`);
    let id_vowels = await Vowelization.findAll({
        attributes: ['vowelization_id'],
        where: { vowelization: { [Op.in]: unicodes } }
    })
    id_vowels = [...id_vowels].map(obj => obj.vowelization_id);
    return id_vowels;
}

//✌
//create
const addWord = async (req, res) => {
    const { word, path } = req.body;
    if (!word) {
        return res.status(400).json({ message: `a word must be sent` })
    }
    const vowels = await getVowelsOfWord(word);
    const createdWord = await Words.create({word,path})
    if(!createdWord){
        return res.status(400).json({message:`invalied data`})
    }
    console.log(vowels);
    vowels.forEach(async (vowel) => {
        await Vowelization_for_word.create({word_id:createdWord.word_id,vowelization_id:vowel})
    });
    res.status(200).json(word);
}

//read

module.exports= {
    addWord
}