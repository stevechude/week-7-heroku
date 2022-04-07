"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = __importDefault(require("../controller/transactionController"));
const router = express_1.default.Router();
router.get('/', transactionController_1.default.getAllTransaction);
router.get('/:acc', transactionController_1.default.getTransaction);
router.post('/', transactionController_1.default.createTransaction);
exports.default = router;
//# sourceMappingURL=transaction.js.map