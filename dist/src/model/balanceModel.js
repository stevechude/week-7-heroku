"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dbPath = path_1.default.resolve(__filename, '../../../data/balance.json');
console.log(dbPath);
function createObj() {
    if (!fs_1.default.existsSync(dbPath)) {
        fs_1.default.writeFileSync(dbPath, JSON.stringify([]));
    }
    return JSON.parse(fs_1.default.readFileSync(dbPath, 'utf-8'));
}
function findAll() {
    return new Promise((res, rej) => {
        const balance = createObj();
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
        const accBalance = balance.find((a) => a.acc_number === acc);
        res(accBalance);
    });
}
function createAcc(userAccount) {
    return new Promise((res, rej) => {
        const balance = createObj();
        // interface obj {
        //     "acc_number": number,
        //     "balance": number,
        //     "createdAt": string
        // }
        if (balance.some((acc) => acc.acc_number === userAccount.acc_number || String(userAccount.acc_number).length !== 10)) {
            res(null);
            return;
        }
        const newUserAccount = { ...userAccount };
        balance.push(newUserAccount);
        fs_1.default.writeFileSync(dbPath, JSON.stringify(balance, null, " "));
        res(newUserAccount);
    });
}
module.exports = {
    findAll,
    findById,
    createAcc
};
//# sourceMappingURL=balanceModel.js.map