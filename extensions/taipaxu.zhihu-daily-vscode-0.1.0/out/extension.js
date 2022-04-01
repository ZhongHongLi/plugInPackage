"use strict";
/*
 * GNU General Public License, Version 3.0
 *
 * Copyright (c) 2019 Taipa Xu
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const newsTree_1 = require("./tree/newsTree");
const generator_1 = require("./webview/generator");
function activate(context) {
    const newsDataProvider = new newsTree_1.NewsTreeDataProvider();
    vscode.window.registerTreeDataProvider('zhihuDailyContent', newsDataProvider);
    let webviewOpened = false;
    let webviewPanel;
    function checkWebviewPanel() {
        if (!webviewOpened) {
            webviewPanel = vscode.window.createWebviewPanel('ZhiHu Daily', 'ZhiHu Daily', vscode.ViewColumn.One, {
                enableScripts: true
            });
            webviewOpened = true;
            webviewPanel.onDidDispose(() => {
                webviewOpened = false;
            });
        }
    }
    context.subscriptions.push(vscode.commands.registerCommand('zhihuDaily.previous', (item) => {
        newsDataProvider.prevPage();
    }), vscode.commands.registerCommand('zhihuDaily.next', (item) => {
        newsDataProvider.nextPage();
    }), vscode.commands.registerCommand('zhihuDaily.refresh', (item) => {
        newsDataProvider.refresh();
    }), vscode.commands.registerCommand('zhihuDaily.select', (item) => __awaiter(this, void 0, void 0, function* () {
        checkWebviewPanel();
        let html = yield generator_1.generateHtml(context, 'news', item);
        webviewPanel.webview.html = html;
    })), vscode.commands.registerCommand('zhihuDaily.longComments', (item) => __awaiter(this, void 0, void 0, function* () {
        checkWebviewPanel();
        let html = yield generator_1.generateHtml(context, 'longComments', item);
        webviewPanel.webview.html = html;
    })), vscode.commands.registerCommand('zhihuDaily.shortComments', (item) => __awaiter(this, void 0, void 0, function* () {
        checkWebviewPanel();
        let html = yield generator_1.generateHtml(context, 'shortComments', item);
        webviewPanel.webview.html = html;
    })));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map