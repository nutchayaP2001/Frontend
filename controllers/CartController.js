
// import Cart from "../models/CartModel.js";
import { where } from "sequelize";
import CartItem from "../models/CartItemModel.js";
import Products from "../models/ProductModel.js";
import Sales from "../models/SaleModel.js";
import Users from "../models/UserModel.js";

export const getCartPage = async(req,res) => {
    try{
        const cartItems = await CartItem.findAll({
            include: [
                {
                model: Products
            },
            {
                model: Sales,
                attributes: ['salesNo','TotalSalesPrice']
            },
            {
                model: Users,
                attributes: ['userEmail']
            }
        ],
        order: [
            ['createdAt', 'DESC']
          ]
        });
        res.json(cartItems);
    }catch (error){
        console.error(error);
        res.status(500).json({error: "Internal server error"})
    }
}

export const getCartById = async(req,res) => {
    try {
        const response = await CartItem.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                model: Products
            },
            {
                model: Sales,
                attributes: ['salesNo','TotalSalesPrice']
            },
            {
                model: Users,
                attributes: ['userFname']
            }
        ],
        order: [
            ['createdAt', 'DESC']
          ]
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message });
        
    }

}



export const postCartPage =  async (req,res) => {
try {
    const {salesNo,cartItems} = req.body;
    
    // const salesNumber = generateSalesOrderNumber();

    // const sale = await Sales.create({
    //     salesNumber, item:cartItems
    // const sale = await Sales.create({
    //     saleId 
    // });
    // const saleId = sale.id;
    // })
    // const savedItems =   
    const totalAmount = cartItems.reduce(
        (total, item) => total + item.product.ProPrice * item.quantity,
        0
      );
    const sales = await Sales.create({salesNo,totalSalesPrice:totalAmount});
    await Promise.all(
        cartItems.map(async (item) => {
            return await CartItem.create({
                productId: item.productId,
                quantity: item.quantity,
                totalPrice: item.product.ProPrice * item.quantity,
                userId: req.userId,
                saleId: sales.id
            }),
            await Products.update({
                ProQuantity: item.product.ProQuantity - item.quantity
        },
        { 
            where: {id: item.productId}})
            
        })
        
        
    );
    
    res.json({msg: "Cart item added to the database"})
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
}
}

export const updateCart = (req,res) => {

}
export const deleteCart = async (req,res) => {
    // try {
    //     const productId = req.params.productId;
    //     await CartItem.destroy({where: {productId}});

    //     res.json({msg: 'Product remove from cart successfully'})
    // } catch (error) {
    //     console.error(error);
    // res.status(500).json({ error: 'Internal server error' });
    // }
}

