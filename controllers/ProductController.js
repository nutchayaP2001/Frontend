import path from "path";
import fs from "fs";
import { Op } from "sequelize";
import Products from '../models/ProductModel.js'
import Category from "../models/CategoryModel.js";
import User from "../models/UserModel.js";
import multer from "multer";
// import { query } from "express";


export const getProductsSale = async (req, res) => {
  try {
    // const count = parseInt(req.params.count)

      const response = await Products.findAll({
          attributes: [
            "id",
            "ProName",
            "ProSize",
            "ProDes",
            "ProPrice",
            "ProImage",
            "ProQuantity",
            "ProUnit",
            "ProURL",
            "categoryId"
          ],
          include: [
            {
              model: User,
          attributes: ["userEmail"],
            },
            {
              model: Category,
              attributes: ["CatName"],
            },
          ],
          // limit: [
          //     count
          // ],
          sort: ([["createAt","desc"]])
      
        });
      
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
}


export const getProducts = async (req, res) => {
    try {
      // const count = parseInt(req.params.count)

        const response = await Products.findAll({
            attributes: [
              "id",
              "ProName",
              "ProSize",
              "ProDes",
              "ProPrice",
              "ProImage",
              "ProQuantity",
              "ProUnit",
              "ProURL",
              "categoryId"
            ],
            include: [
              {
                model: User,
            attributes: ["userEmail"],
              },
              {
                model: Category,
                attributes: ["CatName"],
              },
            ],
            // limit: [
            //     count
            // ],
            sort: ([["createAt","desc"]])
        
          });
        
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
}




export const getProductById = async (req, res) => {
    try {
        const product = await Products.findOne({
          where: {
            id: req.params.id,
          },
          
        });
        let response;
        if (!product) return res.status(404).json({ msg: "ไม่พบข้อมูล" });
        if (req.userRole === "แอดมิน" || req.userRole === "พนักงาน") {
          response = await Products.findOne({
            attributes: [
              "id",
              "ProName",
              "ProSize",
              "ProDes",
              "ProPrice",
              "ProImage",
              "ProQuantity",
              "ProUnit",
              "ProURL",
              "categoryId"
            ],
            where: {
              id: product.id,
            },
            include: [
              {
                model: User,
                attributes: ["userEmail"],
              },
              {
                model: Category,
                attributes: ["CatName"],
              },
            ],

          });
        } else {
          response = await Products.findOne({
            attributes: [
              "id",
              "ProName",
              "ProSize",
              "ProDes",
              "ProPrice",
              "ProImage",
              "ProQuantity",
              "ProUnit",
              "ProURL",
              "categoryId"
            ],
            where: {
              [Op.and]: [{ id: product.id }, { userId: req.userId }],
            },
            include: [
              {
                model: User,
                attributes: ["userEmail"],
              },
            ],
          });
        }
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
}

export const createProduct = async (req, res) => {
if(req.files === null)
return res.status(400).json({msg: "ยังไม่ได้กรอกข้อมูล"});

const {ProName,ProPrice,ProSize,ProDes,ProQuantity,ProUnit,categoryId} = req.body;
const ProImage = req.files.ProImage;
const fileSize = ProImage.data.length;
const ext = path.extname(ProImage.name);
const fileName = "Best-" + ProImage.md5 + ext;
const ImageURL = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
const allowedType = ['.png', '.jpg', '.jpeg'];
if(!allowedType.includes(ext.toLowerCase()))
return res.status(422).json({msg: "นามสกุลไฟล์ไม่ถูกต้อง"});
if(fileSize> 5000000)
return res.status(422).json({msg: "รุปภาพต้องมีขนาดไฟล์ไม่เกิน 5 MB"});

ProImage.mv(`./public/uploads/${fileName}`, async (err) => {
  if(err) return res.status(500).json({msg: err.message});

  try {
    await Products.create({
      ProName: ProName,
      ProSize: ProSize,
      ProDes: ProDes,
      ProPrice: ProPrice,
      ProQuantity: ProQuantity,
      ProUnit: ProUnit,
      ProImage: fileName,
      ProURL: ImageURL,
      categoryId: categoryId,
      userId: req.userId
    })
    res.status(201).json({msg: "เพิ่มรายการสำเร็จ"})
  } catch (error) {
    res.status(500).json({ msg: error.message });
    
  }

})
}


export const updateProduct = async (req, res) => {
    const product = await Products.findOne({
        where: {
          id: req.params.id
        },
      });
      if (!product) return res.status(404).json({ msg: "ไม่พบข้อมูล" });
      let fileName = "null";
      if (req.files === null) {
        fileName = Products.ProImage;
      } else {
        const ProImage = req.files.ProImage;
        const fileSize = ProImage.data.length;
        const ext = path.extname(ProImage.name);
       fileName = "Best-" + ProImage.md5 + ext;

        const allowedType = ['.png', '.jpg', '.jpeg'];
        if(!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({msg: "นามสกุลไฟล์ไม่ถูกต้อง"});
        if(fileSize> 5000000)
        return res.status(422).json({msg: "รุปภาพต้องมีขนาดไฟล์ไม่เกิน 5 MB"});

 
        ProImage.mv(`./public/uploads/${fileName}`, (err) => {
          if(err) return res.status(500).json({msg: err.message});
        
          });
      }
      const {ProName,ProPrice,ProSize,ProDes,ProQuantity,ProUnit,categoryId} = req.body;
      const ImageURL = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
    
       try {
        await Products.update({
          ProName: ProName,
          ProSize: ProSize,
          ProDes: ProDes,
          ProPrice: ProPrice,
          ProQuantity: ProQuantity,
          ProUnit: ProUnit,
          ProImage: fileName,
          ProURL: ImageURL,
          categoryId: categoryId,
        userId: req.userId

        },{
            where: {
              id: product.id
            }
        });
       res.status(200).json({msg: 'แก้ไขข้อมูลเรียบร้อย'});
       }catch (error) {
        console.log(error.message);
      }
}

export const getBy = async (req, res) => {
  try {
    const {sort,order,limit} = req.body;

      const response = await Products.findAll({
          attributes: [
            "id",
            "ProName",
            "ProSize",
            "ProDes",
            "ProPrice",
            "ProImage",
            "ProQuantity",
            "ProUnit",
            "ProURL",
            "categoryId"
          ],
          include: [
            {
              model: User,
          attributes: ["userEmail"],
            },
            {
              model: Category,
              attributes: ["CatName"],
            },
          ],
          limit: [
              limit
          ],
          sort: ([[sort,order]])
      
        });
      
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    const product = await Products.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!product) return res.status(404).json({ msg: "ไม่พบข้อมูล" });
      try {
        // const filepath = `./public/uploads/${product.ProImage}`;
        // fs.unlinkSync(filepath);
        await Products.destroy({
          where: {
            id: product.id,
            
          },
        });
         res.status(200).json({ msg: "ลบข้อมูลสำเร็จ" });
      } catch (error) {
        res.status(400).json({ msg: error.message });
      }
}

// const handleQuery = async(req,res,query) => {
//   let products = await Products.findAll({$text:{$search: query},
//     attributes: [
//       "uuid",
//       "ProName",
//       "ProSize",
//       "ProDes",
//       "ProPrice",
//       "ProImage",
//       "ProQuantity",
//       "ProURL",
//       "categoryId"
//     ],
//     include: [
//       {
//         model: User,
//     attributes: ["userEmail"],
//       },
//       {
//         model: Category,
//         attributes: ["CatName"],
//       },
//     ],})
  

//   res.send(products)
// }

// export const searchFilters = async (req,res) => {
//   const {query} = req.body
//   if(query){
//     console.log('query', query)
//     await handleQuery(req,res,query);

//   }
// }
