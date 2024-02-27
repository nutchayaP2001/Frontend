import Users from "../models/UserModel.js";
import argon2 from "argon2";
// import Cart from "../models/CartModel.js";
// import Products from "../models/ProductModel.js";
// import Cart from "../models/CartModel.js";

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: [
        "id",
        "userFname",
        "userLname",
        "userEmail",
        "userHouseNo",
        "userMoo",
        "userPlace",
        "userDistrict",
        "userProvince",
        "userZipcode",
        "userTel",
        "userRole",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: [
        "id",
        "userFname",
        "userLname",
        "userEmail",
        "userHouseNo",
        "userMoo",
        "userPlace",
        "userDistrict",
        "userProvince",
        "userZipcode",
        "userTel",
        "userRole",
      ],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const {
    userFname,
    userLname,
    userEmail,
    userPass,
    userconfPass,
    userHouseNo,
    userMoo,
    userPlace,
    userDistrict,
    userProvince,
    userZipcode,
    userTel,
    userRole,
  } = req.body;
  if (userPass !== userconfPass)
    return res.status(400).json({ msg: "รหัสผ่านไม่ตรงกัน" });
  const hashPass = await argon2.hash(userPass);
  if (userEmail !== userEmail)
    return res.status(401).json({ msg: "ระบบมีชื่อผู้ใช้นี้แล้ว" });
  try {
    await Users.create({
      userFname: userFname,
      userLname: userLname,
      userEmail: userEmail,
      userPass: hashPass,
      userHouseNo: userHouseNo,
      userMoo: userMoo,
      userPlace: userPlace,
      userDistrict: userDistrict,
      userProvince: userProvince,
      userZipcode: userZipcode,
      userTel: userTel,
      userRole: userRole,
    });
    res.status(201).json({ msg: "ลงทะเบียนสำเร็จ" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: "ไม่พบผู้ใช้" });

  const {
    userFname,
    userLname,
    userEmail,
    userPass,
    userconfPass,
    userHouseNo,
    userMoo,
    userPlace,
    userDistrict,
    userProvince,
    userZipcode,
    userTel,
    userRole,
  } = req.body;

  let hashPass;
  if (userPass === "" || userPass === null) {
    hashPass = user.userPass;
  } else {
    hashPass = await argon2.hash(userPass);
  }
  if (userPass !== userconfPass)
    return res.status(400).json({ msg: "รหัสผ่านไม่ตรงกัน" });

  try {
    await Users.update(
      {
        userFname: userFname,
        userLname: userLname,
        userEmail: userEmail,
        userPass: hashPass,
        userHouseNo: userHouseNo,
        userMoo: userMoo,
        userPlace: userPlace,
        userDistrict: userDistrict,
        userProvince: userProvince,
        userZipcode: userZipcode,
        userTel: userTel,
        userRole: userRole,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "แก้ไขข้อมูลผู้ใช้สำเร็จ" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "ไม่พบผู้ใช้" });
  try {
    await Users.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "ลบผู้ใช้สำเร็จ" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const userCart = async (req, res) => {
  try {
    const {cart} = req.body

    let products = []
    for(let i =0; i < cart.length; i++){
      let object = {}

      object.id = cart[i].id;
      object.product = cart[i].ProName;
      object.count = cart[i].count;
      object.price = cart[i].ProPrice;

      products.push(object)
    }
    // console.log(cart)

     let cartTotal = 0;
    for(let i = 0; i < products.length; i++){
      cartTotal = cartTotal + products[i].price * products[i].count
    }
    let newCart = await Cart.create({
      // products,
      // cartTotal,
      userId: req.userId
    })


    console.log(newCart)
    res.status(201).send("เพิ่มสินค้าเรียบร้อย")
    // const {cart} = req.body
    // // Check User
    // let user = await Users.findOne({
    //   attributes: ['userEmail']
    // })
    // // สร้าง Array
    // let products = []
    // let cartOld = await Cart.findOne({
    //  where: {
    //   orderBy: req.userId

    //  }
    // })
    // if(cartOld){
    //   cartOld.destroy({
    //     where:{
    //       uuid: cart.id
    //     }
    //   })
    //   console.log('remove old cart')
    // }

    // for(let i =0; i < cart.length; i++){
    //   let object = {}

    //   object.products = cart[i].id;
    //   object.count = cart[i].count;
    //   object.price = cart[i].ProPrice;

    //   products.push(object)
    // }
    
    // // ผลรวมของตะกร้า
    // let cartTotal = 0;
    // for(let i = 0; i < products.length; i++){
    //   cartTotal = cartTotal + products[i].price * products[i].count
    // }

    // let newCart = await Sales.create({
    //   products: req.products,
    //   // count,
    //   // price,
    //   cartTotal,
    //   orderBy: req.userId
    // })

    // console.log(newCart);
    // res.send("userCart OK");
  } catch (error) {
    console.log(error);
    res.status(500).send("userCart Server error");
  }
};

export const getUserCart = async(req,res)=>{
  try {
    const user = await Users.findOne({
      where: {
        'userEmail': req.user.userEmail
      }
    })
    let sales = await Sales.findOne({
      where:{
        'userId': user.uuid
      },
      attributes: ['products.product', 'ProName', 'ProPrice']
    })
    const { products, cartTotal } = sales;
    res.json({products,cartTotal})
  } catch (error) {
    res.status(500).send('getUserCart Error')
  }
}

