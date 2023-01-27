const Image = require('../models/imageModel');

const createImageContoller = async(req,res)=>{
    const {name,commits,members,conversation}= req.body
    const imageExist = await Image.findOne({name})
    if(imageExist){
        res.status(400).json({
            error: "Project Already Exists"
        })
        return;
    }
    const image = await Image.create({name,commits, members, conversation})
    if(image){
        res.status(201).json({
            _id: image._id,
            name: image.name,
            commits: image.commits,
            members: image.members,
            conversation: image.conversation,
        })
    }else{
        res.status(400).json({
            error: "Project Not Found"
        })
        return;
    }
};

const commitImageController = async(req,res)=>{
    const {commiter, commitMessage, Node, edgeData} = req.body
    const image = await Image.findById(req.params.id)
    if(image){
        image.commits.push({
            commiter,
            commitMessage,
            Node,
            edgeData
        })
        await image.save()
        res.json(image);
    }else{
        res.status(404).json({
            error: "Image Not Found"
        });
        return;
    }
};

const deleteRecentCommitController = async(req,res) => {
    const image = await Image.findById(req.params.id)
    if(image){
        image.commits.pop();
        await image.save()
        res.json(image);
    }else{
        res.status(404).json({
            error: "Image Not Found"
        });
        return;
    }
};

const addMemberController = async(req,res)=>{
    const {name, isAuthor, access} = req.body
    const image = await Image.findById(req.params.id)
    if(image){
        image.members.push({
            name,
            isAuthor,
            access
        })
        await image.save()
        res.json(image);
    }else{
        res.status(404).json({
            error: "Image Not Found"
        });
        return;
    }
};

const deleteMemberController = async(req,res) => {
    const image = await Image.findById(req.params.id)
    const {memberName} = req.params;
    if(image){
        image.members = portfolio.members.filter((item)=> item.name.toString() !== memberName.toString() )
        await image.save()
        res.json(image);
    }else{
        res.status(404).json({
            error: "Image Not Found"
        });
        return;
    }
};

const getImageController = async(req,res)=>{
    try {
        const image = await Image.findById(req.params.id)
        if(image){
            res.status(201).json(image);
        }else{
            res.status(404).json({
                error: "Image Not Found"
            });
            return;
        }
    } catch (error) {
        res.status(500).json(error)
    }
};





module.exports = {createImageContoller, commitImageController, getImageController, deleteRecentCommitController, addMemberController, deleteMemberController}