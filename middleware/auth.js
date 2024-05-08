//auth, isStudent, isAdmin

const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
    try{
        //extract jwt token
        const token = req.cookies.token || req.body.token || req.header('Authorisation').replace('Bearer ', "");

        if(!token || token === undefined) {
            return res.status(401).json({
                success:false,
                message:'Token is missing',
            });
        }

        //verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error){
        return res.status(401).json({
           success:false,
           message:'something went wrong, while verifying the token', 
        });
    }
}

exports.isStudent = (req, res, next) => {
    try{
        if(req.user.role !== "Student") {
            return res.status(401).json({
                success:false,
                message:'this is a protected route for Students',
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'user role is not matched',
        });
    }
}

exports.isAdmin = (req,res,next) => {
    try{
        if(req.user.role !== "Admin") {
            return res.status(401).json({
                success:false,
                message:'this is a protected route for Admin',
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'user role is not matched',
        });
    }
}