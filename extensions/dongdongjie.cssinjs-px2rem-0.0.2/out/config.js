"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.CONFIG = void 0;
const vscode_1 = require("vscode");
const getConfig = () => {
    exports.CONFIG = vscode_1.workspace.getConfiguration('cssinjsPx2rem');
};
exports.getConfig = getConfig;
//# sourceMappingURL=config.js.map