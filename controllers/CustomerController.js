import Customers from "../models/CustomerModel.js";
import argon2 from "argon2";

export const getCustomers = async (req, res) => {
  try {
    const response = await Customers.findAll({
        attributes: ['uuid', 'CusFname', 'CusLname', 'Cususername','CusHouseNo', 'CusMoo', 'CusPlace',
        'CusDistrict',
        'CusProvince',
        'CusZipcode',
        'CusTel']
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const response = await Customers.findOne({
        attributes: ['uuid', 'CusFname', 'CusLname', 'Cususername','CusHouseNo', 'CusMoo', 'CusPlace',
        'CusDistrict',
        'CusProvince',
        'CusZipcode',
        'CusTel'],
      where: {
        uuid: req.params.id
      }
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createCustomer = async (req, res) => {
  const {
    CusFname,
    CusLname,
    CusUsername,
    CusPass,
    CusconfPass,
    CusHouseNo,
    CusMoo,
    CusPlace,
    CusDistrict,
    CusProvince,
    CusZipcode,
    CusTel
  } = req.body;
  if (CusPass !== CusconfPass)
    return res.status(400).json({ msg: "รหัสผ่านไม่ตรงกัน" });
  const hashPass = await argon2.hash(CusPass);
  if (CusUsername !== CusUsername) return res.status(401).json({msg: "ระบบมีชื่อผู้ใช้นี้แล้ว"});
  try {
    
      await Customers.create({
      CusFname: CusFname,
      CusLname: CusLname,
      CusUsername: CusUsername,
      CusPass: hashPass,
      CusHouseNo: CusHouseNo,
      CusMoo: CusMoo,
      CusPlace: CusPlace,
      CusDistrict: CusDistrict,
      CusProvince: CusProvince,
      CusZipcode: CusZipcode,
      CusTel: CusTel,
    });
    res.status(201).json({ msg: "ลงทะเบียนสำเร็จ" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateCustomer = async (req, res) => {
//     const user = await Users.findOne({
//       where: {
//         uuid: req.params.id
//       }
//     });
    
//     if(!user) return res.status(404).json({msg: 'ไม่พบผู้ใช้'});
  
//     const {
//         userFname,
//         userLname,
//         userEmail,
//         userPass,
//         userconfPass,
//         userHouseNo,
//         userMoo,
//         userPlace,
//         userDistrict,
//         userProvince,
//         userZipcode,
//         userTel,
//         userRole,
//       } = req.body;
      
//       let hashPass;
//       if(userPass === '' || userPass === null){
//         hashPass = user.userPass
//       }else {
//         hashPass = await argon2.hash(userPass);
//       }
//       if (userPass !== userconfPass)
//     return res.status(400).json({ msg: "รหัสผ่านไม่ตรงกัน" });
    
//     try {
//         await Users.update({
//           userFname: userFname,
//           userLname: userLname,
//           userEmail: userEmail,
//           userPass: hashPass,
//           userHouseNo: userHouseNo,
//           userMoo: userMoo,
//           userPlace: userPlace,
//           userDistrict: userDistrict,
//           userProvince: userProvince,
//           userZipcode: userZipcode,
//           userTel: userTel,
//           userRole: userRole,
//         },{
//             where: {
//                 id: user.id
//             }
//         });
//         res.status(200).json({ msg: "แก้ไขข้อมูลผู้ใช้สำเร็จ" });
        
//       } catch (error) {
//         res.status(400).json({ msg: error.message });
//       }
      
};

export const deleteCustomer = async (req, res) => {
//     const user = await Users.findOne({
//         where: {
//           uuid: req.params.id
//         }
//       });
//       if(!user) return res.status(404).json({msg: 'ไม่พบผู้ใช้'});
//       try {
//           await Users.destroy({
//               where: {
//                   id: user.id
//               }
//           });
//           res.status(200).json({ msg: "ลบผู้ใช้สำเร็จ" });
//         } catch (error) {
//           res.status(400).json({ msg: error.message });
//         }
};
