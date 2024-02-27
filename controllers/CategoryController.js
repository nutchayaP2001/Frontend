import path from "path";
import fs from "fs";
import { Op, where } from "sequelize";
import Category from "../models/CategoryModel.js";


export const getCategory = async (req, res) => {
    try {
        const response = await Category.findAll({
            attributes: [
                "id",
                "uuid",
                "CatName"
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findOne({
            where: {
                uuid: req.params.id
            }
        })
      
        res.status(200).json(category);

    } catch (error) {
        res.status(500).json({ msg: error.message });
        
    }

}

export const createCategory = async (req, res) => {
      const {
            CatName
        } = req.body
    
    try {
     
        await Category.create({
            CatName: CatName
        });
        res.status(201).json({ msg: "บันทึกสำเร็จ" });
    } catch (error) {
    res.status(400).json({ msg: error.message });
    }

}

export const updateCategory = async (req, res) => {
    const category = await Category.findOne({
        where: {
            uuid: req.params.id

        }
    });
    const{
        CatName
    } = req.body
    try {
        await Category.update({
            CatName: CatName
        },{
            where: {
                id: category.id
            }
        });
        res.status(200).json(category);

    } catch (error) {
        res.status(500).json({ msg: error.message });
        
    }
}

export const deleteCategory = async (req, res) => {
    
    const category = await Category.findOne({
        where: {
            uuid: req.params.id
        }
    })
    if (!category) return res.status(404).json({ msg: "ไม่พบข้อมูล" });
    try {
        await Category.destroy({
            where: {
                id: category.id
            }
        });
        res.status(200).json("ลบข้อมูลเรียบร้อย");

    } catch (error) {
        res.status(500).json({ msg: error.message });
        
    }

}