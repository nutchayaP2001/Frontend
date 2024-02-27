import Category from "../models/CategoryModel.js";
import Customers from "../models/CustomerModel.js";
import ProductDamage from "../models/ProductDamageModel.js"
import path from "path";
import Users from "../models/UserModel.js";
import { where } from "sequelize";

export const getProductDamage = async(req,res) => {
    try {
        const response = await ProductDamage.findAll({
           include: [
            {
                model: Customers,
                attributes: ["CusUsername"]
            },
            {
                model: Category,
                attributes: ['CatName']
            }
           ],
           order: [
            // เรียงจากใหม่ไปเก่า
            ['createdAt', 'DESC']
            
           ]
        })
        res.status(200).json(response);
    } catch (error) {
    res.status(500).json({ msg: error.message });
        
    }

}

// export const getAdmin = async(req,res) => {
//     try {
//         const response = await ProductDamage.findAll({
//             include: [
//                 {
//                     model: Users,
//                     attributes: ['userEmail']
//                 }

//             ]
//         })
//         res.status(200).json(response);
//     } catch (error) {
//     res.status(500).json({ msg: error.message });
        
//     }
// }

export const getProductDamageById = async(req,res) => {
    try {
        const damage = await ProductDamage.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Customers,
                    attributes: ["CusUsername"]
                },
                {
                    model: Category,
                    attributes: ['CatName']
                }
               ]
        })
        res.status(200).json(damage)
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createProductDamage = (req,res) => {
    if(req.files === null)
    return res.status(400).json({msg: 'ยังไม่ได้กรอกข้อมูล'});

    const {date_pickupProduct,description, categoryId} = req.body;
    const damageImage = req.files.damageImage;
    const fileSize = damageImage.data.length;
    const ext = path.extname(damageImage.name);
    const fileName = "Pro_Damage-" + damageImage.md5 + ext;
    const ImageURL = `${req.protocol}://${req.get("host")}/prodamagefiles/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];
    if(!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({msg: "นามสกุลไฟล์ไม่ถูกต้อง"});
    if(fileSize > 5000000)
    return res.status(422).json({msg: 'รูปภาพต้องมีขนาดไฟล์ไม่เกิน 5 MB'});

    damageImage.mv(`./public/prodamagefiles/${fileName}`, async(err) => {
        if(err) return res.status(500).json({msg: err.message});

        try{
            await ProductDamage.create({
                date_pickupProduct: date_pickupProduct,
                description: description,
                damageImage: fileName,
                damageURL: ImageURL,
                categoryId: categoryId,
                cusId: req.cusId
            })
    res.status(201).json({msg: "แจ้งสินค้าชำรุดสำเร็จ"})

        }catch (error) {
            res.status(500).json({ msg: error.message });

        }
    })
}

export const updateStatusProductDamage = async(req,res) => {
    const damage_status = await ProductDamage.findOne({
        where: {
            id: req.params.id
        }
    })

    const {status, admin_note} = req.body
    try{
        await ProductDamage.update({
            status: status,
            admin_note: admin_note,
            userId: req.userId
        },{
             where: {
            id: damage_status.id
        }
        })
        res.status(200).json({msg: "อัพเดตสถานะเรียบร้อย"});

    }catch(error){
        res.status(500).json({ msg: error.message });

    }
}

export const deleteProductDamage = async(req,res) => {
    
}