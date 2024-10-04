import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js"

export const signup = async(req,res)=>{
   try {
    const {name , email, password, confirmpassword}= req.body;

    if(password !== confirmpassword){
        return res.status(400).json({
            message:"Password do not match"
        })
    }
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({message:"Email already exists"})
    }

       // Hasing the password
       const hashedPassword = await bcrypt.hash(password,10);

    const newuser = await new User({
        name,
        email,
        password : hashedPassword
    });
   await newuser.save()
   if(newuser){
    createTokenAndSaveCookie(newuser.id , res);
    res.status(201).json({message:"User registered successfully ",
         user:{
        _id: newuser._id,
        name: newuser.name,
        email: newuser.email
    },})

   }
    
   } catch (error) {
    console.log(error);
    res.status(500).json({message:"Server error"});
    
   }
 }


 export const login = async(req,res)=>{
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        const isMatch =await bcrypt.compare(password, user.password);
        if(!user || !isMatch){
            return res.status(404).json({message:"Invalid User or Password"});

        }

        createTokenAndSaveCookie(user.id, res);
        res.status(201).json({
            message:"User logged in Successafully",
            user:{
                _id: user._id,
                name: user.name,
                email: user.email
            },
        });
    
 } catch (error) {
    console.log(error);
   res.status(500).json({message:"Server error"});
    
  }
}

export const logout = async(req,res)=>{
    try {
        res.clearCookie("jwt");
        res.status(200).json({message:"User logged out Successafully"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server error"});
        
    }
}


export const allUsers = async (req, res) => {
    try {
      const loggedInUser = req.user._id;
      const filteredUsers = await User.find({
        _id: { $ne: loggedInUser },
      }).select("-password");
      res.status(201).json(filteredUsers);
    } catch (error) {
      console.log("Error in allUsers Controller: " + error);
    }
  };

// export const getUserProfile = async(req, res)=>{
//     try {
//         const loggedInUser = req.user._id;

//         const filteredUsers  = await User.find({_id: { $ne: loggedInUser },}).select("-password");
//         res.status(201).json({filteredUsers });
        
//     } catch (error) {
//         console.log("Error in allUser Controller :" + error);
//         res.status(500).json({message:"Server error "});
        
//     }
// } 
