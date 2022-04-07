import express from 'express';
import controller from '../controller/transactionController';
const router = express.Router();




router.get('/', controller.getAllTransaction);

router.get('/:acc', controller.getTransaction);

router.post('/', controller.createTransaction);

export default router