import User from '../models/UserModel.js';
import Customers from '../models/CustomerModel.js';
// import jwt  from 'jsonwebtoken';

// export const auth = async (req,res,next) => {
//   try {
//     const token = req.headers["authtoken"]
//     if(!token){
//       return res.status(401).send("No Token")
//     }
//     const decoded = jwt.verify(token, 'jwtsecret')
//     req.user = decoded.user

//     next();

//   } catch (error) {
//     console.log(error)
//     res.send('Token Invalid').status(500)
//   }
// }

export const verifyUser = async (req, res, next) => {
  // console.log(req.session)
    if(!req.session.userId){
        return res.status(401).json({msg: 'กรุณาเข้าสู่ระบบ'});
    }
    const user = await User.findOne({
        where: {
          id: req.session.userId
        }
      });
      if(!user) return res.status(404).json({msg: 'ไม่พบผู้ใช้'});
      req.userId = user.id;
      req.userRole = user.userRole;
      next();
}

export const adminOnly = async (req, res, next) => {
    const user = await User.findOne({
        where: {
          id: req.session.userId
        }
      });
      if(!user) return res.status(404).json({msg: 'ไม่พบผู้ใช้'});
      if(user.userRole !== 'แอดมิน') return res.status(404).json({msg: 'ไม่มีสิทธิ์เข้าถึง'});
      next();
}

export const verifyCustomer = async (req, res, next) => {
  if(!req.session.cusId){
      return res.status(401).json({msg: 'กรุณาเข้าสู่ระบบ'});
  }
  const cus = await Customers.findOne({
      where: {
        uuid: req.session.cusId
      }
    });
    if(!cus) return res.status(404).json({msg: 'ไม่พบผู้ใช้'});
    req.cusId = cus.id;
    req.CusUsername = cus.CusUsername;
    next();
}

export const customerOnly = async (req, res, next) => {
  const cus = await Customers.findOne({
      where: {
        uuid: req.session.cusId
      }
    });
    if(!cus) return res.status(404).json({msg: 'ไม่พบผู้ใช้'});
    if(cus.userRole === 'แอดมิน' && cus.userRole === 'พนักงาน') return res.status(404).json({msg: 'ไม่มีสิทธิ์เข้าถึง'});
    next();
}


