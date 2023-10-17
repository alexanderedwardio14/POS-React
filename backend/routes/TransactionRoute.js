import express from "express";
import {
    getTransactions,
    getTransactionByUser,
    getTransactionByTrxId,
    createTransaction,
    insertUpdateTransaction,
    updateTransaction,
    deleteTransaction
} from "../controllers/Transaction.js";
import { verifyUser } from "../middleware/AuthUser.js";


const router = express.Router();

router.get('/transactions', verifyUser, getTransactions);
router.get('/transactions/:id', verifyUser, getTransactionByUser);
router.get('/transactions/trx/:id', verifyUser, getTransactionByTrxId);
router.post('/transactions', verifyUser, createTransaction);
router.patch('/transactions/:id', verifyUser, updateTransaction);
router.patch('/transactionsiu/:id', verifyUser, insertUpdateTransaction);
router.delete('/transactions/:id', verifyUser, deleteTransaction);

export default router;