import Payments from "../models/PaymentModel.js";
import Customers from "../models/CustomerModel.js";
import path from "path";
import { Model, Op } from "sequelize";
import Orders from "../models/OrderModel.js";
import Products from "../models/ProductModel.js";
import Category from "../models/CategoryModel.js";

export const getPayments = async(req,res) => {
try {
    const response = await Payments.findAll({
        include:[
            {
                model: Customers,
                attributes: ["CusUsername"]
            },
            {
                model: Orders,
            },
            {
                model: Products,
            }
            ,
            {
                model: Category,
                attributes: ['CatName']
            }
            
        ],
        order: [
            ['createdAt', 'DESC']
        ]
    });
    res.status(200).json(response);
} catch (error) {
    res.status(500).json({ msg: error.message });
    
}
}

export const getPaymentById = async(req,res) => {
    try {
        const payment = await Payments.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Customers,
                    attributes: ["CusUsername"]
                },
                {
                    model: Orders,
                },
                {
                    model: Products,
                },
                {
                    model: Category,
                    attributes: ['CatName']
                }
            ]
        })
        res.status(200).json(payment)
    } catch (error) {
        res.status(500).json({ msg: error.message });
        
    }
}

export const createPayments = async(req,res) => {
    if(req.files === null)
    return res.status(400).json({msg: "ยังไม่ได้กรอกข้อมูล"});

    const {bank,date_pay,total,orderId,productId,categoryId} = req.body
    const slipImage = req.files.slipImage;
    const fileSize = slipImage.data.length;
    const ext = path.extname(slipImage.name)
    const fileName = "Slip-" + slipImage.md5 + ext;
    const slipURL = `${req.protocol}://${req.get("host")}/slipfiles/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if(!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({msg: 'นามสกุลไฟล์ไม่ถูกต้อง'});

    if(fileSize> 5000000)
    return res.status(422).json({msg: "รุปภาพต้องมีขนาดไฟล์ไม่เกิน 5 MB"});

slipImage.mv(`./public/slipfiles/${fileName}`, async(err) => {
    if(err) return res.status(500).json({msg: err.message});

    try {
        await Payments.create({
            bank: bank,
            date_pay: date_pay,
            total: total,
            slipImage: fileName,
            slipURL: slipURL,
            orderId: orderId,
            productId: productId,
            categoryId: categoryId,
            cusId: req.cusId
        })
        res.status(201).json({msg: 'แจ้งชำระเงินสำเร็จ'})
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})


}

export const createPaymentStatus = async(req,res) => {
    const status = await Payments.findOne({
        where: {
            id: req.params.id
          },
    });
    const {
       payment_status
    } = req.body
    try {
        await Payments.update({
            payment_status: payment_status
        },{
            where: {
                id: status.id
            }
        });
        res.status(200).json({msg: "อัพเดตสถานะเรียบร้อย"});
    } catch (error) {
        res.status(500).json({ msg: error.message });
        
    }
}

export const updatePayments = async(req,res) => {
    
}


export const deletePayments = async(req,res) => {
    
}