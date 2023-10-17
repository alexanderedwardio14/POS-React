import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";
import {Op} from "sequelize";


export const getProducts = async(req, res) => {
    try {
        let response;
        if(req.role === "admin"){
            response = await Products.findAll({
                attributes: ['uuid','name','price','stock'],
                include:[{
                    model: Users,
                    attributes: ['name','email']
                }]
            });
        }else{
            response = await Products.findAll({
                attributes: ['uuid','name','price','stock'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: Users,
                    attributes: ['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

}
export const getAllProducts = async(req, res) => {
    try {
        let response;
        if(req.role === "admin"){
            response = await Products.findAll({
                attributes: ['uuid','name','price','stock','id'],
                where:{
                    stock: {[Op.gt]: 0}
                },
                include:[{
                    model: Users,
                    attributes: ['name','email','id']
                }]
            });
        }else{
            response = await Products.findAll({
                attributes: ['uuid','name','price','stock','id'],
                where:{
                    stock: {[Op.gt]: 0}
                },
                include:[{
                    model: Users,
                    attributes: ['name','email','id']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

}
export const getProductById = async(req, res) => {
    try {
        const product = await Products.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg:"Data tidak ditemukan."});
        let response;
        if(req.role === "admin"){
            response = await Products.findOne({
                attributes: ['uuid','name','price','stock'],
                where:{
                    id: product.id
                },
                include:[{
                    model: Users,
                    attributes: ['name','email']
                }]
            });
        }else{
            response = await Products.findOne({
                attributes: ['uuid','name','price','stock'],
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                },
                include:[{
                    model: Users,
                    attributes: ['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
    
}
export const createProduct = async(req, res) => {
    const {name, price, stock} = req.body;
    try {
        await Products.create({
            name: name,
            price: price,
            stock: stock,
            userId: req.userId
        });
        res.status(201).json({msg: "Product telah ditambahkan"});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
    
}
export const updateProduct = async(req, res) => {
    try {
        const product = await Products.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg:"Data tidak ditemukan."});
        const {name, price, stock} = req.body;
        if(req.role === "admin"){
            await Products.update({name, price, stock},{
                where:{
                    id: product.id
                }
            });
        }else{
            if(req.userId !== product.userId) return res.status(403).json({msg:"Akses terlarang"});
            await Products.update({name, price, stock},{
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg:"Product updated"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    } 
}

export const updateStock = async(req, res) => {
    try {
        const product = await Products.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg:"Data tidak ditemukan."});
        const {name, price, stock} = req.body;
        
            await Products.update({name, price, stock},{
                where:{
                    id: product.id
                }
            });
        
        res.status(200).json({msg:"Product updated"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    } 
}

export const deleteProduct = async(req, res) => {
    try {
        const product = await Products.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg:"Data tidak ditemukan."});
        const {name, price, stock} = req.body;
        if(req.role === "admin"){
            await Products.destroy({
                where:{
                    id: product.id
                }
            });
        }else{
            if(req.userId !== product.userId) return res.status(403).json({msg:"Akses terlarang"});
            await Products.destroy({
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg:"Product Deleted"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
    
}