"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const accountSchema = joi_1.default.object({
    balance: joi_1.default.number().required()
});
const accountValidator = (req, res, next) => {
    accountSchema
        .validateAsync(req.body, { abortEarly: false })
        .then(() => next())
        .catch((error) => {
        res.status(http_status_codes_1.default.BAD_REQUEST).end(error.message);
    });
};
exports.accountValidator = accountValidator;
//# sourceMappingURL=joi_validation.js.map