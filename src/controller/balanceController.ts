import Balance from '../model/balanceModel';
import { Request, Response } from 'express';
import { Account } from '../utilityBalance';

async function getAllBalance(req: Request, res: Response) {
    const balances = await Balance.findAll()
    if(!balances) {
        res.writeHead(404, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: "account not found, open account." }))
    } else {
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(balances))
    }
}

async function getBalance(req:Request, res:Response) {
    try {
        const balance = await Balance.findById(Number(req.params.acc))
        if(!balance) {
            res.writeHead(404, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ message: "account number not found." }))
        } else {
            res.writeHead(200, { "Content-Type": "application/json" })
            res.end(JSON.stringify(balance));
        }
    } catch (error) {
        console.log(error)
    }
}

async function createAccBalance(req:Request, res:Response) {
    try {
        const { balance } = req.body;
        const userAccount = {
            acc_number : generateAccountNumber(),
            balance: (balance as number),
            createdAt: new Date().toISOString()
        }

        //console.log(userAccount)
        const newUserAccount= await Balance.createAcc(userAccount)
        if(newUserAccount) {
            res.writeHead(200, { "Content-Type": "application/json" })
            return res.end(JSON.stringify(newUserAccount))
        } else {
            res.status(403).json({ 
                status: 'fail',
                message: 'Account number already exists or the length of account number is not equal to 10.' })
        }
    } catch (error) {
        console.log(error)
    }
}

function generateAccountNumber() {
    return Math.floor(1000000000 + Math.random() * 9999999999);
}

export = {
    getAllBalance,
    getBalance,
    createAccBalance
}