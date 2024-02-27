import Customers from '../models/CustomerModel.js';
import User from '../models/UserModel.js';
import argon2 from 'argon2';
// import jwt  from 'jsonwebtoken';

export const Register = async(req,res)=>{
  try {

    // CheckUser
    // console.log(req.body)
    const {userEmail, userPass, userFname,userLname, userHouseNo, userMoo, userPlace,userDistrict,userProvince,userZipcode,userTel,userRole} = req.body

    var user = await User.findOne({
      where: {
        userEmail: req.body.userEmail
      }
    })
   
    if(user){
      return res.send('User Already Exits!!').status(400)
    }
    // Encrypt
    const salt = await bcrypt.genSalt(10)
    user = new User({
      userEmail,
      userPass,
      userFname,
      userLname,
      userHouseNo,
      userMoo,
      userPlace,
      userDistrict,
      userProvince,
      userZipcode,
      userTel,
      userRole
    })
    user.userPass = await bcrypt.hash(userPass,salt)
    // Save 
   await user.save()
    res.send("Register Successfully")
  } catch (error) {
    console.log(error)
      res.status(500).send('Server Error')
  }
}

export const Login = async(req, res) => {
    const user = await User.findOne({
        where: {
          userEmail: req.body.userEmail
        }
      });
      if(!user) return res.status(404).json({msg: 'ไม่พบผู้ใช้'});
      const match = await argon2.verify(user.userPass, req.body.userPass);
      if(!match) return res.status(400).json({msg: 'รหัสผ่านไม่ถูกต้อง'});
      req.session.userId = user.id;
      // console.log("Check Sesssion = " , req.session)
      // console.log("uuid", user)
      const id = user.id;
      const userFname = user.userFname;
      const userLname = user.userLname;
      const userEmail = user.userEmail;
      const userRole = user.userRole;
      
      res.status(200).json({id, userFname, userLname, userEmail, userRole});


    // try {
    //   // Check User
    //   const {userEmail, userPass} = req.body
    //   var user = await User.findOne({
    //     where:{
    //       userEmail: req.body.userEmail
    //     }
    //   })
    //   console.log(user)
    //   if(user) {
    //     const isMatch = await bcrypt.compare(userPass,user.userPass)

    //     if(!isMatch){
    //       return res.status(400).send("Password Invalid")
    //     }
    //   // Payload
    //     var payload = {
    //       user:{
    //         userEmail: user.userEmail
    //       }
    //     }
    //   // Generate
    //     jwt.sign(payload,'jwtsecret',{expiresIn:20},(err,token)=>{
    //       if(err) throw err;
    //       res.json({token,payload})
    //     })

    //   }else{
    //     return res.status(400).send("User not found")
    //   }

    //   // res.send("hello")
    // } catch (error) {
    //   console.log(error)
    //   res.status(500).send('Server Error')
    // }
    }

    export const Me = async(req, res) => {
      // console.log(req.session)
        if(!req.session.userId){
            return res.status(401).json({msg: 'กรุณาเข้าสู่ระบบ'});
        }
        const user = await User.findOne({
            attributes: ['id', 'userFname', 'userLname', 'userEmail', 'userRole'],
            where: {
              id: req.session.userId
            }
          });
          if(!user) return res.status(404).json({msg: 'ไม่พบผู้ใช้'});
          res.status(200).json(user);

    }

    export const logOut = (req, res) => {
        req.session.destroy((err) => {
            if(err) return res.status(400).json({msg: 'ไม่สารมารถออกจากระบบได้'});
            res.status(200).json({msg: 'ออกจากระบบ'});
        });
    }

    // Login Custommer
export const LoginCus = async(req, res) => {
  const cus = await Customers.findOne({
      where: {
        CusUsername: req.body.CusUsername
      }
    });
    if(!cus) return res.status(404).json({msg: 'ไม่พบผู้ใช้'});
    const match = await argon2.verify(cus.CusPass, req.body.CusPass);
    if(!match) return res.status(400).json({msg: 'รหัสผ่านไม่ถูกต้อง'});
    req.session.cusId = cus.uuid;
    const uuid = cus.uuid;
    const CusFname = cus.CusFname;
    const CusLname = cus.CusLname;
    const CusUsername = cus.CusUsername;
    
    res.status(200).json({uuid, CusFname, CusLname, CusUsername});
  }

  export const MeCustomer = async(req, res) => {
    if(!req.session.cusId){
        return res.status(401).json({msg: 'กรุณาเข้าสู่ระบบ'});
    }
    const cus = await Customers.findOne({
        attributes: ['uuid', 'CusFname', 'CusLname', 'CusUsername'],
        where: {
          uuid: req.session.cusId
        }
      });
      if(!cus) return res.status(404).json({msg: 'ไม่พบผู้ใช้'});
      res.status(200).json(cus);

}
