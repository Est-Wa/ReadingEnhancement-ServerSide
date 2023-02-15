const db = require('../models/index')

const Student_level = db.student_level
const Vowelization = db.vowelization

//read
const getLevelForStudent = async (req, res) => {
    const userId = req.userId
    if (!userId) {
        return res.status(400).json({ message: 'A user id is required' })
    }
    level = await Student_level.findAll({
        attributes: ['vowelization_id'],
        where: { student_id: userId }
    })
    vowels = await Vowelization.find({
        attributes: ['vowelization'],
        where: { vowelization_id: { [Op.in]: level } }
    })
    if (vowels) {
        res.status(200).json(vowels)
    }
    else {
        res.status(400).json({ message: `level not found for user ${userId}` })
    }
}

//delete
const deleteLevel = async (req, res) => {
    let des = await Student_level.destroy({
        where: {
            student_id: req.userId,
            vowelization_id: req.vowelizationId
        }
    });
    if (des) {
        res.status(200).json({ message: `record deleted successfuly` })
    }
    else {
        res.status(400).json({ message: `couldnt delete record` })
    }
};

//create
const addLevel = async (req, res) => {
    let{studentId,vowelization} = req.body;
    if(!studentId||!vowelization){
        return res.status(400).json({message:`all fields are required`})
    }
    let vowel = await Vowelization.findOne({
        attributes: ['vowelization_id'],
        where: { vowelization: vowelization }
    });
    const created_student_level = await Student_level.create({
        student_id: userId,
        vowelization_id: vowel.vowelization_id,
    });
    if(created_student_level){
        res.status(200).json({message:`created successfuly`})
    }
    else{
        res.status(400).json({message:`invalied data`})
    }
};

module.exports={getLevelForStudent,deleteLevel,addLevel}