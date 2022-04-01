"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
    // register a configuration provider for 'mock' debug type
    const provider = new TsDebugConfigurationProvider();
    context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('ts-node', provider));
}
exports.activate = activate;
function deactivate() {
    // nothing to do
}
exports.deactivate = deactivate;
const port = 12340;
const initialConfig = {
    name: 'ts-node',
    type: 'node',
    request: 'launch',
    console: 'integratedTerminal',
    args: ['${relativeFile}'],
    runtimeArgs: ['-r', 'ts-node/register', `--inspect-brk=${port}`],
    protocol: 'inspector',
    stopOnEntry: false,
    port,
};
class TsDebugConfigurationProvider {
    resolveDebugConfiguration(folder, config, token) {
        // if launch.json is missing or empty
        if (!config.type && !config.request && !config.name) {
            return initialConfig;
        }
        return config;
    }
}
