import Sales from "../models/SaleModel.js";

export const getSale = async(req,res) => {
    try {
        const sale = await Sales.findAll();
       
        res.json(sale)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"})
    }
}


export const SaveNumberSale = async(req,res) => {
    const {salesNumber} = req.body;

    try {
        await Sales.create({
            salesNumber: salesNumber,
            userId: req.userId
        });
        res.status(201).json({msg: 'บันทึกข้อมูลสำเร็จ'});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'บันทึกข้อมูลผิดพลาด'})
    }
}