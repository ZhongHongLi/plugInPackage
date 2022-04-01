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
class AbstractTreeDataProvider {
    constructor() {
        this.onDidChangeTreeDataEvent = new vscode.EventEmitter();
        this.onDidChangeTreeData = this.onDidChangeTreeDataEvent.event;
        this.currentPage = 1;
        this.items = [];
    }
    getTreeItem(element) {
        return element;
    }
    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.onDidChangeTreeDataEvent.fire();
        }
        else {
            vscode.window.showWarningMessage('This is the first page!');
        }
    }
    nextPage() {
        this.currentPage++;
        this.onDidChangeTreeDataEvent.fire();
    }
    refresh() {
        this.currentPage = 1;
        this.onDidChangeTreeDataEvent.fire();
    }
    getChildren(element) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            this.items = yield this.getItems();
            return resolve(this.items);
        }));
    }
}
exports.AbstractTreeDataProvider = AbstractTreeDataProvider;
class Node extends vscode.TreeItem {
    constructor(label, collapsibleState, command) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.command = command;
    }
}
exports.Node = Node;
//# sourceMappingURL=abstractTree.js.map