const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User Already Exists!')
    }

    const user = await User.create({ name, email, password })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(user._id),
        })
    } else {
        res.status(404);
        throw new Error('User Not Found')
    }
});



const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
        })
    } else {
        res.status(404)
        throw new Error("User Not Found")
    }
});

const getUserbySearch = async (req, res) => {
    var { search } = req.query;

    if (!search) {
        search = ''
    }
    let filterCompany = null
    filterCompany = await User.find({
        $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ]
    })

    res.status(200).json(filterCompany)
}

const addUsersProject = async (req, res) => {
    try {
        const { project_id, category, isAuthor} = req.body
        const user = await User.findById(req.params.id)
        if (user) {
            user.projects.push({
                project_id,
                category,
                isAuthor
            })
            await user.save()
            res.status(200).json(user);
        } else {
            res.status(404).json({
                error: "Image Not Found"
            });
            return;
        }
    } catch (error) {
        res.status(500).json({"error" : error})
    }
}

const listImageProjects = async(req,res) => {
    try {
        const user = await User.findById(req.params.id);
        if(user){
            const imageList = user.projects.filter(item => item.category == "image")
            res.status(201).json(imageList);
        }else{
            res.status(404).json({
                error: "Image Not Found"
            });
            return;
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { getUserProfile, registerUser, getUserbySearch, addUsersProject, listImageProjects}