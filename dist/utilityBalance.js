"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = exports.writeDataToFile = void 0;
const fs_1 = __importDefault(require("fs"));
let Account;
exports.Account = Account;
function writeDataToFile(filename, content) {
    fs_1.default.writeFile(filename, JSON.stringify(content, null, 3), 'utf-8', (err) => {
        if (err) {
            console.log(err);
        }
    });
}
exports.writeDataToFile = writeDataToFile;
//# sourceMappingURL=utilityBalance.js.map