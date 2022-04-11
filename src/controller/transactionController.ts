import { Request, Response } from 'express';
import Accounts from '../model/transactionModel';
import balanceModel from '../model/balanceModel';
import { getPostData, UserObj } from '../utilityTransaction';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';


async function getAllTransaction(req:Request, res:Response) {
    const transactions = await Accounts.findAll();
    if(!transactions) {
        res.writeHead(404, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: "database not found, make a post." }))
    } else {
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(transactions))
    }
}

async function getTransaction(req:Request, res:Response) {
    try {
        //get a particular a transaction by the reference..
        const transaction = await Accounts.findById(req.params.acc);
        if(!transaction) {
            res.writeHead(404, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ message: "transaction not found." }))
        } else {
            res.writeHead(200, { "Content-Type": "application/json" })
            res.end(JSON.stringify(transaction))
        }
    } catch (error) {
        console.log(error)
    }
}

async function createTransaction(req:Request, res:Response) {
    const accountData:any = await balanceModel.findAll();
    const { from, to, amount } = req.body;

    //validating from, to, amount
    const senderAccouunt = accountData.find((details: { acc_number: any; }) => details.acc_number == from);
    const receiverAccount = accountData.find((details: { acc_number: any; }) => details.acc_number == to);
    const senderCanSend = (senderAccouunt?.balance || 0) >= amount;

    if(senderAccouunt && receiverAccount && senderCanSend) {
        //deduct money from sender..
        senderAccouunt.balance = Number(senderAccouunt.balance) - amount;
        //credit money to receiver..
        receiverAccount.balance = Number(receiverAccount.balance) + amount;

        //create the transaction..
        const transaction: UserObj = {
            reference: uuidv4(),
            senderAccouunt_number: from,
            amount,
            receiverAccount_number: to,
            createdAt: new Date().toISOString()
        }
        const dbPath = path.resolve(__filename, '../../../data/balance.json');
        const newTransaction = await Accounts.create(transaction);
        fs.writeFileSync(dbPath, JSON.stringify(accountData, null, ' '))
        res.writeHead(200, { "Content-Type": "application/json" })
        return res.end(JSON.stringify(newTransaction))
    } else {
        res.status(404).json({
            status: 'fail',
            message: 'Please make sure the receiver\'s account and sendr\'s account exist and the amount is not above the sender\'s balance.' 
        });
    }
}

export = {
    getAllTransaction,
    getTransaction,
    createTransaction
}
