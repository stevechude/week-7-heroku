
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(__filename, '../../../data/balance.json')
console.log(dbPath)

function createObj() {
    if(!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify([]))
    }
    return JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
}

function findAll() {
    return new Promise((res, rej) => {
        const balance = createObj();
        try {
            res(balance);
        } catch (error) {
            console.log(error)
        }
    })
}

function findById(acc: number) {
    return new Promise((res, rej) => {
        const balance = createObj();
        interface obj {
            "acc_number": number,
            "balance": number,
            "createdAt": string
        }

        const accBalance = balance.find((a:obj) => a.acc_number === acc)
        res(accBalance);
    })
}

function createAcc(userAccount: { acc_number: number, balance: number }) {
    return new Promise((res, rej) => {
        const balance = createObj();
       
        if(balance.some((acc: { acc_number: number; }) => acc.acc_number === userAccount.acc_number || String(userAccount.acc_number).length !== 10)) {
            res(null)
            return;
        }

        const newUserAccount = {...userAccount};
        balance.push(newUserAccount)
        fs.writeFileSync(dbPath, JSON.stringify(balance, null, " "));
        res(newUserAccount);
    })
}

export = {
    findAll,
    findById,
    createAcc
}