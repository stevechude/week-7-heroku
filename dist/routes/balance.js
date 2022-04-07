"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const balanceController_1 = __importDefault(require("../controller/balanceController"));
const joi_validation_1 = require("../validator/joi_validation");
//import fs from 'fs';
//import accountBalance from '../data/balance.json'
const router = express_1.default.Router();
router.get('/', balanceController_1.default.getAllBalance);
router.get('/:acc', balanceController_1.default.getBalance);
router.post('/', joi_validation_1.accountValidator, balanceController_1.default.createAccBalance);
exports.default = router;
//# sourceMappingURL=balance.js.map