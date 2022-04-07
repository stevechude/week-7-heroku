"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostData = void 0;
function getPostData(req) {
    return new Promise((res, rej) => {
        try {
            let body = '';
            req.on('data', (chunks) => {
                body += chunks.toString();
            });
            req.on('end', () => {
                res(body);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getPostData = getPostData;
//# sourceMappingURL=utilityTransaction.js.map