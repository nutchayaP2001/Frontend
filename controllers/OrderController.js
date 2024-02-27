import Orders from "../models/OrderModel.js"
import Customers from "../models/CustomerModel.js"
import Products from "../models/ProductModel.js";
import Category from "../models/CategoryModel.js";
import { Op, where } from "sequelize";

export const getOrders = async (req,res) => {
    try{
        const response = await Orders.findAll({
            attributes: [
                "id",
                "order_date",
                "order_picupdate",
                "order_amount",
                "order_price",
                "order_status",
                "productId",
                "categoryId",
            ],
            include: [
                {
                    model: Products,
                    attributes: ["ProName", "ProDes","ProImage"]
                },
                {
                    model: Category,
                    attributes: ["CatName"]
                },
                {
                    model: Customers,
                    attributes: ["CusUsername"]
                },
            ],
            sort: ([["createAt","desc"]])
        });
        res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
}

export const getOrderCus = async (req,res) => {
   
}


export const getOrderById = async (req,res) => {
    try {
        const response = await Orders.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Products,
                    attributes: ["ProName", "ProDes","ProImage","ProURL","ProPrice","ProSize","ProUnit"]
                },
                {
                    model: Category,
                    attributes: ["CatName"]
                },
                {
                    model: Customers,
                    attributes: ["CusUsername"]
                },
            ],
        })
      
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ msg: error.message });
        
    }

}

export const createOrder = async (req,res) => {
    const {order_date, order_amount, order_price,order_picupdate, order_status,productId,categoryId} = req.body
    

    try {
        await Orders.create({
            order_date: order_date,
            order_picupdate: order_picupdate,
            order_amount: order_amount,
            order_price: order_price,
            // order_status: order_status,
            productId: productId,
            categoryId: categoryId,
            cusId: req.cusId
        })
        res.status(201).json({msg: 'สั่งสินค้าเรียบร้อย'})
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createOrderStatus = async (req,res) => {
    const status = await Orders.findOne({
        where: {
            id: req.params.id
          },
    });
    const {
       order_status
    } = req.body
    try {
        await Orders.update({
            order_status: order_status
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

export const updateOrder = async(req,res) => {
    
}

export const deleteOrder = async(req,res) => {
    
}