import Category from "../models/CategoryModel.js";
import Products from "../models/ProductModel.js";
import Promotions from "../models/PromotionModel.js"
import Users from "../models/UserModel.js";

export const getPromotion = async(req,res) => {
    try {
        const response = await Promotions.findAll({
            include: [
                {
                    model: Products,
                },
                {
                    model: Users,
                    attributes: ['userEmail']
                }
            ]
        })
        res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ msg: error.message });
        
    }
}
export const getPromotionById = async(req,res) => {
    try {
        const promotions = await Promotions.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Products
                },
                {
                    model: Users,
                    attributes: ['userEmail']
                }
            ]
        })
        res.status(200).json(promotions)
    } catch (error) {
        res.status(500).json({ msg: error.message });
        
    }
    
}
export const createPromotion = async(req,res) => {
    const {type_discount,discount,date_start,date_end,productId} = req.body
    try {
        await Promotions.create({
            type_discount: type_discount,
            discount: discount,
            date_start: date_start,
            date_end: date_end,
            productId: productId,
            userId: req.userId
        })
        res.status(201).json({msg: "เพิ่มโปรโมชันสำเร็จ"})
    } catch (error) {
    res.status(500).json({ msg: error.message });
        
    }
}
export const updatePromotion = async(req,res) => {
    const promotions = await Promotions.findOne({
        
    })
    
}
export const deletePromotion = async(req,res) => {
    
}