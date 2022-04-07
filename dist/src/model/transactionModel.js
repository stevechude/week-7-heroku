"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dbPath = path_1.default.resolve(__filename, '../../../data/transaction.json');
function createObj() {
    if (!fs_1.default.existsSync(dbPath)) {
        fs_1.default.writeFileSync(dbPath, JSON.stringify([]));
    }
    return JSON.parse(fs_1.default.readFileSync(dbPath, 'utf-8'));
}
function findAll() {
    return new Promise((res, rej) => {
        const balance = createObj();
        console.log(balance);
        try {
            res(balance);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function findById(acc) {
    return new Promise((res, rej) => {
        const balance = createObj();
        const accTransaction = balance.find((p) => p.reference === acc);
        res(accTransaction);
    });
}
function create(acc) {
    return new Promise((res, rej) => {
        let balance = createObj();
        console.log(balance);
        if (!balance) {
            balance = [];
        }
        const newAccount = { ...acc };
        balance.push(newAccount);
        fs_1.default.writeFileSync(dbPath, JSON.stringify(balance, null, " "));
        res(newAccount);
    });
}
module.exports = {
    findAll,
    findById,
    create
};
//# sourceMappingURL=transactionModel.js.map