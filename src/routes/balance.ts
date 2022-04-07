import express from 'express';
import controller from '../controller/balanceController';
import { accountValidator } from '../validator/joi_validation';
//import fs from 'fs';
//import accountBalance from '../data/balance.json'

const router = express.Router();


router.get('/', controller.getAllBalance);

router.get('/:acc', controller.getBalance);

router.post('/', accountValidator, controller.createAccBalance);

export default router;