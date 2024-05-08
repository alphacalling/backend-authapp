const express = require('express');
const router = express.Router();

const {login, signup} = require('../controller/Auth');
const {auth, isStudent, isAdmin} = require('../middleware/auth');

router.post('/login', login);
router.post('/signup', signup);

router.get('/test', auth, (req,res) => {
    res.json({
        success:true,
        message:'welcome to the route for test',
    });
})

//protected route
router.get('./student', auth, isStudent,  (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for student',
    });
});

router.get('/admin', auth, isAdmin, (req, res) => {
    res.json({
        success:true,
        message:'welcome to the protected route for admin',
    });
})

//email routing by id
router .get('/getEmail', auth, async (req, res) =>{
    try{
        const id = req.user.id;
        console.log('id:', id);
        const user = await User.findById(id);

        res.status(200).json({
            success:true,
            user:user,
            message:'welcome to the email route',
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
            message:'errror in email routing code',
        });
    }
});

module.exports = router;