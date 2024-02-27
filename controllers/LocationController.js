import Province from "../models/ProvinceModel.js"
import District from "../models/DistrictModel.js"
import Subdistrict from "../models/SubdistrictModel.js"

export const listProvince = async(req,res) => {
    try {
        const dataProvince = await Province.findAll({
            attributes: [
                'code',
                'name_th',
                'name_th_short',
                'name_en',
                'geography_id'
            ]
        })
        res.status(200).json(dataProvince)
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const listDistrict = async(req,res) => {
    try {
        // const code = req.params.code
        const dataDistrict = await District.findAll({
            attributes: [
                'code',
                'name_th',
                'name_en',
                'province_code'
            ],
            where: {
                province_code: req.params.id
            }
        })
        res.status(200).json(dataDistrict)
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
export const listSubdistrict = async(req,res) => {
    try {
        // const code = req.params.code
        const dataSubdistrict = await Subdistrict.findAll({
            attributes: [
                'code',
                'zip_code',
                'name_th',
                'name_en',
                'district_code'
            ],
            where: {
                district_code: req.params.id
            }
        })
        res.status(200).json(dataSubdistrict)
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const createLocation = async(req,res) => {
    try {
        const dataLocation = await new Location(req.body).save();
        // console.log(req.body)
        res.send(dataLocation)
        // res.send('dataLocation')
    } catch (error) {
        console.log(error)
        res.status(400).send('Serve Error')
    }
}

export const getDistrict = async(req,res) => {
    try {
        const dataDistrict = await District.findAll({
            attributes: [
                'code',
                'name_th',
                'name_en',
                'province_code'
            ]
        })
        res.status(200).json(dataDistrict)
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}