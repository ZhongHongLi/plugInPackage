"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PxtoRemProvider = void 0;
const vscode_1 = require("vscode");
const config_1 = require("./config");
class PxtoRemProvider {
    constructor() {
        this.prefixExp = /^[+-]?([0-9]*[.])?[0-9]+(p|px|$)$/;
        this.regexExp = /[+-]?[\w\d.]+$/;
        this.numExp = /[+-]?\d*[.]?\d*/;
    }
    provideCompletionItems(document, position) {
        return new Promise(resolve => {
            const res = this.getPrefix(document, position);
            if (res) {
                const item = new vscode_1.CompletionItem(`${res.pxStr}px -> ${res.remStr}rem  /*${res.designSize}px*/`, vscode_1.CompletionItemKind.Snippet);
                item.insertText = `'${res.remStr}rem'`;
                return resolve([item]);
            }
            else {
                return resolve([]);
            }
        });
    }
    getPrefix(document, position) {
        const line = document.getText(new vscode_1.Range(new vscode_1.Position(position.line, 0), position));
        const match = line.match(this.regexExp);
        if (match && this.prefixExp.test(match[0])) {
            const options = config_1.CONFIG;
            const designSize = options.designSize;
            const keepFloat = options.keepFloat;
            const splitNumber = options.splitNumber;
            const pxStr = match[0].match(this.numExp);
            const pxNum = Number(pxStr);
            const remStr = (pxNum * splitNumber / options.designSize).toFixed(keepFloat);
            return {
                pxStr,
                remStr,
                designSize,
            };
        }
        else {
            return false;
        }
    }
}
exports.PxtoRemProvider = PxtoRemProvider;
//# sourceMappingURL=provider.js.map