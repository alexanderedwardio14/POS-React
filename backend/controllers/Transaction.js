import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";
import Transaction from "../models/TransactionModel.js";
import {Op} from "sequelize";


export const getTransactions = async(req, res) => {
    try {
        const response = await Transaction.findAll({
            attributes:['uuid','quantity','type','trxId'],
            include:[{
                model: Users,
                attributes: ['name', 'email']
            },{
                model: Products,
                attributes: ['name', 'price', 'stock']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}
export const getTransactionByUser = async(req, res) => {
    try {
        const transaction = await Transaction.findAll({
            where:{
                userId: req.params.userId
            }
        });
        if(!transaction) return res.status(404).json({msg:"Data tidak ditemukan."});
        let response;
        if(req.role === "admin"){
            response = await Transaction.findAll({
                attributes: ['uuid','quantity','type','trxId'],
                where:{
                    userId: req.params.id
                },
                include:[{
                    model: Users,
                    attributes: ['name', 'email']
                },{
                    model: Products,
                    attributes: ['name', 'price', 'stock']
                }]
            });
        }else{
            response = await Transaction.findAll({
                attributes: ['uuid','quantity','type','trxId'],
                where:{
                    [Op.and]:[{userId: req.params.id}, {userId: req.userId}]
                },
                include:[{
                    model: Users,
                    attributes: ['name', 'email']
                },{
                    model: Products,
                    attributes: ['name', 'price', 'stock']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
    
}

export const getTransactionByTrxId = async(req, res) => {
    try {
        const transaction = await Transaction.findAll({
            where:{
                trxId: req.params.id
            }
        });
        if(!transaction) return res.status(404).json({msg:"Data tidak ditemukan."});
        let response;
        if(req.role === "admin"){
            response = await Transaction.findAll({
                attributes: ['uuid','quantity','type','trxId'],
                where:{
                    trxId: req.params.id
                },
                include:[{
                    model: Users,
                    attributes: ['name', 'email']
                },{
                    model: Products,
                    attributes: ['name', 'price', 'stock']
                }]
            });
        }else{
            response = await Transaction.findAll({
                attributes: ['uuid','quantity','type','trxId'],
                where:{
                    [Op.and]:[{trxId: req.params.id}, {userId: req.userId}]
                },
                include:[{
                    model: Users,
                    attributes: ['name', 'email']
                },{
                    model: Products,
                    attributes: ['name', 'price', 'stock']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    } 
}
export const createTransaction = async(req, res) => {
    const { quantity, type, productId, trxId} = req.body;
    try {
        await Transaction.create({
            quantity: quantity,
            type: type,
            productId: productId,
            trxId: trxId,
            userId: req.userId
        });
        res.status(201).json({msg: "Transaction telah ditambahkan"});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
    
}
export const updateTransaction = async(req, res) => {
    try {
        const transaction = await Transaction.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!transaction) return res.status(404).json({msg:"Data tidak ditemukan."});
        const {quantity, type} = req.body;
        
            await Transaction.update({ quantity, type},{
                where:{
                    id: transaction.id
                }
            });
        
        res.status(200).json({msg:"Transaction updated"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const insertUpdateTransaction = async(req, res) => {
    try {
        const transaction = await Transaction.findOne({
            where:{
                trxId: req.params.id
            }
        });
        if(!transaction){
            const { quantity, type, productId} = req.body;
            
                await Transaction.create({
                    quantity: quantity,
                    type: type,
                    productId: productId,
                    trxId: req.params.id,
                    userId: req.userId
                });
                res.status(201).json({msg: "Transaction telah ditambahkan"});
            
        }else{
        const {quantity, type} = req.body;
        
            await Transaction.update({ quantity, type},{
                where:{
                    trxId: req.params.id
                }
            });
        
        res.status(200).json({msg:"Transaction updated"});
        }
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteTransaction = async(req, res) => {
    try {
        const transaction = await Transaction.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!transaction) return res.status(404).json({msg:"Data tidak ditemukan."});
        const {quantity, type} = req.body;
    
            await Transaction.destroy({
                where:{
                    id: product.id
                }
            });
        
        res.status(200).json({msg:"Transaction Deleted"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
    
}