"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const balanceModel_1 = __importDefault(require("../model/balanceModel"));
async function getAllBalance(req, res) {
    const balances = await balanceModel_1.default.findAll();
    if (!balances) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "account not found, open account." }));
    }
    else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(balances));
    }
}
async function getBalance(req, res) {
    try {
        const balance = await balanceModel_1.default.findById(Number(req.params.acc));
        if (!balance) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "account number not found." }));
        }
        else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(balance));
        }
    }
    catch (error) {
        console.log(error);
    }
}
async function createAccBalance(req, res) {
    try {
        const { balance } = req.body;
        const userAccount = {
            acc_number: generateAccountNumber(),
            balance: balance,
            createdAt: new Date().toISOString()
        };
        //console.log(userAccount)
        const newUserAccount = await balanceModel_1.default.createAcc(userAccount);
        if (newUserAccount) {
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(newUserAccount));
        }
        else {
            res.status(403).json({
                status: 'fail',
                message: 'Account number already exists or the length of account number is not equal to 10.'
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}
function generateAccountNumber() {
    return Math.floor(1000000000 + Math.random() * 9999999999);
}
module.exports = {
    getAllBalance,
    getBalance,
    createAccBalance
};
//# sourceMappingURL=balanceController.js.map