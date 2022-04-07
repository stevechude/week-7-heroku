// import { Request, Response } from 'express';
// import Joi from 'joi';
// const create = require('./src/model/balanceModel');

// const createBalance_controller = async (req:Request, res:Response) => {
//     const schema = Joi.object({
//         balance: Joi.number().required()
//     })

//     //validate createAcc inputs
//     const result = schema.validate(req.body);
//     if(result.error) {
//         res.status(400).send(result.error.details[0].message);
//     } else {
//         const newAccBalance = await create.createAcc(req.body)
//         res.status(200).end(JSON.stringify(newAccBalance))
//     }
// };

// export default createBalance_controller