const mongoose=require("mongoose");
const express =require("express");
const {User}=require("../db");
const router=express.Router();

router.get('/',async(req,res)=>{
    const users=await User.find();
    res.json({users});
});
router.get('/getuser/:userid', async (req, res) => {
    try {
        const { userid } = req.params;
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const { name, number, address,data } = user;
        return res.json({ name, number, address ,data});
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.put('/addform/:userid',async (req,res)=>{
    const { data } = req.body;
    const { userid } = req.params;
    try {
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.data=data;
        await user.save();
        return res.status(200).json({ message: 'Data added successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/adduser',async (req,res)=>{
    const {name,number,address}=req.body;
    const user=await User.findOne({number});
    if(user){
        res.status(403).json({message:'User Already Exists with Phone Number ',number});
    } else{
        const newUser=new User({name,number,address});
        await newUser.save();
        res.json(newUser);
    }
});


module.exports=router;