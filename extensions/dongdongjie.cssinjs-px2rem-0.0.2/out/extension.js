"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const provider_1 = require("./provider");
const config_1 = require("./config");
function activate(context) {
    const LANS = ['javascript', 'javascriptreact', 'typescriptreact'];
    config_1.getConfig();
    LANS.forEach(lan => {
        const pxtoRemProvider = new provider_1.PxtoRemProvider();
        context.subscriptions.push(vscode.languages.registerCompletionItemProvider(lan, pxtoRemProvider));
    });
    vscode.workspace.onDidChangeConfiguration(() => {
        config_1.getConfig();
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map