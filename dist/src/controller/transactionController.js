"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const transactionModel_1 = __importDefault(require("../model/transactionModel"));
const balanceModel_1 = __importDefault(require("../model/balanceModel"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
async function getAllTransaction(req, res) {
    const transactions = await transactionModel_1.default.findAll();
    if (!transactions) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "database not found, make a post." }));
    }
    else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(transactions));
    }
}
async function getTransaction(req, res) {
    try {
        //get a particular a transaction by the reference..
        const transaction = await transactionModel_1.default.findById(req.params.acc);
        if (!transaction) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "transaction not found." }));
        }
        else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(transaction));
        }
    }
    catch (error) {
        console.log(error);
    }
}
async function createTransaction(req, res) {
    const accountData = await balanceModel_1.default.findAll();
    const { from, to, amount } = req.body;
    //validating from, to, amount
    const senderAccouunt = accountData.find((details) => details.acc_number == from);
    const receiverAccount = accountData.find((details) => details.acc_number == to);
    const senderCanSend = ((senderAccouunt === null || senderAccouunt === void 0 ? void 0 : senderAccouunt.balance) || 0) >= amount;
    if (senderAccouunt && receiverAccount && senderCanSend) {
        //deduct money from sender..
        senderAccouunt.balance = Number(senderAccouunt.balance) - amount;
        //credit money to receiver..
        receiverAccount.balance = Number(receiverAccount.balance) + amount;
        //create the transaction..
        const transaction = {
            reference: uuid_1.v4(),
            senderAccouunt_number: from,
            amount,
            receiverAccount_number: to,
            createdAt: new Date().toISOString()
        };
        const dbPath = path_1.default.resolve(__filename, '../../../data/balance.json');
        const newTransaction = transactionModel_1.default.create(transaction);
        fs_1.default.writeFileSync(dbPath, JSON.stringify(accountData, null, ' '));
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(newTransaction));
    }
    else {
        res.status(404).json({
            status: 'fail',
            message: 'Please make sure the receiver\'s account and sendr\'s account exist and the amount is not above the sender\'s balance.'
        });
    }
}
module.exports = {
    getAllTransaction,
    getTransaction,
    createTransaction
};
//# sourceMappingURL=transactionController.js.map