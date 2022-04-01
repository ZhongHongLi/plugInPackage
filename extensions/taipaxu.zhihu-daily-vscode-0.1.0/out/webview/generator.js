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
const path = require('path');
const fs = require('fs');
const dayjs = require("dayjs");
const newsApi = require("../api/news");
const commentApi = require("../api/comment");
function generateHtml(context, type, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const resourcePath = path.join(context.extensionPath, 'static/web/index.html');
        let html = fs.readFileSync(resourcePath, 'utf-8');
        if (type === 'news') {
            try {
                let response = yield newsApi.getNewsDetail(data.id);
                html = html.replace('${content}', response.data.body);
            }
            catch (error) {
            }
        }
        else if (type === 'longComments') {
            try {
                let response = yield commentApi.getLongComments(data.command.arguments[0].id);
                let comments = response.data.comments;
                const resourcePath = path.join(context.extensionPath, 'static/web/comment_card.html');
                let content = '';
                let comment = fs.readFileSync(resourcePath, 'utf-8');
                comments.forEach((element) => {
                    let item = comment
                        .replace('${authorName}', element.author)
                        .replace('${content}', element.content)
                        .replace('${datetime}', dayjs(element.time * 1000).format('YYYY-MM-DD HH:mm:ss'));
                    content += item;
                });
                html = html.replace('${content}', content);
            }
            catch (error) {
            }
        }
        else if (type === 'shortComments') {
            try {
                let response = yield commentApi.getShortComments(data.command.arguments[0].id);
                let comments = response.data.comments;
                const resourcePath = path.join(context.extensionPath, 'static/web/comment_card.html');
                let content = '';
                let comment = fs.readFileSync(resourcePath, 'utf-8');
                comments.forEach((element) => {
                    let item = comment
                        .replace('${authorName}', element.author)
                        .replace('${content}', element.content)
                        .replace('${datetime}', dayjs(element.time * 1000).format('YYYY-MM-DD HH:mm:ss'));
                    content += item;
                });
                html = html.replace('${content}', content);
            }
            catch (error) {
            }
        }
        return html;
    });
}
exports.generateHtml = generateHtml;
//# sourceMappingURL=generator.js.map