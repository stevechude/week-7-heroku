import { getPostData, UserObj } from '../utilityTransaction';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(__filename, '../../../data/transaction.json')

function createObj() {
    if(!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify([]))
    }
    return JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
}

function findAll() {
    return new Promise((res, rej) => {
        const balance = createObj();
        console.log(balance)
        try {
            res(balance);
        } catch (error) {
            console.log(error)
        }
    })
}

function findById(acc:string) {
    return new Promise((res, rej) => {
        const balance = createObj();
        interface obj {
            "reference": string,
            "senderAccount_number": number,
            "amount": number,
            "receiverAccount_number": number,
            "transferDescription": string,
            "createdAt": string
        }

        const accTransaction = balance.find((p:obj) => p.reference === acc)
        res(accTransaction);
    })
}

function create(acc: UserObj) {
    return new Promise((res, rej) => {
        let balance = createObj();
        console.log(balance)
        if(!balance) {
            balance = [];
        }
        const newAccount = {...acc};
        balance.push(newAccount)
        fs.writeFileSync(dbPath, JSON.stringify(balance, null, " "))
        res(newAccount);
    })
}

export = {
    findAll,
    findById,
    create
}