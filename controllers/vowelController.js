// Hiriq : U+05B4 &#1460;
// Zeire : U+05B5 &#1461;
// Segol : U+05B6 &#1462;
// Patach : U+05B7 &#1463;
// Kamatz : U+05B8 ,&#1464;
// Holam : U+05B9 &#1465;
// Kubutz : U+05BB &#1467;
// Shuruk : U+05BC + U+05BC &#1468;
// Shva : U+05B0 &#1456;
// Hataf Segol : U+05B1 &#1457;
// Hataf Patach : U+05B2 &#1458;
// Hataf Kamatz : U+05B3 &#1459;

const db = require ('../models/index');

const Vowelization = db.vowelization

//create
const addVowel = async (req, res) => {
    let { vowelization } = req.body;
    if (!vowelization) {
        return res.status(400).json({ message: `vowelization is required` })
    }
    const created_vowel = await Vowelization.create({
        vowelization
    });
    if (created_vowel) {
        res.status(200).json({ message: `created successfuly` })
    }
    else {
        res.status(400).json({ message: `invalied data` })
    }
};

//read
const getVowelizationById = async (req, res) => {
    const vowelId = req.vowelId
    if (!vowelId) {
        return res.status(400).json({ message: 'A vowelization id is required' })
    }
    let vowel = await Vowelization.findOne({
        attributes: ['vowelization'],
        where: { vowelization_id: vowelId }
    })
    if (vowel) {
        res.status(200).json(vowel.vowelization)
    }
    else {
        res.status(400).json({ message: `vowel not found` })
    }
}

const getAllVowelizations = async (req, res) => {
    let vowels = await Vowelization.findAll({
        where: { vowelization_id: { [Op.in]: level } }
    })
    if (vowels) {
        res.status(200).json(vowels)
    }
    else {
        res.status(400).json({ message: `no vowelizations found` })
    }
}

//update
const updateVowel = async (req, res) => {
    const { vowelization, vowelization_id } = req.body;
    if (!vowelization || !vowelization_id) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    let updatedVowel = await Vowelization.update({ vowelization }, { where: { vowelization_id } })
    if (updatedVowel) {
        res.status(200).json(updatedVowel)
    }
    else {
        res.send(400).json({ message: `invalied data` })
    }
}

//delete
const deleteVowel = async (req, res) => {
    let { vowelizationId } = req.vowelId;
    if (!vowelizationId) {
        return res.status(400).json({ message: `all fields are required` })
    }
    let des = await Vowelization.destroy({
        where: {
            vowelization_id: vowelizationId
        }
    });
    if (des) {
        res.status(200).json({ message: `record deleted successfuly` })
    }
    else {
        res.status(400).json({ message: `couldnt delete record` })
    }
};

module.exports = {
    addVowel,
    getVowelizationById,
    getAllVowelizations,
    updateVowel,
    deleteVowel
}