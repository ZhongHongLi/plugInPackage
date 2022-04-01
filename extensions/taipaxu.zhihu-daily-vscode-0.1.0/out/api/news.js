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
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const dayjs = require("dayjs");
const request_1 = require("../request");
function getNews(page) {
    let url;
    if (page === 1) {
        url = 'news/latest';
    }
    else {
        url = 'news/before/' + dayjs().subtract(page - 2, 'day').format('YYYYMMDD');
    }
    vscode.window.setStatusBarMessage(dayjs().subtract(page - 1, 'day').format('YYYY-MM-DD'));
    return request_1.default({
        url: url,
        method: 'GET'
    });
}
exports.getNews = getNews;
function getNewsDetail(id) {
    return request_1.default({
        url: `news/${id}`,
        method: 'GET'
    });
}
exports.getNewsDetail = getNewsDetail;
//# sourceMappingURL=news.js.map